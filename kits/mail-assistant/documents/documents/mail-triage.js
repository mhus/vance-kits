/**
 * @timeout 5m
 * @statementLimit 5000000
 *
 * Konfiguration über Settings (Cascade think-process → project → _tenant):
 *
 *   mail.pack           — Name des IMAP-Tool-Packs (REQUIRED, kein Default)
 *   mail.inboxFolder    — Quell-Folder (default "INBOX")
 *   mail.archiveFolder  — Archiv-Folder (default "Archive/Auto")
 *   mail.maxPerRun      — Mails pro Lauf (default 5)
 *   mail.recipeName     — Klassifikations-Recipe (default "mail-rate")
 *   mail.rulesDoc       — Pfad zum Regel-Doc (default "documents/mail-rules.md")
 *
 * Konfiguriert wird über das Setting-Form "Mail-Triage" im Workspace-
 * Editor-Tab. Defaults werden beim Kit-Install in den Project-Scope
 * gesetzt; nur `mail.pack` muss der User manuell tragen.
 *
 * Scheduler-Params (vance.params.*) überschreiben Settings per-Lauf:
 *
 *   _vance/scheduler/mail-check.yaml:
 *     params:
 *       inboxFolder: "Support"
 *       archiveFolder: "Archive/Support"
 */
// Mail-Triage Script
//
// Wird vom Scheduler `mail-check.yaml` via hactar-run aufgerufen,
// alternativ direkt via Cortex-Run-Button auf documents/mail-triage.js.
//
// Ablauf pro ungelesener Mail:
//   1. Mail-Body holen (<pack>__get_message)
//   2. LightLlm-Recipe klassifizieren (vance.llm.callForJson)
//   3. Wenn important: inbox_post mit Zusammenfassung
//   4. Mail als gelesen markieren (<pack>__set_seen)
//   5. Wenn unimportant: nach archiveFolder verschieben
//
// Keine Process-Spawns, keine Lane-Locks — alles synchron pro Mail.

const params = vance.params || {};

const PACK = params.pack
    || vance.settings.get('mail.pack');
if (!PACK) {
    throw new Error('mail.pack ist nicht gesetzt — Setting-Form "Mail-Triage" im Workspace ausfüllen');
}

const FOLDER = params.inboxFolder
    || vance.settings.get('mail.inboxFolder', 'INBOX');
const ARCHIVE = params.archiveFolder
    || vance.settings.get('mail.archiveFolder', 'Archive/Auto');
const MAX_PER_RUN = params.maxPerRun
    || vance.settings.getInt('mail.maxPerRun', 5);
const RECIPE = params.recipeName
    || vance.settings.get('mail.recipeName', 'mail-rate');
const RULES_DOC = params.rulesDoc
    || vance.settings.get('mail.rulesDoc', 'documents/mail-rules.md');

const rules = vance.documents.read(RULES_DOC);
if (!rules) {
    throw new Error(`${RULES_DOC} fehlt im Projekt`);
}

const listing = vance.tools.call(`${PACK}__list_messages`, {
    folder: FOLDER,
    unread_only: true,
    limit: MAX_PER_RUN,
});

const messages = listing.messages || [];
const t0 = Date.now();
vance.log.info(`mail-triage start: ${messages.length} ungelesene Mails (max ${MAX_PER_RUN} pro Run, pack=${PACK})`);

let important = 0;
let archived = 0;
let i = 0;

for (const m of messages) {
    i++;
    const ref = m.messageId || String(m.messageNumber);
    const tag = `[${i}/${messages.length}] ref=${ref} subject="${(m.subject || '').substring(0, 60)}"`;
    vance.log.info(`${tag} start`);

    const tFetch = Date.now();
    const full = vance.tools.call(`${PACK}__get_message`, {
        folder: FOLDER,
        messageRef: ref,
    });
    vance.log.info(`${tag} get_message done in ${Date.now() - tFetch}ms bodyLen=${(full.body || '').length}`);

    const tLlm = Date.now();
    const verdict = vance.llm.callForJson(RECIPE, 'Bewerte die Mail.', {
        rules: rules,
        from: full.from || '',
        to: full.to || '',
        subject: full.subject || '',
        date: full.sentAt || full.receivedAt || '',
        body: full.body || '(kein Body)',
    });
    vance.log.info(`${tag} llm.callForJson done in ${Date.now() - tLlm}ms important=${verdict.important}`);

    if (verdict.important === true) {
        const tInbox = Date.now();
        vance.tools.call('inbox_post', {
            targetUserId: vance.context.userId,
            type: 'OUTPUT_TEXT',
            title: `Mail: ${full.subject || '(ohne Betreff)'}`,
            body: `Von: ${full.from || '(unbekannt)'}\n\n${verdict.summary || '(keine Zusammenfassung)'}`,
            criticality: 'NORMAL',
            payload: { messageRef: ref, reason: verdict.reason || '' },
        });
        vance.log.info(`${tag} inbox_post done in ${Date.now() - tInbox}ms`);
        important++;
    } else {
        const tMove = Date.now();
        vance.tools.call(`${PACK}__move_message`, {
            folder: FOLDER,
            messageRef: ref,
            targetFolder: ARCHIVE,
        });
        vance.log.info(`${tag} move_message done in ${Date.now() - tMove}ms`);
        archived++;
    }

    const tSeen = Date.now();
    vance.tools.call(`${PACK}__set_seen`, {
        folder: FOLDER,
        messageRef: ref,
        seen: true,
    });
    vance.log.info(`${tag} set_seen done in ${Date.now() - tSeen}ms`);
}

vance.log.info(`mail-triage done in ${Date.now() - t0}ms: ${important} wichtig, ${archived} archiviert`);
