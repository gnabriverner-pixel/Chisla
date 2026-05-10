# Hermes Agent Development Strategy

Tags: #Hermes #AgentOS #Zerkalo #DigitalCode #Operations
Status: Canonical strategy v1.0

Related:
- [[PROJECT_ECOSYSTEM_INDEX]]
- [[HERMES_AUTONOMY_CONTRACT]]
- [[SAFETY_GATES]]
- [[LESSONS_LEARNED]]
- [[Zerkalo]]
- [[Цифровой Код]]

## Суть

Hermes должен стать центральным операционным агентом технической экосистемы: не заменой GPT/Claude/Codex, а постоянным инженерным оператором, который живёт рядом с VPS, GitHub, проектами, отчётами, cron, memory и safety gates.

Целевая схема:

```text
Owner / GPT strategy layer
        ↓
Hermes as Project Operating Agent
        ↓
Claude Code / Codex / CLI / GitHub / VPS / cron / MCP / skills
        ↓
Reports, branches, PRs, safe patches, audits, checks, deploy preflights
```

## Главный принцип

Hermes получает свободу внутри протоколов, но не получает права на неконтролируемый production.

Путь развития:

```text
audit → report → branch → PR → review → merge → lesson captured
```

## Autonomy ladder

### Level 0 — Observe

Только чтение и диагностика.

### Level 1 — Audit

Отчёты, карты проектов, blocker reports.

### Level 2 — Patch

Узкие изменения в ветке, PR, проверки.

### Level 3 — Verify

Локальные проверки, lint/test/build/preflight.

### Level 4 — Project Operator

Работа по нескольким репозиториям, issues, PR, weekly reports, Claude Code orchestration.

### Level 5 — Deploy Preflight

Подготовка релиза, rollback plan, release notes. Без deploy.

### Level 6 — Controlled Production Action

Только по явной команде owner с указанием сервиса, команды, ожидания и rollback.

## Карта проектов

| Project | Purpose | Hermes role | Risk |
|---|---|---|---|
| Zerkalo-9bgpjl | OnSpace Expo/Web/PWA MVP export | cleanup, PWA, Telegram Mini App readiness | Medium |
| Zerkalo | основной/старый repo | audit, compare, avoid confusion | Medium |
| digital-code-system | bot, engine, PDF, DeepSeek, QA, SQLite | backend audit/preflight | High |
| digital-code-web | web/PWA funnel | frontend/PWA patches | Medium |
| Chisla | central knowledge/project repo | canonical strategy docs | Low |
| camera-presence-lab | possible Scene of Decisions contour | classify and map | Low/Medium |
| soulful-insights | personal insight/prototype contour | classify and map | Low/Medium |

Rule: не путать `Zerkalo` и `Zerkalo-9bgpjl`.

## 90-day path

### Days 1-14 — Stabilize Hermes

Deliverables:
- HERMES_ECOSYSTEM_CAPABILITY_DISCOVERY.md
- PROJECT_ECOSYSTEM_INDEX.md
- HERMES_AUTONOMY_CONTRACT.md
- SAFETY_GATES.md
- LESSONS_LEARNED.md
- first 3 successful PR cycles

### Days 15-30 — Memory and protocols

Deliverables:
- project memory index
- repo runbooks
- dependency cleanup protocol
- web/PWA protocol
- Telegram Mini App protocol
- deploy preflight protocol
- Claude Code subagent protocol

### Days 31-60 — Multi-repo operator

Deliverables:
- weekly ecosystem status reports
- GitHub issues for blockers
- dependency cleanup for OnSpace export
- Web/PWA readiness report
- Telegram Mini App readiness report
- digital-code-system preflight map

### Days 61-90 — Scheduled operations

Deliverables:
- daily health check
- weekly status digest
- dependency drift watch
- service health scripts
- GitHub PR/issue digest
- release candidate protocol
- rollback protocol

## Safety gates

### Green — autonomous

- clean clone
- branch
- static audit
- reports
- docs PR
- lint/test in clean clone
- push feature branch
- create PR/issue

### Yellow — autonomous with report

- dependency removal
- package/lockfile changes
- config changes
- small code patches
- non-production build checks
- Claude Code delegation

### Red — explicit confirm

- sudo
- production restart
- .env/secrets
- DB migrations
- payment/auth backend
- deploy
- main merge
- force push
- DNS/nginx/systemd

## Weekly review

Вопросы для сверки:

- Что Hermes завершил?
- Где застрял?
- Были ли лишние confirm?
- Были ли unsafe attempts?
- Были ли полезные отчёты?
- Чисты ли PR?
- Уроки занесены?
- Какой repo сейчас самый рискованный?
- Следующая high-leverage задача?
- Autonomy: promote / hold / restrict / retrain?

## Immediate next tasks

1. Finish `Zerkalo-9bgpjl` dependency prune batch 1.
2. Run Hermes ecosystem capability discovery.
3. Create project map across selected repos.
4. Create `HERMES_AUTONOMY_CONTRACT.md` and `SAFETY_GATES.md`.
5. Create weekly review issue/checklist in GitHub.

## Strategic conclusion

Hermes должен стать технической диспетчерской экосистемы.

Ставка оправдана, потому что он уже показал:

- safe token handling;
- branch/PR workflow;
- static audit discipline;
- blocker diagnosis;
- report-first execution;
- Telegram operation loop.

Формула развития:

```text
more memory
more protocols
more skills
more verified PR cycles
more controlled delegation
zero uncontrolled production action
```
