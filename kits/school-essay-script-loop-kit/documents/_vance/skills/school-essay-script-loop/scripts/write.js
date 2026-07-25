/**
 * school-essay-script-loop-kit / scripts/write.js — chapter-loop
 * orchestrator. Spawns one Ford sub-worker per chapter, each one
 * fed the recap of previously-drafted chapters (Slart/Vogon
 * <phases>-block pattern).
 *
 * @description Pro/Contra essay chapter-loop orchestrator
 * @version     1.0.0
 * @timeout     30m
 * @requiresTools process_spawn, doc_create
 */
// Orchestrator script. Receives:
//   { topic, styleNotes, sources, pros, contras }
// Spawns one Ford sub-worker per chapter via process_spawn, each one
// fed the topic + sources + pros/contras + styleNotes + a recap of
// all previously-drafted chapters (mirrors the Slart/Vogon
// <phases>-block pattern — every step sees what already exists).
//
// Persists every chapter and the assembled final-essay via
// doc_create (upsert: create-or-overwrite by path). Returns a
// marker that the E2E test pins on.

(function () {
    var CHAPTER_ORDER = ['einleitung', 'pro', 'contra', 'vergleich', 'fazit'];
    var MARKER = 'SCHOOL-ESSAY-SCRIPT-LOOP-PT8M2-WRITTEN';

    if (!args || typeof args !== 'object') {
        throw new Error('write: args object is required');
    }
    var topic = String(args.topic || '').trim();
    if (!topic) throw new Error('write: args.topic is required');
    var styleNotes = String(args.styleNotes || '').trim();
    var sources = Array.isArray(args.sources) ? args.sources : [];
    var pros    = Array.isArray(args.pros)    ? args.pros    : [];
    var contras = Array.isArray(args.contras) ? args.contras : [];
    if (pros.length === 0 || contras.length === 0) {
        throw new Error('write: pros and contras must be non-empty arrays');
    }

    // ─── 1. Persist sources + research-question up-front so a
    // sub-worker that calls doc_read on essay/sources.md gets a
    // populated file.
    var rqContent = '# Forschungsfrage\n\n' + topic + '\n';
    vance.tools.call('doc_create', {
        path: 'essay/research-question.md', kind: 'text', content: rqContent
    });

    var sourcesLines = ['# Quellen\n'];
    for (var s = 0; s < sources.length; s++) {
        var src = sources[s] || {};
        var title = String(src.title || src.url || '(untitled)').trim();
        var url = String(src.url || '').trim();
        sourcesLines.push(url
                ? '- [' + title + '](' + url + ')'
                : '- ' + title);
    }
    var sourcesContent = sourcesLines.join('\n') + '\n';
    vance.tools.call('doc_create', {
        path: 'essay/sources.md', kind: 'text', content: sourcesContent
    });

    // ─── 2. Chapter-loop. Each iteration spawns a fresh Ford
    // sub-worker via process_spawn. The worker's steerContent is
    // built so it sees:
    //   - topic + style requirements
    //   - all sources (verbatim list)
    //   - all pro/contra bullets
    //   - a recap of every previously-drafted chapter
    // process_spawn blocks until the worker's turn finishes; the
    // ASSISTANT reply comes back in result.reply.

    var chapters = {};            // {einleitung: "...", pro: "...", ...}
    var chapterStats = [];        // [{name, chars, processId}, ...]
    var filesWritten = [];
    var totalChars = 0;

    function renderRecap() {
        if (Object.keys(chapters).length === 0) {
            return '(Noch kein Kapitel geschrieben — du bist das erste.)';
        }
        var lines = ['# Bisher geschriebene Kapitel\n'];
        for (var i = 0; i < CHAPTER_ORDER.length; i++) {
            var key = CHAPTER_ORDER[i];
            var body = chapters[key];
            if (!body) continue;
            var firstSentence = body.split(/(?<=[.!?])\s+/).slice(0, 3).join(' ');
            lines.push('## ' + key);
            lines.push('Erste Sätze: ' + firstSentence);
            lines.push('Wortzahl: ' + body.trim().split(/\s+/).length);
            lines.push('');
        }
        return lines.join('\n');
    }

    function steerForChapter(chapter) {
        var sourceList = sources.map(function (s, i) {
            return '[' + (i + 1) + '] ' + (s.title || '') + ' — ' + (s.url || '');
        }).join('\n');
        return [
            '# Auftrag: Kapitel "' + chapter + '" eines Schul-Aufsatzes',
            '',
            '## Thema',
            topic,
            '',
            '## Stilvorgaben des Users',
            styleNotes || '(keine zusätzlichen Vorgaben — schreibe sachlich '
                    + 'und ausgewogen, Klasse 9-10-Niveau, mit '
                    + '(vgl. ..., JJJJ)-Belegen im Fließtext.)',
            '',
            '## Quellen',
            sourceList,
            '',
            '## Pro-Argumente (aus der Recherche)',
            pros.map(function (p) { return '- ' + p; }).join('\n'),
            '',
            '## Contra-Argumente (aus der Recherche)',
            contras.map(function (c) { return '- ' + c; }).join('\n'),
            '',
            '## Recap der bisher geschriebenen Kapitel',
            renderRecap(),
            '',
            '## Deine Aufgabe',
            'Schreibe das **' + chapter + '**-Kapitel. 200-350 Wörter, '
                    + 'sachlich, deutsch, mit Belegen in (vgl. ..., JJJJ)-Form. '
                    + 'Antworte AUSSCHLIESSLICH mit dem Kapitel-Text (Markdown), '
                    + 'OHNE Überschrift, OHNE Meta-Kommentare, OHNE Tool-Calls.',
            ''
        ].join('\n');
    }

    for (var c = 0; c < CHAPTER_ORDER.length; c++) {
        var chapter = CHAPTER_ORDER[c];
        vance.log.info('school-essay-script-loop: spawning chapter worker',
                { chapter: chapter, sequence: (c + 1) + '/5' });

        var result = vance.tools.call('process_spawn', {
            name: 'chapter-' + chapter,
            task: steerForChapter(chapter),
            recipe: 'ford',
            wait: true,
            timeoutSeconds: 180
        });

        var reply = result && result.reply ? String(result.reply).trim() : '';
        if (!reply) {
            throw new Error('write: chapter "' + chapter + '" sub-worker '
                    + 'returned no reply (processId='
                    + (result && result.processId) + ', status='
                    + (result && result.status) + ')');
        }
        chapters[chapter] = reply;
        chapterStats.push({
            name: chapter,
            chars: reply.length,
            processId: result.processId
        });

        // Persist the per-chapter file immediately so a later
        // worker (or a manual inspector) can read it via doc_read.
        var nn = (c < 9 ? '0' : '') + (c + 1);
        var chapterPath = 'essay/chapters/' + nn + '-' + chapter + '.md';
        vance.tools.call('doc_create', {
            path: chapterPath, kind: 'text', content: reply + '\n'
        });
        filesWritten.push(chapterPath);
        totalChars += reply.length;
    }

    // ─── 3. Final-essay concatenation. H1 with the topic, then the
    // five chapters separated by '---'.
    var finalParts = ['# ' + topic + '\n'];
    for (var f = 0; f < CHAPTER_ORDER.length; f++) {
        finalParts.push(chapters[CHAPTER_ORDER[f]].trim());
    }
    var finalContent = finalParts.join('\n\n---\n\n') + '\n';
    vance.tools.call('doc_create', {
        path: 'essay/final-essay.md', kind: 'text', content: finalContent
    });
    totalChars += finalContent.length;

    // Prepend the up-front-written files so the final list has
    // the canonical order the unit test pins on.
    filesWritten = [
        'essay/research-question.md',
        'essay/sources.md'
    ].concat(filesWritten).concat(['essay/final-essay.md']);

    vance.log.info('school-essay-script-loop: done', {
        topic: topic,
        chapters: CHAPTER_ORDER.length,
        files: filesWritten.length,
        chars: totalChars
    });

    return {
        ok: true,
        marker: MARKER,
        filesWritten: filesWritten,
        totalChars: totalChars,
        chapterStats: chapterStats
    };
})();
