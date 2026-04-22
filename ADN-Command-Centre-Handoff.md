# ADN Command Centre — Claude Code Handoff

**Status:** v2 working prototype (~93KB single HTML file). Moving to Claude Code for power build.
**Owner:** Sarah Sayles, Project Manager, Monsoon Accessorize
**Goal:** A tool that runs my working life — every minute planned, nothing slips, I actually execute instead of over-plan.

---

## 🎯 THE CORE PROBLEM

I am disorganised, over-plan, under-execute, get bored mid-task, and never finish anything to completion. I run two demanding roles in parallel (HCM Air implementation + Payroll & Reward) with Go Live on 16 June 2026. I need a tool that forces execution, not another place to organise my thoughts.

The tool must be:
- **iPad-first** (I use Apple Pencil heavily)
- **Sassy but supportive** — calls out avoidance without being cruel
- **AI-native** — Claude API + my Brain File powering everything
- **Relentless** — won't let me waiver from what needs doing
- **Always open** all day, every day

---

## 📦 WHAT EXISTS (v2 PROTOTYPE)

Single HTML file. ~93KB. Uses:
- Claude API (`claude-sonnet-4-20250514`) via browser-direct calls
- localStorage for persistence
- Google Fonts (Playfair Display + DM Sans)
- No build step, no framework, vanilla JS

**6 Tabs:**

1. **Today** — Rule of 3 active tasks, sassy greeting, completion dots, stat pills, upcoming 5-day view, active task cards with scoring
2. **Tasks** — Full backlog sorted by analyst score (1–100), grouped by category, promote button blocked at 3/3
3. **Schedule** — Month calendar with meetings + task dots, click day for detail
4. **Compose** — AI drafts emails, agendas, updates, action lists
5. **Progress** — Milestones, streak counter, shame board, recent days
6. **Settings** — API key, save/load JSON, clear all

**Always available (top bar buttons):**
- ➕ **Task** — Add single task modal
- 🧠 **Dump** — Brain dump (paste list, auto-detect category + effort)
- ✏️ **Pencil** — Apple Pencil canvas (3 modes: tasks / note / freeform)
- 📅 **Calendar** — Paste Outlook calendar, parses meetings
- 🤖 **Copilot** — Paste ANY Copilot output, AI sorts into tasks/meetings/decisions
- 📧 **Email** — Bulk upload .eml files, AI extracts actions
- 🧠 **Brain** — Load Brain File (living context document)
- 💾 **Save** / 📂 **Load** — Export/import JSON

**Always available (command bar):**
- 🔄 **replan** — AI rebuilds my remaining day
- 👉 **what now** — Single next action
- 😵 **stuck** — 5-minute starter, zero thinking
- 🪞 **be honest** — Calls out avoidance patterns
- ⚡ **force me** — 60-second aggressive kickoff

**Core mechanic — RULE OF 3:**
- Max 3 active tasks at any time, physically enforced
- Unfinished active tasks roll to next day with 🔄×N counter
- Rolled 2+ days = stale (orange border), 3+ = ancient (red border)
- Scoring: Urgency 30% + Priority 25% + Days Waiting 20% + Avoidance Risk 15% + Effort 10%

**Per-task features:**
- Subtasks/checklist
- Notes
- Attachments (PDF/images/text — Claude reads them)
- Dedicated chatbot with conversation history
- Quick actions adapt when attachments present

---

## ✅ WHAT WORKS WELL

- Rule of 3 enforcement
- Task scoring and sorting
- Brain dump (typed)
- AI commands (5 of them, all context-aware)
- Chatbot per task with attachment support
- Apple Pencil handwriting → task extraction
- Copilot paste → structured extraction
- Calendar month view + day detail
- Meeting management
- Save/Load JSON for persistence
- Sassy greetings that change based on completion state

---

## ⚠️ WHAT'S CLUNKY / MISSING

