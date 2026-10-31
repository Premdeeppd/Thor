# Odin playbook

Your reference for every Odin task. Built from the Project Guidelines PDF, the "Welcome to Project Odin" video, the "Create your first idea" video, and the newer AI-use rules you reported (all 31 Oct 2026).

> **Close this file before you press Record.** Nothing showing Mercor or Odin may be on screen while recording.

## What Odin wants

Screen recordings of real professional work on a Mac, narrated as you go: **what** you're doing, **where** (which app, which menu or button) and **why**. The recordings train a frontier AI model on how experts use apps, menus and macOS. Every task ends with a finished deliverable that shows your judgment and a check that it's correct.

## Rules that get tasks sent back

| Rule | What it means in practice |
|---|---|
| AI for the idea text is allowed | The newer guidelines allow any AI tool for drafting **Describe your idea**. The older PDF said not to paste AI text, so if a reviewer ever queries it, point to the newer guidelines. The plan must still be one you can carry out, because your recording is checked against it. |
| No AI while recording | Quit ChatGPT, Claude, Antigravity, Wispr Flow and Raycast first. Inside task apps, leave AI alone: VS Code Copilot/Chat, Brave's Leo, Chrome's Gemini and DevTools "AI assistance", Postman's Postbot/Agent Mode, Compass's natural-language queries, Gemini in Google Docs/Sheets. |
| Disclose AI-made inputs | Inputs prepared with AI *before* recording are allowed (any AI tool, not only Gemini), as long as you disclose which ones are AI-produced. |
| Inputs are self-made or synthetic | No real customer/company data, nothing proprietary. Anything downloaded must be CC0 or public domain. |
| No restricted apps | See the banned list below. TextEdit is allowed **only** for writing Metadata.rtf. Don't use Notes or TextEdit for the opening Goal doc. Desktop Excel causes recording problems, so use Google Sheets or Excel on the web. |
| 2–3 apps, each doing real work | Finder doesn't count. Apps you only open briefly don't count. Name web apps (Google Sheets), not the browser, unless the browser itself does the work (DevTools does). The **same list** goes in Studio's Apps field, TaskRecorder's Used Apps and Metadata.rtf. |
| Length 15:00–50:59 | Includes the intro (under 20 s) and the epilogue (3–4 min, 4:00 max). Aim for 30–40 min. |
| Mostly mouse-driven | Prefer menus, panels and buttons over shortcuts and terminal commands, and say what you click. |
| No padding, no tinkering | Don't wait around, and stop once the task is done. Before stopping, check the output is accurate, readable and usable. |
| Variety | Each task needs a different objective, method, flow between apps, or deliverable. Changing only the dataset, client name, colours or file format doesn't count. |
| Change the desktop between tasks | Change at least one of: resolution, light/dark mode, wallpaper (built-in, not the default), Dock size, accent colour / sidebar icon size / in-app theme. Moving the Dock doesn't count. Keep the cursor's size and colour at their defaults. |
| One Studio task per idea | After approval the same task moves to In Progress. Keep working there; don't create a new one. |

### Banned apps (list shown in the idea video, effective 16 Oct 2026)

Godot, VSCodium, Inkscape, GIMP, Blender, MATLAB, Sublime Text, Photoshop, Ableton Live, ZBrush, Grammarly, Microsoft Whiteboard, Adobe Bridge, Adobe Animate, Unreal Editor, Telegram, KNIME / KNIME Analytics Platform, Reactotron, Craft, LiquidText, Media Encoder, Sublime Merge, Vital, Twinmotion, Figma, Adobe Lightroom, Autodesk FBX Review, Defold, KiCad, OpenVSP, anatomyapp, FL Studio, GameMaker, LTspice, Parallels Desktop, UCSF Chimera, and more. The video stopped scrolling there.

The full current list is at `odin-mercor1.vercel.app/validated-apps` (needs your Okta sign-in). Check it once for the apps in `TASK_IDEAS.md`: Brave Browser, VS Code, Postman, pgAdmin 4, MongoDB Compass, Google Sheets, Google Docs, Looker Studio.

## Your Mac: what's ready (checked 31 Oct 2026)

| Needed | Status | What to do |
|---|---|---|
| Accessibility Inspector (must run during every recording) | ❌ Missing | It ships with Xcode. Install Xcode from the App Store, open it once, then **Xcode → Open Developer Tool → Accessibility Inspector**. While recording, close its window with the red button but don't quit it. The dot under its Dock icon must stay. |
| TaskRecorder 2.4.4 | ❌ Not found | Install it from the Project Guide's Technical Setup section. All three permissions green, microphone on, correct display selected. |
| Visual Studio Code | ❌ Not installed | Install it from code.visualstudio.com. Then **Settings → search "disable AI" → tick "Chat: Disable AI Features"** and don't sign in to Copilot. Don't record in Antigravity; it's an AI-first editor. |
| Insightful (time tracking) | ✅ Installed as Workpuls.app | Keep it running while you work. It doesn't count as a task app. |
| Brave, Chrome, Safari, Postman, Docker, MongoDB Compass, pgAdmin 4, Node 24, git | ✅ | You record with Brave; Chrome is the fallback. |
| Menu-bar clock with seconds | Check | System Settings → Control Center → Clock Options → turn on "Display the time with seconds". |
| Dock on the left or right | Check | System Settings → Desktop & Dock → Position on screen. |
| Resolution matches Studio | Check | Use the value shown in your Studio task. |

