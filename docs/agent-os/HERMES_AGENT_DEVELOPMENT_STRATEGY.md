# Hermes Agent Development Strategy

**Status:** Canonical strategy v1.0  
**Owner:** Артём / project owner  
**Agent:** Hermes Agent  
**Scope:** Zerkalo, Zerkalo-9bgpjl, digital-code-system, digital-code-web, Chisla, camera-presence-lab, soulful-insights, future n8n and Scene of Decisions assets  
**Purpose:** turn Hermes into the central engineering/project-operations agent of the ecosystem, without giving it unsafe production autonomy.

---

## 1. Executive verdict

Hermes should become the **central operational agent** for the technical ecosystem.

Not a replacement for GPT, Claude Code, Codex, Antigravity or the owner. Hermes is the **persistent operator**: the agent that lives near the VPS, GitHub, project files, reports, services and memory.

The target state:

```text
Owner / GPT strategy layer
        ↓
Hermes as Project Operating Agent
        ↓
Claude Code / Codex / CLI / GitHub / VPS / cron / MCP / skills
        ↓
Reports, branches, PRs, safe patches, audits, checks, deploy preflights
```

Hermes is already useful at level 1-2. The strategy is to bring it to level 4 safely, and only then allow controlled production actions.

---

## 2. Core doctrine

### 2.1 Hermes is not a magic autonomous founder

Hermes must not be treated as an unrestricted general intelligence. It is a controlled engineering operator with tools, memory and protocols.

### 2.2 Hermes must work through artifacts

Every serious task must end with at least one of:

- markdown report;
- git branch;
- commit;
- PR;
- issue/checklist;
- runbook;
- verified command output;
- explicit blocker report.

No vague “I checked”. No silent work. No undocumented changes.

### 2.3 Production is a red zone

Hermes can prepare production actions, but cannot perform them without explicit confirmation.

Production red zone includes:

- `/opt/*` live services;
- systemd restart/stop/start;
- nginx changes;
- `.env` changes;
- payment providers;
- database migrations;
- deploys;
- main merge;
- force push;
- secrets.

### 2.4 Autonomy is earned by evidence

Hermes receives more autonomy only after completing safe cycles:

```text
audit → report → branch → PR → review → merge → lesson captured
```

---

## 3. Target operating model

### 3.1 Hermes role

Hermes is the **Project Operating Agent**.

Responsibilities:

- keep project map current;
- audit repositories and VPS state;
- prepare safe patches;
- create branches and PRs;
- run lint/test/build/preflight checks;
- coordinate Claude Code as a subagent;
- maintain memory, lessons and runbooks;
- watch drift and blockers;
- prepare deploy plans;
- never silently touch production.

### 3.2 Owner role

The owner decides:

- product direction;
- monetization priorities;
- final merges for risky PRs;
- production deploy approvals;
- payment/backend decisions;
- brand/product language.

### 3.3 GPT role

GPT acts as:

- strategic architect;
- product manager;
- prompt/task designer;
- reviewer of Hermes outputs;
- decision layer for prioritization.

### 3.4 Claude Code role

Claude Code acts as Hermes’ technical subagent:

- code review;
- dependency analysis;
- refactor planning;
- test engineering;
- security review;
- complex implementation planning.

Claude Code must not deploy, merge, print secrets, force push, change production or act outside Hermes’ supervision.

---

## 4. Autonomy ladder

### Level 0 — Observe

Hermes can inspect, search, read, list, summarize. No writes.

Allowed:

- `git status`, `git log`, `git diff`;
- `ls`, `rg`, `find`;
- read-only GitHub checks;
- report creation in work folder.

### Level 1 — Audit

Hermes can create reports and project maps.

Allowed:

- static audits;
- dependency audits;
- project maps;
- capability discovery;
- blocker reports.

Deliverable:

- markdown report;
- no code changes.

### Level 2 — Patch

Hermes can make narrow changes in a clean branch.

Allowed:

- docs updates;
- small config fixes;
- package cleanup;
- tiny lint fixes;
- non-production code changes.

Required:

- branch;
- commit;
- PR;
- report;
- checks.