### Core UX issues
1. **No time-blocking** — I see meetings on a calendar but the tool doesn't *schedule* my tasks into my actual day. I need every minute planned.
2. **No nudges or notifications** — If I walk away, nothing pulls me back. Should have push notifications or at least visible timer/countdown per active task.
3. **No focus mode** — I need a "work on this now" mode that hides everything except the one task, shows a timer, has the chatbot pinned.
4. **No daily close-out** — The tool should force an end-of-day review before I close: what got done, what's rolling, commitment for tomorrow.
5. **No weekly planning** — I need a Sunday/Monday ritual where I set the week's outcomes.

### Data
6. **No recurring tasks** — "Weekly Zellis call prep" should auto-create.
7. **No dependencies** — Can't mark Task B as blocked by Task A.
8. **No templates** — Common tasks like "Prepare for 1:1 with Katharine" should be one-click.
9. **Tasks can't be linked to meetings** — If a meeting generates actions, I want them tied back for context.
10. **Decisions tab removed** — I have it in Copilot extracts but no dedicated view to browse decision log.

### Integration
11. **No real calendar sync** — Still manual paste. Outlook .ics subscription would be better.
12. **No real email integration** — .eml bulk upload works but Power Automate pipeline isn't built yet.
13. **No SharePoint sync** — Should save Brain File + task JSON to SharePoint automatically.
14. **No Teams integration** — Could post daily summary to a private Teams channel.

### AI
15. **Brain File is static** — Should update automatically as tasks complete, decisions are made, people change role.
16. **No learning** — Tool doesn't notice I always avoid certain task types. Should build a personal avoidance profile.
17. **No pattern detection** — e.g. "You complete 3× more tasks before 11am than after" → schedule hard tasks in morning.
18. **Sassy messages are fine but could be sharper** — Should reference specific rolled counts, days waiting, patterns.

### Mobile / iPad
19. **Pencil works but UI not fully optimised** — Some modals need bigger tap targets.
20. **No offline mode** — Tool breaks without internet for AI calls.
21. **No widget / home screen shortcut** — Should be a PWA.

### Analytics
22. **Stats are basic** — Want heat maps, category split, time-of-day patterns, weekly trends.
23. **No goal tracking** — "Complete SRW by 30 April" — tool should track progress toward it.

### Safety
24. **No undo** — Delete is permanent.
25. **No version history** — Can't see task edit history.
26. **localStorage only** — Vulnerable to being cleared.

---

## 🧠 CONCEPTS I WANT TO ADD

### 1. **Full day timeboxing**
Every minute of 09:00–17:00 scheduled. Tasks get time blocks. Meetings get prep time before and buffer after. Lunch is a block. The tool decides based on task effort + my calendar + my energy profile. I can drag-reorder.

### 2. **Focus mode**
Tap a task → full-screen view with:
- Task title huge
- Timer counting up (or down if I set one)
- Chatbot pinned open
- Subtasks as a simple checklist
- "Pause" and "Done" buttons only
- Everything else blurred or hidden

### 3. **Morning ritual (09:00 prompt)**
When I open the tool each morning:
- Review yesterday's 3 (what completed, what rolled)
- AI suggests today's 3 based on backlog score + meetings + energy
- I approve or swap
- Day auto-timeboxes
- First task auto-activates

### 4. **Evening ritual (end of day prompt)**
Before I close:
- "What got done?" (click completions)
- "What's rolling?" (see list, each one gets +1 🔄)
- "Tomorrow's 3?" (auto-suggested, I confirm)
- Teams/email summary to self with the day's wins

### 5. **Energy-aware scheduling**
Track completion rate by hour. If I'm 3× more productive 9–11am, schedule hardest tasks there. Low-energy tasks (admin, chases) go to afternoon slump.

### 6. **Avoidance detection**
If a task rolls 3+ days, AI asks: "You've been skipping X for a week. Is it the wrong task, or are you procrastinating?" Forces a decision: cut, delegate, or do it.

### 7. **Meeting-to-task pipeline**
After every meeting, auto-prompt: "What came out of this?" AI suggests tasks from agenda + my notes. Pre-filled, I just approve.

### 8. **Voice capture**
Quick voice note → AI transcribes → creates task.

### 9. **Habit tracking lite**
Daily non-negotiables (review inbox, check SRW tracker, 10min walk). Shown as streaks separate from main 3.

### 10. **Weekly review ritual**
Friday afternoon prompt: what went well, what didn't, what's priority next week.

