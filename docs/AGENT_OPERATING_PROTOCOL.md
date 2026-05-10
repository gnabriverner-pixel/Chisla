# AGENT OPERATING PROTOCOL

**Status:** Canonical operating protocol v1.0  
**Date:** 2026-05-10  
**Repository:** `gnabriverner-pixel/Chisla` as ecosystem control layer  
**Purpose:** prevent confusion between parallel chats, agents, repositories, workstreams and production surfaces.

---

## 1. Executive rule

The project does not run as one super-agent. It runs as a controlled agent production line.

```text
Owner / ChatGPT Product Lead
  → GitHub as source of truth
  → ClaudeCode / Hermes / Codex / OnSpace as specialized agents
  → PR / report / release note as acceptance artifacts
```

The current goal is not to build a perfect agent system. The current goal is to bring Digital Code / Zerkalo to:

1. stable text quality;
2. working web → Telegram funnel;
3. first paid clients;
4. controlled production operations.

---

## 2. Source of truth

GitHub is the source of truth.

All important work must become one or more of:

- branch;
- commit;
- pull request;
- report;
- release note;
- issue/checklist;
- documented production action.

Chat messages, Telegram reports and model summaries are not source of truth until reflected in GitHub or an explicitly referenced production report.

---

## 3. Agent roles

### ChatGPT / Product Lead

Role:

- strategy;
- prioritization;
- task design;
- acceptance criteria;
- risk review;
- final judgement;
- merge-gate when acting through GitHub.

May do:

- synthesize cross-chat context;
- create task briefs;
- review PRs/reports;
- merge low-risk approved PRs.

Should not do:

- replace production smoke tests with assumptions;
- allow parallel agents to edit the same files without coordination.

### ClaudeCode

Role:

- deep engineering;
- prompt and voice surgery;
- product text/code alignment;
- tests;
- UI/code patches;
- PRs.

Best tasks:

- `master_prompt.md` surgical fixes;
- text quality tests;
- voice gate Phase A implementation;
- UI/content improvements;
- code review and refactor proposals.

Must not touch without explicit approval:

- production deploy;
- `.env` / secrets;
- payment flow;
- full replacement of `bot_mvp.py`;
- direct VPS production changes.

### Hermes

Role:

- VPS / production operator;
- GitHub operations;
- deploy preflight;
- backups;
- systemd/nginx/logs;
- smoke tests;
- production safety;
- publishing PRs when other environments cannot push.

Best tasks:

- read-only runtime checks;
- systemd status and logs;
- production path discovery;
- backup before deploy;
- branch push and PR creation;
- applying verified patches;
- smoke reports.

Must not do without explicit approval:

- restart production services;
- edit production files;
- change `.env`;
- deploy;
- run paid flows;
- print secrets;
- force push;
- merge main on its own.

### Codex

Role:

- isolated patch worker;
- static audit;
- dependency work;
- lockfile/diff/test fixes;
- compact verification.

Best tasks:

- dependency pruning;
- static import checks;
- isolated code patches;
- test fixes;
- exportable patch bundles.

Known limitation:

- may fail to push to GitHub from its environment. If so, Codex exports a patch and Hermes publishes it.

### OnSpace / Mini App

Role:

- UX / visual laboratory;
- experimental Mini App/PWA prototype;
- design-system inspiration;
- value extraction only until production funnel works.

Current status:

- not the main production contour;
- do not continue heavy Mini App build until DigitalBot text, live smoke, web→bot funnel and first paid clients are addressed.

---

## 4. Current production contour

The main production contour is:

```text
Zerkalo web
  → Telegram DigitalBot
  → Basic / Deep
  → Big Research / manual premium analysis
```

Not the current main contour:

```text
OnSpace Mini App
```

Mini App remains experimental until:

1. DigitalBot produces acceptable live Basic/Deep text;
2. Basic/Deep pass smoke;
3. Zerkalo → Bot funnel is connected;
4. first paid clients/leads are validated.

---

## 5. Public vs internal language

Internal method language may use:

- numeric system;
- Vedic-inspired logic;
- calculation method;
- planets as symbolic shorthand.

Public product language should prefer:

- числовая архитектура;
- персональный аналитический файл;
- структура даты рождения;
- точный персональный разбор;
- внутренний портрет;
- Big Research / Большое исследование.

Avoid leading public positioning with:

- нумерология;
- эзотерика;
- гороскоп;
- карма;
- вибрации;
- терапия;
- AI-тест.

Planets can remain as an internal/product metaphor layer if they add beauty and symbolic structure, but they must not push the product into cheap astrology.

---

## 6. Mandatory task brief format

Every substantial agent task must start with:

```text
REPO:
BRANCH:
BASE:
FILES ALLOWED:
FILES FORBIDDEN:
GOAL:
NON-GOALS:
CHECKS REQUIRED:
OUTPUT REQUIRED:
DO NOT MERGE:
DO NOT TOUCH PRODUCTION:
```

For production/VPS tasks, also include:

```text
PRODUCTION PATH:
SERVICE:
ALLOWED COMMANDS:
FORBIDDEN COMMANDS:
SECRET HANDLING:
ROLLBACK PLAN:
APPROVAL REQUIRED FOR:
```

---

## 7. Parallel work rule

One workstream = one branch = one responsible agent = one allowed file set.

No two agents should edit the same files at the same time without a coordination note.

If overlap is necessary, create a coordination note containing:

```text
AGENT A:
AGENT B:
OVERLAPPING FILES:
ORDER OF OPERATIONS:
WHO MERGES FIRST:
HOW THE SECOND AGENT REBASES:
ACCEPTANCE OWNER:
```

---

## 8. Production safety

Production/deploy is Hermes-only and explicit-approval-only.

Hard red zone:

- `.env` / tokens / secrets;
- payment flow;
- `engine.py`;
- `llm_gateway.py`;
- `knowledge_base.json`;
- production `bot_mvp.py` full replacement;
- systemd restart/stop/start;
- nginx changes;
- database migrations;
- deploy;
- main merge directly from agent;
- force push.

Read-only checks are allowed when the task explicitly says read-only.

---

## 9. PR acceptance rule

A PR should state:

- what changed;
- what did not change;
- tests/checks;
- production impact;
- known limitations;
- next step.

A PR should not mix unrelated workstreams.

Good PR:

```text
voice-gate Phase A scan-only
```

Bad PR:

```text
voice gate + UI redesign + payment + dependency cleanup + deploy docs
```

---

## 10. Current top priority

Do not expand the agent system before validating the live product.

Immediate sequence:

1. Hermes: DigitalBot prompt runtime check, read-only.
2. Owner: live smoke in Telegram.
3. Product Lead: audit real generated Basic/Deep text.
4. If bad: diagnose prompt path / knowledge base / bot runtime / LLM.
5. If acceptable: connect Zerkalo web → Telegram bot funnel.
6. Begin first manual Big Research sales loop.

---

## 11. Decision principle

When in doubt, choose the action that moves closer to:

- better live text;
- clearer funnel;
- first payment;
- safer production;
- less repo confusion.

Avoid actions that only create more planning without shipping.