/**
 * translation kit / translate-article.js
 *
 * @description Übersetzt den Event-Payload per LightLlm
 * @version     1.0.0
 * @timeout     120s
 */
// Wird von _vance/events/translate-article.yaml als synchrone
// script:-Action aufgerufen. Der POST-Body des Aufrufers liegt unter
// `args.payload` — der Event-Layer hängt ihn dort unausgepackt ein.
//
// Der Rückgabewert dieses Skripts wird zum `output` der HTTP-Antwort:
// ein String landet nach der Konvention des Brains unter
// `output.value`.
//
// IIFE, weil der Executor den Wert des letzten Ausdrucks nimmt — ein
// `return` auf oberster Ebene ist in GraalJS ein SyntaxError.

(function () {
    var payload = (args && args.payload) ? args.payload : {};
    var text = payload.text || "";

    // Zielsprache: Payload gewinnt, sonst das Projekt-Setting, sonst
    // Deutsch. Das Setting existiert, damit ein Aufrufer, der immer
    // dieselbe Sprache will, sie nicht in jeden Request schreiben muss.
    //
    // `vance.settings` ist nullable (null, wenn kein SettingService
    // verdrahtet ist) — ein fehlender Setting-Zugriff darf die
    // Übersetzung nicht kippen, die Sprache hat ja einen Default.
    var targetLang = payload.targetLang
        || (vance.settings ? vance.settings.get("translation.defaultTargetLang", "de") : "de");

    if (!text) {
        // Leerer Text ist kein Fehler, sondern ein leeres Ergebnis —
        // ein Aufrufer, der einen Artikel ohne Teaser durchreicht, soll
        // keine 502 bekommen.
        return "";
    }

    vance.log.info("translate-article", { targetLang: targetLang, chars: text.length });

    return vance.llm.call(
        "article-translate",
        "Translate the text into " + targetLang + ".",
        { text: text, targetLang: targetLang });
})();