## Flow for every task

1. **Plan.** Pick an idea from `TASK_IDEAS.md` that you could do at work without help.
2. **Submit the idea.** In Studio → Tasks, make sure the box next to **Create task** says **Odin Production Full Workflow**, then click **Create task**. In section 1, write an answer after each of the five headings in **Describe your idea** (change nothing else) and pick the apps. Click **Submit idea**. The Idea Check runs in about a minute (refresh to see it). Then the review team approves the idea or returns it for edits. If your plan changes a lot later, use **Revise Idea**.
3. **Prepare.** Build the inputs and the working copy (each task's `PLAN.md` has the steps), then rehearse once.
4. **Pre-checks** (list below).
5. **Record:** intro, then the work, then the epilogue.
6. **Stop and archive** in TaskRecorder, and check the files.
7. **Organise the outputs** and write Metadata.rtf (below).
8. **Upload to Studio**, each file in its own field.
9. **Run AutoQC** and fix anything it flags.
10. **Final checks**, then submit.

## Pre-checks before you press Record

- [ ] Accessibility Inspector running (window closed, app not quit).
- [ ] TaskRecorder 2.4.4 open, 3 permissions green, mic on, correct display. **Task Description** = your exact approved Goal. **Used Apps** = your exact Studio app list.
- [ ] Resolution matches Studio. Dock left or right. Clock shows seconds. Default cursor.
- [ ] Mac on power, enough free storage.
- [ ] Focus / Do Not Disturb on. Personal accounts, notifications, recent files and private info hidden.
- [ ] Studio, Slack, these notes and anything showing Mercor or Odin closed or minimised.
- [ ] Unused apps quit (ChatGPT, Claude, Antigravity, Wispr Flow, Raycast, Hubstaff, other dev servers). Unused browser tabs closed. Sync and downloads paused.
- [ ] Every task app launched and signed in, startup dialogs done, files and workspaces open, windows positioned, then minimised. Never launch or set up an app after Start Recording.
- [ ] Input files ready.
- [ ] Opening doc: a Google Doc (or Word/Pages) containing **only the Goal text**, and it's the only window visible behind TaskRecorder. No Approval ID, no other text.

## How the recording runs

1. **Intro (under 20 s).** Leave the Goal doc visible for a few seconds and say: *"I will be beginning my task soon. Here is the workflow I have in mind."* Don't read or explain the Goal. Minimise the Goal doc.
2. **The work.** Before each action, say what you'll click (by name), what you're about to do and why. Keep a comfortable, realistic pace, and show your checks out loud.
3. **Epilogue (3–4 min, 4:00 max).** No mouse needed. Answer some of these in your own words:
   - How did you verify the task was complete? Any limitations?
   - What was your approach, and why that one?
   - What was hardest, unclear or unexpected? Did anything go wrong, and how did you fix it?
   - How good is the result? Any weaknesses?
   - What would you do differently, or add with more time?
   - One principle or common mistake a less experienced person might miss.

## After recording: files and Metadata.rtf

Make a folder called `Deliverables`:

| Type | What | Name |
|---|---|---|
| Inputs | Starting files you prepared before recording | `input 1`, `input 2`, … |
| Intermediate artifacts | Files downloaded or created along the way | `artifact 1`, `artifact 2`, … |
| Final outputs | The finished work product | `final output 1`, `final output 2`, … |

Keep each file's extension (for example `final output 1.zip`). Websites you only read for reference aren't inputs. Zip the folder as `Deliverables.zip`. Keep `Metadata.rtf`, `video.mp4` and the TaskRecorder archive **outside** the zip, because each one goes in its own Studio field.

**Metadata.rtf**: download the template from Studio, fill it in TextEdit, and delete the template's example section before you submit.

- **Topology:** every app visit in order, repeating an app each time you return to it, each tagged LOOKUP, CREATE or MODIFY. For example: `Google Drive (LOOKUP) -> Microsoft Excel (CREATE) -> Microsoft OneDrive (CREATE)`.
- **Request:** your Goal text, exactly as in TaskRecorder.
- **Task Description:** a numbered high-level outline of the steps, naming the apps, key methods and the final deliverable. It must agree with Studio and TaskRecorder.

## Desktop variety log

One row per task, so no two recordings look the same.

| Task | Light/Dark | Wallpaper (built-in, not default) | Dock size | Accent colour | Resolution |
|---|---|---|---|---|---|
| 1 Order Lookup: search race | | | | | |
| 2 Order Lookup: paging | | | | | |
| 3 | | | | | |
| 4 | | | | | |

## Still to confirm

Check the canonical app list (or ask in `#odin--helpdesk`) that **Brave Browser**, VS Code, Postman, pgAdmin 4 and MongoDB Compass aren't restricted. The 22 Oct update named only Safari and Chrome as permitted browsers, so confirm Brave before submitting. If it isn't allowed, use Chrome for the browser steps instead.