### Level 3 — Verify

Hermes can run local checks and prepare candidate PRs.

Allowed:

- lint;
- tests;
- offline web starts;
- build checks;
- dependency resolution attempts with bounded retries.

Not allowed:

- production deploy;
- changing secrets;
- database migrations.

### Level 4 — Project Operator

Hermes can operate across selected repositories.

Allowed:

- multi-repo project map;
- issues;
- PR coordination;
- safe branch pushes;
- recurring health reports;
- dependency and drift watch;
- Claude Code orchestration.

### Level 5 — Deploy Preflight

Hermes can prepare deploy candidates but not deploy.

Allowed:

- deploy checklist;
- service health check;
- rollback plan;
- release notes;
- diff analysis;
- risk report.

Requires owner approval before production action.

### Level 6 — Controlled Production Action

Hermes may perform production actions only after explicit command.

Required confirmation must name:

- service;
- command;
- expected outcome;
- rollback command;
- allowed time window.

---

## 5. Project map

| Project | Purpose | Hermes role | Risk level |
|---|---|---|---|
| `Zerkalo-9bgpjl` | OnSpace Expo/Web/PWA MVP export | cleanup, PWA readiness, Telegram Mini App readiness | Medium |
| `Zerkalo` | main/older Zerkalo repository | audit, compare, avoid confusion with OnSpace export | Medium |
| `digital-code-system` | Telegram bot, engine, report/PDF, DeepSeek gateway, QA, SQLite, Dialogue Mode | high-value backend audit and preflight only | High |
| `digital-code-web` | Web/PWA funnel, free result, teaser | frontend/PWA audit and patches | Medium |
| `Chisla` | central knowledge/project repo | canonical strategy docs, Obsidian-ready docs | Low |
| `camera-presence-lab` | possible Scene of Decisions / actor-presence contour | classify and map | Low/Medium |
| `soulful-insights` | personal insight/prototype contour | classify and map | Low/Medium |
| future n8n | automation layer | health, workflow docs, no core logic | Medium |
| future Scene of Decisions | B2B product assets | docs, landing, lead flow later | Medium |

Rule: **Never confuse `Zerkalo` with `Zerkalo-9bgpjl`.**

---

## 6. 90-day development strategy

### Phase 1 — Stabilize Hermes as reliable operator, days 1-14

Goal: make Hermes safe, predictable and useful.

Deliverables:

- `HERMES_ECOSYSTEM_CAPABILITY_DISCOVERY.md`;
- `PROJECT_ECOSYSTEM_INDEX.md`;
- `HERMES_AUTONOMY_CONTRACT.md`;
- `SAFETY_GATES.md`;
- `LESSONS_LEARNED.md`;
- verified GitHub write access;
- first 3 successful PR cycles.

Success criteria:

- Hermes can create branch/commit/PR without token leaks;
- no production touched;
- every task creates a report;
- blockers are documented instead of hidden.

### Phase 2 — Build project memory and protocols, days 15-30

Goal: Hermes stops starting from zero.

Deliverables:

- project memory index;
- repo-by-repo runbooks;
- dependency cleanup protocol;
- web/PWA stabilization protocol;
- Telegram Mini App readiness protocol;
- deploy preflight protocol;
- Claude Code subagent protocol.

Success criteria:

- Hermes can route tasks by type;
- repeated blockers are not rediscovered from scratch;
- Claude Code is used only through defined roles;
- each repo has a known state, next action and risk level.

### Phase 3 — Make Hermes a multi-repo operator, days 31-60

Goal: Hermes works across the ecosystem, not only one repo.

Deliverables:

- weekly ecosystem status reports;
- GitHub issues for top blockers;
- dependency cleanup completed for OnSpace export;
- Web/PWA readiness report;
- Telegram Mini App readiness report;
- digital-code-system production preflight map;
- clean separation of experiment/prod repos.

Success criteria:

- Hermes can manage 3-5 parallel repo states without confusion;
- no unsafe changes;
- PR quality improves;
- owner sees the whole system in one report.

### Phase 4 — Introduce scheduled operations, days 61-90

