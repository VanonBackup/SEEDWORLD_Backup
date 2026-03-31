# Mechanical Hardening und System-Harmonisierung (Governance-first)

## Zielbild

Dieses Dokument beschreibt einen mechanisch pruefbaren Plan, um das System entlang der bestehenden Governance zu haerten und gleichzeitig die Domains (Kernel, Browser-Adapter, Evidence, Docs) auf einen gemeinsamen, widerspruchsfreien Contract zu harmonisieren.

Leitprinzip: **Fail-closed vor Komfort**. Jede Aenderung muss durch vorhandene Gates, Evidence und Task-Scopes nachvollziehbar sein.

## 1) Mechanische Haertung (Pflichtkontrollen)

### 1.1 Read/Commit/Push-Gates als harte Sperre

- Read-ACK ueber `npm run llm:entry` erzwingen.
- Commit-Gate ueber `npm run llm:guard -- --action commit` als Pflicht vor jedem Commit.
- Push-Gate ueber `npm run llm:guard -- --action push` + `npm run check:required:verify-only` ohne Auto-Write.
- Ziel: Kein ungueltiger Zustand erreicht den Branch.

### 1.2 Verify-first in jeder Pipeline-Stufe

- `npm run check:required` lokal fuer Aenderungen.
- `npm run check:required:verify-only` fuer Push-Readiness.
- Claims ausschliesslich aus:
  - `runtime/evidence/required-check-report.json`
  - `runtime/evidence/governance-proof-manifest.json`
  - Gate-Outputs

### 1.3 Blocker-Katalog strikt fail-closed halten

- Keine Lockerung bei fehlendem ACK, Hash-Drift, fehlender Evidence, Testline-Verletzung.
- Findings muessen in Tasks materialisiert sein, keine informellen TODOs als Ersatz.

## 2) Harmonisierung des Systems (ein gemeinsamer Contract)

### 2.1 Domain-Contracts explizit koppeln

- **Kernel-Core** bleibt einzige Quelle fuer deterministische Zustandsaenderungen.
- **Browser-Adapter** bleibt Darstellung/Interaktion, nicht Wahrheitsquelle.
- **Reproduction-Evidence** beweist deterministische Wiederholbarkeit.
- **Documentation-V2** bleibt die menschenlesbare + maschinenlesbare Steuerung.

Ergebnis: Jede Domain hat eine klare Rolle ohne Ueberlappung von Verantwortungen.

### 2.2 Task-Schnitt entlang atomarer Scopes

- Nur atomare Task-Slices ausfuehren (ein Scope, ein Claim, ein Evidence-Pfad).
- Keine Misch-Changes ueber mehrere offene Task-Scopes, wenn nicht explizit gefordert.
- Pro Slice: Scope-Dateien komplett, Nachweis komplett, dann erst Archivierung.

### 2.3 Modularity-Schulden gezielt abbauen

Prioritaet aus offenem Plan:

1. GOV-001: Required-Checks modularisieren.
2. GOV-002: KernelController entmonolithisieren.
3. GOV-003: Mutation-Guard in Teilmodule splitten.
4. GOV-004: Docs-V2 Sync-Chain modularisieren.
5. GOV-005/006: Signatur-Range und Threat-Model verankern.

Damit werden Allowlist-Ausnahmen schrittweise durch echte Struktur ersetzt.

## 3) 30-60-90 Plan

### Phase 0-30 Tage: Stabilisieren

- Gate-Disziplin auf jedem Commit/Push ausnahmslos durchziehen.
- Offene Governance-Tasks priorisieren (GOV-001 bis GOV-003).
- Baseline-Metriken erfassen:
  - Anzahl Findings je Lauf
  - Anzahl Blocker je Kategorie
  - Zeit bis "verify-only gruen"

### Phase 31-60 Tage: Entkoppeln

- GOV-004/GOV-005 umsetzen und wiederkehrende Reibungspunkte entfernen.
- Schnittstellen zwischen Kernel, Runtime-Tools und Docs als klare Inputs/Outputs dokumentieren.
- Evidence-Bundle-Qualitaet per wiederholbarer Runs absichern.

### Phase 61-90 Tage: Konsolidieren

- GOV-006 abschliessen (Threat Model verbindlich im Workflow verankert).
- Rest-Exceptions mit Sunset konsequent entfernen.
- Quartals-Review: alle Domain-Contracts gegen realen Code und offene Tasks gegenpruefen.

## 4) Akzeptanzkriterien (Definition of Harmonized)

Das System gilt als harmonisiert, wenn:

1. Alle Required-Gates gruen sind, ohne manuelle Bypaesse.
2. Governance-Findings vollstaendig in Tasks ueberfuehrt sind.
3. Keine dauerhaften Modularity-Ausnahmen ohne Sunset aktiv sind.
4. Browser-Adapter keine konkurrierende "Truth" mehr enthaelt.
5. Docs-V2, SoT-Mapping und Runtime-Evidence widerspruchsfrei zusammenpassen.

## 5) Operativer Kurzablauf pro Aenderung

1. Pflicht-Read + ACK (`npm run llm:entry`).
2. Atomaren Task-Scope auswaehlen.
3. Aenderung nur im Scope umsetzen.
4. `npm run llm:guard -- --action commit` und `npm run check:required`.
5. Commit.
6. Vor Push `npm run llm:guard -- --action push` + `npm run check:required:verify-only`.
7. Nur bei gruenem Verify-Status pushen.

Dieser Ablauf ist absichtlich strikt, damit Governance nicht nur dokumentiert, sondern mechanisch durchgesetzt wird.