---

## ❓ QUESTIONS TO ANSWER BEFORE YOU BUILD

Claude Code — Sarah will tell you which to prioritise:

### Scope
1. **Single HTML file or proper web app?** v2 is single HTML. Multi-file React/Vue with a build step means easier maintenance but harder to drop on iPad.
2. **PWA?** Install as home screen app, offline-capable, push notifications?
3. **Hosted?** GitHub Pages? Or kept local?
4. **Auth?** Single user (me) but if file is hosted, does it need login?

### Data
5. **Still localStorage, or move to IndexedDB for bigger files?**
6. **Sync to SharePoint?** How — Graph API? Power Automate middleware?
7. **Sync to Outlook calendar real-time?** ICS subscription read-only, or full Graph API integration?
8. **Backup strategy?** Auto-export JSON to a folder every X hours?

### AI
9. **Keep API key in the client, or proxy through a backend for safety?**
10. **Claude model choice** — stick with Sonnet, or Opus for the sassy commands and Haiku for cheaper extractions?
11. **How aggressive should the AI be?** Full agent mode (AI decides what I do next and tells me), or advisory (I decide, AI suggests)?

### UX
12. **Do I want notifications?** Browser push, or iOS push via PWA?
13. **Time-blocking visualisation** — timeline on left, calendar grid, or something else?
14. **Apple Pencil — do I want to draw directly on tasks** (annotations), or just for brain dump?
15. **Voice input — iOS Safari speech recognition, or via Whisper API?**

### Behaviour
16. **Rule of 3 — firm max, or can I flex to 5 on occasion?**
17. **Rollover — automatic at midnight, or manual end-of-day?**
18. **Sass level — keep medium, or add a setting?**
19. **Do I want weekly goals separate from daily 3s?**

### Integrations
20. **Teams** — post daily summary to myself? Pull @mentions as tasks?
21. **Email** — Outlook rule → Power Automate → tool? Or forward-to-email address?
22. **SharePoint** — central source of truth for Brain File + JSON?
23. **Canva/Figma** — any need? (probably not)

---

## 📋 PRIORITY OPTIMISATIONS — BUILD ORDER

**Phase 1 — Foundation (1 week)**
- [ ] Migrate to proper project structure (keep vanilla JS if possible, or go React)
- [ ] IndexedDB for task/attachment storage (larger capacity)
- [ ] Auto-backup to SharePoint every 4 hours via Power Automate webhook
- [ ] PWA manifest + service worker for offline
- [ ] Fix bulk-delete bug (delete modal behaviour)
- [ ] Undo for task deletion (30-second window)

**Phase 2 — Execution engine (2 weeks)**
- [ ] Full day timeboxing — every minute scheduled
- [ ] Focus mode — full-screen single task view with timer
- [ ] Morning ritual — auto-prompt at 9am with day plan
- [ ] Evening ritual — force end-of-day review
- [ ] Recurring tasks
- [ ] Task templates (1:1 prep, weekly report, etc)

**Phase 3 — Intelligence (2 weeks)**
- [ ] Energy profile — track completion by hour, suggest scheduling
- [ ] Avoidance detection with intervention prompts
- [ ] Meeting-to-task auto-pipeline
- [ ] Self-updating Brain File based on tasks/decisions
- [ ] Weekly review ritual with AI summary

**Phase 4 — Integration (1-2 weeks)**
- [ ] Outlook calendar live sync (ICS read)
- [ ] Power Automate flow: email folder → tool
- [ ] Teams daily summary post
- [ ] Voice input via iOS speech API

**Phase 5 — Polish (ongoing)**
- [ ] Heat maps + analytics
- [ ] Goal tracking with progress bars
- [ ] Habit tracker for non-negotiables
- [ ] Advanced Pencil features (annotate on tasks)
- [ ] Multi-device sync if needed

---

## 🎨 DESIGN SYSTEM (keep consistent with v2)

**Fonts:**
- Headings: Playfair Display (serif, elegant)
- Body: DM Sans (clean, modern)

