/**
 * translation kit / translate-article.js
 *
 * @description Übersetzt Titel und Teaser des Event-Payloads per LightLlm
 * @version     2.0.0
 * @timeout     120s
 */
// Wird von _vance/events/translate-article.yaml als synchrone
// script:-Action aufgerufen. Der POST-Body des Aufrufers liegt unter
// `args.payload` — der Event-Layer hängt ihn dort unausgepackt ein.
//
// Rückgabe ist ein Objekt {title, summary}; ScriptOutcomeMapper reicht es
// als `output` der HTTP-Antwort durch (bei einem Objekt ohne Wrapper-
// Pattern also unverändert, nicht unter `value`).
//
// callForJson statt call: das Recipe verlangt strukturierte Ausgabe, und
// Jeltz' Schema-Loop fasst nach, wenn das Modell kein sauberes JSON
// liefert. Titel und Teaser gehen in EINEM Aufruf raus — bei realem
// Volumen dominiert der Prompt die Kosten, zwei Aufrufe würden also die
// teure Hälfte verdoppeln.
//
// IIFE, weil der Executor den Wert des letzten Ausdrucks nimmt — ein
// `return` auf oberster Ebene ist in GraalJS ein SyntaxError.

(function () {
    var payload = (args && args.payload) ? args.payload : {};
    var title = payload.title || "";
    var summary = payload.summary || "";

    // Zielsprache: Payload gewinnt, sonst das Projekt-Setting, sonst
    // Deutsch. `vance.settings` ist nullable (null, wenn kein
    // SettingService verdrahtet ist) — ein fehlender Setting-Zugriff darf
    // die Übersetzung nicht kippen, die Sprache hat ja einen Default.
    var targetLang = payload.targetLang
        || (vance.settings ? vance.settings.get("translation.defaultTargetLang", "de") : "de");

    if (!title) {
        // Kein Titel ist kein Fehler, sondern ein leeres Ergebnis — ein
        // Aufrufer mit einem titellosen Eintrag soll keine 502 bekommen.
        return { title: "", summary: "" };
    }

    vance.log.info("translate-article", {
        targetLang: targetLang,
        titleChars: title.length,
        summaryChars: summary.length
    });

    var result = vance.llm.callForJson(
        "article-translate",
        "Translate the title and teaser into " + targetLang + ".",
        { title: title, summary: summary, targetLang: targetLang });

    return {
        title: result.title || "",
        summary: result.summary || ""
    };
})();
