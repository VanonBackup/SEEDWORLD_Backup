# Redteam Kurzbericht (2026-03-31)

## Scope
- Repository-Check mit Fokus auf Governance-/Docs-V2-Redteam-Pfade.
- Ausgefuehrt auf Branch-HEAD am 2026-03-31 (UTC).

## Durchgefuehrte Befehle
- `npm run docs:v2:probe`
- `rg --files dev/tools/runtime`
- `cat package.json`

## Findings

### RT-2026-03-31-01: Broken redteam probe entrypoint
- **Severity:** High
- **Kategorie:** Supply/Runtime Integrity
- **Beobachtung:** Script `docs:v2:probe` referenziert `dev/tools/runtime/probe-docs-v2-adversarial.mjs`, die Datei fehlt.
- **Impact:** Der dokumentierte adversarial Probe-Gate ist nicht ausfuehrbar; redteamartige Regressionen werden nicht automatisch erkannt.
- **Evidence:** `npm run docs:v2:probe` endet mit `MODULE_NOT_FOUND`.
- **Empfehlung:** Fehlende Probe-Datei wiederherstellen oder `package.json` auf vorhandenen verifier umstellen.

### RT-2026-03-31-02: Shared runtime helper missing
- **Severity:** High
- **Kategorie:** Build/Verification Availability
- **Beobachtung:** Mehrere Runtime-Tools importieren `./runtime-shared.mjs`; Datei fehlt im Verzeichnis `dev/tools/runtime`.
- **Impact:** Mehrere Governance-/Coverage-Checks werden zur Laufzeit scheitern, sobald die betreffenden Skripte ausgefuehrt werden.
- **Empfehlung:** `runtime-shared.mjs` aus letzter konsistenter Revision rekonstruieren und alle Importpfade verifizieren.

## Governance-Hinweis
- Policy-konforme Verifikation ist aktuell nur eingeschraenkt moeglich, bis die fehlenden Tool-Entry-Points wiederhergestellt sind.