**Colours:**
```
--primary: #B8707A  (rose)
--primary-lt: #F2E0E3
--primary-soft: #F9F0F2
--gold: #C9A87C
--navy: #2D2A26
--green: #7EA87A
--danger: #C4686E
--warn: #C9A249
--info: #6B8EAE
--purple: #8A6AAA
--teal: #5A8A8A
--bg: #FBF8F5
--card: #FFF
--border: #EDE8E3
```

**Tone:**
- Sass level: medium, playful, firm but supportive
- Never cruel or demeaning
- Direct, no waffle
- References specific tasks/deadlines by name
- Calls out avoidance patterns
- Celebrates wins but doesn't dwell

**Language rules:**
- Always "Monsoon Accessorize" (never "Adena Brands")
- "project" not "programme"
- "Payroll & Reward" not "BAU Payroll"
- Generic "HR Director" in documents (not by name)

---

## 🧠 BRAIN FILE FORMAT

The tool loads a JSON file with project context. Gets injected into every AI system prompt. Format:

```json
{
  "user": { "name", "role", "company", "workStyle" },
  "project": { "name", "description", "goLive", "uatOpens", "workforce" },
  "people": { "name": { "role", "relationship" } },
  "workstreams": { "name": { "status", "description", "features", "inProgress" } },
  "activeBlockers": [],
  "resolvedBlockers": { "items": [] },
  "naming": { "rules": [] },
  "designSystem": {},
  "patterns": {}
}
```

Sarah will provide the latest Brain File separately — it has everything about HCM Air, SRW, consultation tool, payroll validator, people, blockers etc.

---

## 🚀 SUGGESTED CLAUDE CODE PROMPT

Copy-paste this to start Claude Code on this project:

---

```
I'm taking over the ADN Command Centre — a personal productivity tool I've been prototyping with Claude on the web. You'll find the current v2 HTML file and a comprehensive handoff document attached.

Context:
- I'm Sarah Sayles, Project Manager at Monsoon Accessorize
- Leading a massive HCM Air (Zellis) implementation alongside BAU Payroll & Reward
- Go Live: 16 June 2026, UAT opens 18 May
- iPad-first user, Apple Pencil, direct/sassy tone preferred
- Problem: I over-plan, under-execute, get bored mid-task, never finish

Your job:
1. Read the handoff document (ADN-Command-Centre-Handoff.md) fully before doing anything
2. Read the v2 HTML file to understand what already works
3. Read the Brain File for full project context
4. Ask me the priority questions from the handoff before starting
5. Then build in phases as outlined in the handoff

Build principles:
- Every feature must serve "force execution, not more planning"
- Rule of 3 is sacred — don't break it
- iPad-first, Apple Pencil supported
- Sass + warmth — never cruel
- Reference real people/systems from the Brain File in AI responses
- Single HTML file stays the target unless you strongly recommend multi-file
- Use Claude API directly (I'll provide key), model: claude-sonnet-4-20250514
- Test every change before telling me it works

Start with Phase 1 foundation work. Ask me the scope questions first. Don't build until we've agreed the approach.

Files attached:
- ADN-Command-Centre-v2.html (current prototype)
- ADN-Command-Centre-Handoff.md (this document)
- ADN-Brain-File.json (project context)

Go.
```

---

## 📎 FILES TO BRING TO CLAUDE CODE

1. **ADN-Command-Centre-v2.html** (the working prototype — ~93KB)
2. **ADN-Command-Centre-Handoff.md** (this document)
3. **ADN-Brain-File.json** (your project context — load into the tool too)
4. Optionally: the Power Automate guide if you want to continue that work

---

## 💡 FINAL THOUGHTS

The tool works as a prototype. It's not the problem — execution is. The move to Claude Code is about getting more powerful iteration cycles, not starting from scratch.

The real unlock will be Phase 2 (execution engine) — timeboxing, focus mode, morning/evening rituals. That's what will make this go from "productivity app" to "thing that actually runs my day."

Don't let Claude Code build 20 features before any are polished. Pick one Phase 1 item, nail it, ship it, test it in your actual day, then move on.

And when you get frustrated and want to redesign everything from scratch — stop. Iterate on what exists.

💅

---

**Document version:** 1.0
**Date:** 10 April 2026
**Author:** Claude (web) handing off to Claude Code
