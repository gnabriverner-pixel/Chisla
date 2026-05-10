# ACTIVE WORKSTREAMS

**Status:** Active ecosystem map v1.0  
**Date:** 2026-05-10  
**Purpose:** one-page control map for Digital Code / Zerkalo work across chats, agents and repositories.

---

## 1. North Star

Bring the current production contour to stable quality and first money.

Main contour:

```text
Zerkalo web → Telegram DigitalBot → Basic/Deep → Big Research / manual premium analysis
```

Current top goal:

```text
Live product clarity before further expansion.
```

---

## 2. Workstream priority

| Priority | Workstream | Status | Primary agent | Repo | Current next action |
|---|---|---|---|---|---|
| A | DigitalBot voice hardening / Basic / Deep | Active — highest priority | ClaudeCode + Hermes | `digital-code-system` | Runtime prompt check → owner live smoke → real output audit |
| B | Zerkalo web → Telegram bot funnel | Next | ClaudeCode / Hermes | `Zerkalo` + `digital-code-system` | Only after Basic/Deep live quality is acceptable |
| C | Big Research monetization | Active manually | Owner + Product Lead | `digital-code-system` / Notion | First 1-3 pilot clients, 5-7k ₽ pilot, target 15k ₽+ later |
| D | OnSpace Mini App / `Zerkalo-9bgpjl` | Experimental | Codex / Hermes | `Zerkalo-9bgpjl` | Value extraction audit, not main production build |
| E | PDF verification | Technical supporting track | Hermes / ClaudeCode | `digital-code-system` | Verify after bot text quality and smoke |
| F | Agent operating system | Minimal control only | Product Lead / Hermes | `Chisla` | Keep only protocol, workstreams, release log |

---

## 3. Repository roles

### `digital-code-system`

Purpose:

- Telegram DigitalBot;
- Python engine;
- DeepSeek LLM gateway;
- Basic/Deep generation;
- PDF;
- voice standards;
- runtime gate specs;
- quality tests.

Priority:

- production-critical.

Current focus:

- verify production uses updated `master_prompt.md`;
- run live smoke;
- audit real generated report;
- decide whether to implement `voice_gate_scan` Phase A.

Do not casually touch:

- `engine.py`;
- `llm_gateway.py`;
- `knowledge_base.json`;
- production `bot_mvp.py`;
- payment flow;
- `.env`.

### `Zerkalo`

Purpose:

- live web product / `zerkalosebya.ru`;
- First Mirror;
- Personal Myth;
- lead capture;
- web → bot funnel later.

Priority:

- production-critical, but after DigitalBot text quality.

Current focus:

- preserve live stability;
- prepare web → Telegram bot CTA only after bot text passes smoke.

### `Zerkalo-9bgpjl`

Purpose:

- OnSpace-imported Expo / React Native / Expo Web / potential Mini App prototype;
- UX/visual laboratory;
- experimental Mini App/PWA extraction.

Priority:

- experimental.

Current status:

- dependency prune Batch 1 completed and merged in PR #3;
- do not make it the main production stack yet.

Current next action:

- value extraction audit:
  - useful screens;
  - useful UX patterns;
  - useful visual/design-system ideas;
  - incompatible elements;
  - possible transfer to live web/PWA;
  - postpone list for Mini App phase.

### `Chisla`

Purpose:

- ecosystem control layer;
- canonical operating docs;
- cross-project strategy map;
- Obsidian-ready project memory.

Priority:

- control, not product execution.

Current focus:

- keep minimal operating clarity;
- avoid doc sprawl.

### `digital-code-web`

Purpose:

- earlier/sibling web prototype.

Priority:

- reference only unless explicitly reactivated.

---

## 4. Current immediate sequence

### Step 1 — Hermes runtime check

Goal:

- confirm production DigitalBot uses updated `master_prompt.md`.

Output:

- service active yes/no;
- working directory;
- ExecStart;
- prompt timestamp/hash;
- voice markers present;
- recent errors;
- safe to live smoke yes/no.

### Step 2 — Owner live smoke

Try:

```text
/zerkalo_test 06.05.1986
```

If unavailable, use normal bot path:

```text
/start
Артём
Мужчина
Базовый Код
06.05.1986
```

Output needed:

- full generated Basic text or screenshots.

### Step 3 — Product Lead quality audit

Check:

1. Opening without defensive framing.
2. Claims tied to numbers.
3. No therapy/catastrophe/esoteric fog.
4. No accusatory language.
5. Precision, image, rhythm, dignity.

### Step 4 — Decision gate

If text fails:

- diagnose prompt path / KB / bot runtime / LLM;
- likely implement `voice_gate_scan` Phase A.

If text passes:

- connect Zerkalo web → Telegram bot;
- begin first manual Big Research sales loop.

---

## 5. OnSpace / Mini App policy

Do not continue heavy Mini App development now.

Current action is only value extraction:

- what screens are worth keeping;
- what visual patterns are premium;
- what UX flow helps Zerkalo;
- what must not be transferred;
- what waits until Mini App phase.

Reason:

- Mini App is not the main production contour until DigitalBot text and funnel are validated.

---

## 6. Big Research pricing note

Pilot price:

```text
5-7k ₽ for first 1-3 clients, manually delivered, feedback-oriented.
```

Target price after proof:

```text
15k ₽+ as premium Big Research / personal analytical file.
```

Do not let pilot pricing define the long-term brand ceiling.

---

## 7. Workstream conflict rule

If a new task touches files already owned by another active workstream, stop and create a coordination note.

Current high-risk overlapping files:

- `digital-code-system/master_prompt.md`;
- `digital-code-system/bot_mvp.py`;
- `digital-code-system/llm_gateway.py`;
- `digital-code-system/knowledge_base.json`;
- `Zerkalo` live production files;
- `package.json` / lockfiles in any frontend repo.

---

## 8. What not to do now

Do not:

- start another broad strategy cycle;
- make OnSpace Mini App the main product;
- rewrite all prompts before seeing live output;
- implement repair-pass before scan-only evidence;
- change payment flow;
- deploy/restart production without approval;
- mix dependency cleanup with UI or product work;
- create more planning docs beyond the minimal control set.

---

## 9. Current decision

The next real action is:

```text
Hermes runtime prompt check → owner live smoke → audit real text.
```

Everything else waits unless it directly supports this path.