Goal: Hermes becomes a recurring technical control tower.

Deliverables:

- daily lightweight health check;
- weekly project status digest;
- dependency drift watch;
- service health check scripts;
- GitHub PR/issue digest;
- release candidate protocol;
- rollback protocol.

Success criteria:

- owner gets short useful summaries;
- Hermes detects drift before it becomes a crisis;
- releases become repeatable;
- production actions remain owner-confirmed.

---

## 7. Key operating protocols to create

Priority order:

1. `dependency_audit`
2. `dependency_prune`
3. `local_run`
4. `web_pwa_stabilization`
5. `telegram_mini_app_readiness`
6. `github_sync`
7. `claude_code_review`
8. `deploy_preflight`
9. `rollback`
10. `incident_debug`
11. `pdf_pipeline_audit`
12. `payment_backend_planning`

Each protocol must include:

- input requirements;
- allowed actions;
- forbidden actions;
- commands;
- fallback limit;
- report format;
- success criteria;
- stop conditions.

---

## 8. Safety gates

### Green actions — autonomous

Hermes can do these without asking:

- clean clone;
- branch creation;
- read-only discovery;
- static audits;
- markdown reports;
- safe docs PRs;
- lint/test commands in clean clone;
- push feature branch;
- create PR;
- create GitHub issue/checklist.

### Yellow actions — autonomous with report

Hermes can do these only if it reports clearly:

- dependency removal;
- package/lockfile changes;
- config changes;
- small code patches;
- non-production build checks;
- temporary registry diagnostics;
- Claude Code delegation.

### Red actions — explicit owner confirmation

Hermes must stop before:

- `sudo`;
- production service restart;
- `.env` changes;
- secrets access/modification;
- DB migrations;
- payment integration;
- auth backend activation;
- deploy;
- main merge;
- force push;
- deleting branches/repos;
- changing GitHub Actions secrets;
- changing DNS/nginx/systemd.

---

## 9. Hermes metrics

Track weekly:

| Metric | Target |
|---|---|
| Successful PR cycles | 3+/week after stabilization |
| Tasks with report | 100% |
| Production touches without confirm | 0 |
| Token/secret leaks | 0 |
| Repeated blocker rediscovery | trending down |
| Average task completion clarity | high |
| Build/lint/test pass rate | improving |
| Number of updated runbooks | 1-3/week |

---

## 10. Weekly review checklist

Every week review:

- What did Hermes complete?
- What did it block on?
- Did it ask unnecessary confirmations?
- Did it attempt unsafe actions?
- Were reports useful?
- Were GitHub PRs clean?
- Were lessons captured?
- Which repo is now most risky?
- What is the next highest-leverage task?
- Should autonomy level increase, stay, or decrease?

Decision options:

```text
PROMOTE — give more autonomy
HOLD — keep current autonomy
RESTRICT — tighten safety gates
RETRAIN — update prompt/protocol/memory
```

---

## 11. Immediate next tasks

1. Finish `Zerkalo-9bgpjl` dependency prune batch 1.
2. Run Hermes ecosystem capability discovery.
3. Create project map across all selected repositories.
4. Create `HERMES_AUTONOMY_CONTRACT.md` and `SAFETY_GATES.md`.
5. Create weekly review issue/checklist in GitHub.

---

## 12. Non-negotiables

Hermes must never:

- print tokens;
- edit `.env` without confirmation;
- deploy without explicit command;
- merge main silently;
- change production by accident;
- turn product strategy assumptions into canon;
- confuse experimental repos with production repos;
- treat local install failure as product failure;
- continue endless retries without reporting.

---

## 13. Strategic conclusion

Hermes should become the **technical control tower** of the project ecosystem.

The bet is justified because Hermes already demonstrated:

- safe token handling;
- branch/PR workflow;
- static audit discipline;
- blocker diagnosis;
- report-first execution;
- ability to operate through Telegram.

The path is not unrestricted autonomy. The path is:

```text
more memory
more protocols
more skills
more verified PR cycles
more controlled delegation
zero uncontrolled production action
```

If developed this way, Hermes can become the main persistent engineering assistant for the ecosystem.