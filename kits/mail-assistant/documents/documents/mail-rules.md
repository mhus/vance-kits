# Mail-Triage Regeln

> **Anpassen!** Dieser Default ist ein Template. Trag deine eigenen
> Domains, Personen und Filter-Kriterien ein — die Regeln hier
> werden vom LLM als Klassifikations-Anleitung gelesen.

Wenn eine eingehende Mail eines der folgenden Kriterien erfüllt, ist sie **wichtig**
und soll als Inbox-Item gemeldet werden. Sonst: unwichtig, als gelesen markieren
und in den Archiv-Ordner verschieben.

## Wichtig

- Absender steht auf der Whitelist (siehe unten) **und** Betreff enthält kein
  klares Newsletter-/Marketing-Signal
- Mail enthält eine konkrete Frage oder Bitte um Antwort (Fragezeichen im Body,
  Wörter wie "kannst du", "bitte um", "rückmeldung", "kurze Frage")
- Mail enthält Termine, Deadlines, Rechnungsbeträge oder Zugangsdaten

## Unwichtig (auto-archivieren)

- Newsletter, Marketing, Promotions (Unsubscribe-Footer, "no-reply"-Absender)
- Automatische Benachrichtigungen ohne Handlungsbedarf (CI-Status, Monitoring-OK,
  Login-Bestätigungen)
- System-Mails über erfolgreichen Versand, Lese-/Empfangsbestätigungen

## Whitelist

> Hier eigene Adressen / Domain-Pattern eintragen. Beispiele:

- `me@example.com`
- `*@my-company.com`
- `*@trusted-partner.org`

## Verhalten bei Unsicherheit

Im Zweifel **wichtig**. Lieber ein Inbox-Item zu viel als eine verlorene Mail.
