# RELEASE LOG

**Status:** Ecosystem release log v1.0  
**Date:** 2026-05-10  
**Purpose:** concise record of important merged work, operating decisions and production-facing checkpoints across Digital Code / Zerkalo.

---

## 2026-05-10

### Operating clarity established

Created minimal cross-project operating layer in `Chisla`:

- `docs/AGENT_OPERATING_PROTOCOL.md`
- `docs/ACTIVE_WORKSTREAMS.md`
- `docs/RELEASE_LOG.md`

Decision:

- GitHub is source of truth.
- Main production contour: `Zerkalo web → Telegram DigitalBot → Basic/Deep → Big Research`.
- OnSpace Mini App remains experimental / UX laboratory.
- Do not expand agent system before validating live product quality.

### Hermes strategy added

Added:

- `docs/agent-os/HERMES_AGENT_DEVELOPMENT_STRATEGY.md`
- `obsidian/Hermes Agent Development Strategy.md`

Decision:

- Hermes becomes production/VPS/GitHub operator, not uncontrolled super-agent.
- Production remains explicit-approval-only.

### `Zerkalo-9bgpjl` PR #2 merged

PR:

- `audit: static dependency usage after OnSpace import`

Result:

- `STATIC_DEPENDENCY_AUDIT.md` added to main.
- OnSpace import dependency state documented.
- No production impact.

### `Zerkalo-9bgpjl` PR #3 merged

PR:

- `prune: remove unused OnSpace dependency batch 1`

Merge SHA:

- `61fb50b3d06d7f7998fca7cc1dcf93711bb63dc8`

Result:

- Removed 17 approved unused Batch 1 dependencies.
- Updated `package.json`.
- Synchronized `pnpm-lock.yaml`.
- Added `DEPENDENCY_PRUNE_BATCH_1_REPORT.md`.

Operational lesson:

- Codex can do patch/lockfile work but may fail GitHub publishing.
- Hermes can publish PRs and operate GitHub/VPS.
- Hermes VPS may need temporary session-only registry mirror for npm instability.
- Mirror URL check is mandatory after temporary registry use.

### Digital Code voice canon reviewed

Reviewed and accepted as valuable operating canon:

- `PRODUCT_MANIFESTO_V1.md`
- `DIGITAL_CODE_TEXT_STANDARD_V1.md`
- `TEXT_BENCHMARK_MANIFESTO_PASS_V1.md`
- `VOICE_RUNTIME_GATE_SPEC_V1.md`
- `data/anti_cheapness_blacklist.json`
- `CLAUDE.md`
- `BREAKTHROUGH_PRODUCT_PLAN_2026-05-08.md`

Decision:

- Keep the manifesto and text standard as creative/voice compass.
- Do not allow new strategy docs to delay live product validation.
- Public language: numeric architecture / personal analytical file.
- Internal language may preserve Vedic-inspired symbolic logic and planets.

### Current immediate next step

Run:

```text
Hermes runtime prompt check → owner live smoke → audit real Basic/Deep output.
```

Only after that decide:

- voice_gate_scan Phase A;
- prompt path / KB / bot runtime fixes;
- web → bot funnel;
- first manual Big Research sales loop.

---

## Release log rule

Every meaningful future merge or production action should append:

```text
Date:
Repo:
PR/commit:
What changed:
Checks:
Production impact:
Next action:
```