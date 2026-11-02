# Task 2: Newsletter sign-up page, accessibility fixes with Lighthouse

Status (2 Nov 2026): prepared, not submitted in Studio yet. The input is built, and both the problem and the fix are measured with Lighthouse 13.5.0, the same version Brave 1.98.63 bundles in DevTools: 66 before, 100 after. Later that day, `NARRATION.md` was rewritten for AutoQC's narration rule (below), and this run-sheet and `REFERENCE.md` were synced with it.

AutoQC's narration feedback on task 1 (2 Nov 2026) applies to this task too: record it **in one uninterrupted take**; for **every action**, keys included, say what you do, name the element, say where it is on screen (the screen area, toolbar or panel, or the line number in the file) and say why; then check with **Run full AutoQC**, not Rerun failing, so every action is counted. `NARRATION.md` does this line by line, and for each code change it says why the change is needed before the line number where it goes. Every line from B to G starts with a tag: **[WHY]** says what you'll do next and why, before you do it; **[DO]** is the action, with its place and element; **[SEE]** is what's on screen afterwards. The line numbers were checked by replaying the edits on the starter: no line is added or removed, so they never shift.

| | |
|---|---|
| Domain | DSD: Software engineering |
| Role | Front-end developer on the web team that builds the company's marketing and sign-up pages |
| Apps, the same list everywhere | **Visual Studio Code · Brave Browser** |
| Planned length | About 26–27 min at a slow, explaining pace: intro 0:20, work about 23 min, epilogue about 3:20. Naming the place and the reason for every action, and saying what you'll do and why before each action, makes the work narration about 2,230 words, about 20 minutes at 110 words a minute. That's a little over the 20–25 min target and well inside Odin's 15:00–50:59. |
| Typing | About 160 characters in all: the address, two file names, one colour value in DevTools and the same value in VS Code, three short attribute edits (VS Code types the quote marks) and the commit message. About a minute, roughly 4% of the recording; the longest entry (the 50-character commit message) takes about 20 s. |
| Input | `inputs/input 1.zip`: the sign-up page (HTML and CSS served by Vite), a README with the release checklist and ticket `docs/WEB-318.md`. AI-generated, so disclose it. |
| Outputs | `artifact 1.html` (Lighthouse report before the fix), `artifact 2.html` (after the fix), `final output 1.zip` (fixed repo) |

## 1. Describe your idea: text for Studio

Use the **Goal** text exactly as written in three places: the opening Google Doc, TaskRecorder's Task Description and Metadata.rtf's Request.

```text
Domain / Role:
Software engineering. Front-end developer on the web team that builds the company's marketing and sign-up pages.

Goal:
Fix ticket WEB-318: our newsletter sign-up page fails the accessibility release check. Find the problems with a Lighthouse audit in Brave DevTools and fix them until the Accessibility score is 100 and the form works with the keyboard.

Starting materials:
- Newsletter sign-up page: HTML and CSS served by Vite, in a git repo.
- Ticket WEB-318 and a README with the release checklist (Markdown in the repo).
- Both were AI-generated before recording.

Steps (with the apps for each):
1. Visual Studio Code: read the ticket and README; start the page from NPM Scripts.
2. Brave Browser (DevTools): run a Lighthouse accessibility audit, review the failed audits and save the report.
3. Brave Browser (DevTools): check the faint text's contrast ratio in the color picker and try a darker grey from our palette.
4. Visual Studio Code: add the page language, alt text for the logo, a label for the email field and the new text color.
5. Brave Browser: check the label and keyboard focus, re-run Lighthouse to reach 100 and save the report.
6. Visual Studio Code: review the diff and commit.

Deliverable:
Fixed repository (zip) with the commit, plus before/after Lighthouse reports. Check: Accessibility score 100 with no failed audits; clicking the label focuses the email field, and Tab reaches the field and the button.
```

**Apps:** Visual Studio Code and Brave Browser, the same two in Studio's Apps field, TaskRecorder's Used Apps and Metadata.rtf.

## 2. One-time setup (before recording day; nothing here is recorded)

1. **Working copy:** in Terminal, run:
   ```bash
   bash ~/Developer/Odin/task-02-newsletter-a11y/setup-workcopy.sh
   ```
   This unzips the page to `~/Developer/newsletter-signup`, installs Vite and makes a "starting point" commit.
2. **VS Code:** File → Open Folder → `~/Developer/newsletter-signup`. In the Explorer's `…` menu, tick **NPM Scripts**. Close every editor tab. Leave the HTML setting **Auto Create Quotes** on (the default): the narration lets VS Code type the quote marks after `=`.
3. **Brave:** Leo, Rewards and News stay off, as for task 1. Before you rehearse, set up DevTools as in the DevTools pre-check in section 3, so the rehearsal starts the way the take will.
4. **Rehearse on a separate copy:**
   ```bash
   bash ~/Developer/Odin/task-02-newsletter-a11y/setup-workcopy.sh ~/Developer/newsletter-signup-rehearsal
   ```
   Do the whole run-sheet once while timing yourself, saying the lines from `NARRATION.md` and making the four changes yourself. Then delete `~/Developer/newsletter-signup-rehearsal` and the rehearsal's `lighthouse-*.html` files in Downloads.

`REFERENCE.md` has the finished code, the keystrokes for each change and what you should see, and `NARRATION.md` has the lines to say at every step. Rehearse with both, then close them. Don't have them open, or paste from them, while recording.

## 3. On recording day: before you press Record

Do the full pre-check list in `../ODIN_PLAYBOOK.md`, plus:

- [ ] Stop your Examlo frontend dev server. It holds port 5173.
- [ ] Set a desktop appearance different from task 1 (for example, switch light/dark mode) and log it in the playbook's variety table.
- [ ] Downloads has no `lighthouse-*.html` files left from rehearsal.
- [ ] VS Code: `newsletter-signup` open, the Explorer showing, no editor tabs, no terminals, all folders collapsed (the Collapse Folders button at the top of the Explorer), NPM Scripts panel visible, then minimised. The narration clicks `docs` to open it, so it must start closed.
- [ ] Brave DevTools back to defaults **after your rehearsal**, so every click in the narration does what it says: open DevTools, click ⚙ (Settings) at its top right → Preferences → **Restore defaults and reload** at the bottom. That re-ticks all four Lighthouse categories (the narration unticks three), sets Mode and Device back to Navigation and Mobile, and puts the tabs back in their default order. If a What's new drawer opens at the bottom, close it. Then:
  - dock DevTools on the right (⋮ → Dock side → the right-hand icon), because the narration says the page is on the left;
  - open **Lighthouse** from the **»** at the right end of the tab row and drag its tab to just after Elements, because the narration calls it the second tab;
  - click **Elements**, so DevTools opens there, and close DevTools.
- [ ] Brave: one window, one blank tab, Leo hidden, DevTools closed, then minimised.
- [ ] Ready to record in **one uninterrupted take**: TaskRecorder runs from the intro to the end of the epilogue without a pause.
- [ ] Goal doc in Google Docs with only the Goal text, behind TaskRecorder.
- [ ] TaskRecorder: Task Description = Goal (exact); Used Apps = Visual Studio Code, Brave Browser.
- [ ] This file, NARRATION.md, REFERENCE.md and the playbook closed. The cue card (section 5) is on paper or your phone, never on the recorded screen.

## 4. Run-sheet

For each step: **Do** is the action, **Why** is the reasoning to explain, and **See** is what should happen. Narrate **every** action, keys included: what you do, the element's name, where it is on screen (screen area, toolbar or panel, or line number) and why. Times assume a slow pace with detailed explanation. The lines to say at every step, including the epilogue, are in `NARRATION.md`.

Type in short pieces. After each piece, stop typing and point at it with the cursor while you explain it. Odin allows at most 45 s of typing in one go, and at most 25% of the recording (35% for coding tasks).

### A. Intro (0:00–0:20)

- **Do:** Goal doc visible. Say *"I will be beginning my task soon. Here is the workflow I have in mind."* Don't read or explain the Goal.

### B. Read the ticket, start the page (about 0:20–3:40) · VS Code: LOOKUP

1. **Do:** minimise the Goal doc (yellow button, top left of its window) → VS Code in the Dock → Explorer → click `docs` (top of the list) → right-click `WEB-318.md` → **Open Preview**.
   **Why:** the page can't go live until Lighthouse Accessibility is 100, and a VoiceOver user heard the email box as just "edit text", so the box has no name. The three Expected items become your checks at the end.
2. **Do:** right-click `README.md` (last in the file list) → **Open Preview**. Point at the line near the top saying the form isn't connected yet (WEB-322), then at the release checklist at the bottom.
   **Why:** the checklist adds the contrast rule (4.5:1) and says to run Lighthouse with only Accessibility ticked.
3. **Do:** NPM Scripts (bottom of the Explorer) → ▷ at the right end of the `dev` row.
   **See:** the terminal panel opens at the bottom, and Vite prints `Local: http://localhost:5173/`.

### C. Run the audit (about 3:40–8:35) · Brave Browser: LOOKUP

1. **Do:** Brave in the Dock → click the address bar → type `localhost:5173` → Return. Point at the faint grey line under the email box and the grey footer under the card. Click the words **Email address** above the box: the cursor doesn't go into the box.
   **Why:** clicking a real label puts the cursor in its field, so this caption isn't connected to the box.
2. **Do:** menu bar → View → Developer → **Developer Tools** (opens on the right) → **Lighthouse**, the second tab. Leave Mode on Navigation and Device on Mobile. Under Categories, untick Performance, Best practices and SEO, so only **Accessibility** is ticked. Click the blue **Analyze page load** near the top of the panel.
   **See:** after about 10–15 s, an orange **66** at the top of the report and four failed audits in three groups:
   - *Names and labels:* "Image elements do not have `[alt]` attributes" and "Form elements do not have associated labels".
   - *Contrast:* "Background and foreground colors do not have a sufficient contrast ratio", for two elements.
   - *Internationalization and localization:* "`<html>` element does not have a `[lang]` attribute".
3. **Do:** click each failed audit to open it. Point at the element it lists, so it lights up in the page, and say in one line who the problem affects.
   **Why:** screen readers can't read text inside an image, can't name an unlabelled field, and use `lang` to pick the voice and pronunciation; faint text is hard to read for people with low vision or on a bright screen.
4. **Do:** the report's **⋮** menu (top right of the report) → **Save as HTML** → in the save dialog, type `lighthouse-before`, check that Where says Downloads → **Save** (bottom right). It becomes `artifact 1.html`.

### D. Check the contrast in DevTools (about 8:35–11:35) · Brave Browser: LOOKUP

1. **Do:** in the page, right-click the grey "One email a month. Unsubscribe any time." line under the email box → **Inspect**.
   **See:** the Elements panel selects `<p class="muted">`, and in the Styles pane under the HTML, `.muted` has `color: #9ca3af`.
2. **Do:** click the small colour square just left of `#9ca3af`.
   **See:** in the lower half of the picker, Contrast ratio about 2.5 with a warning sign. Click the arrow at the right end of that row: AA needs 4.5 for text this size. Press **Escape** to close the picker.
   **Why:** don't click the picker's suggested colour: it lands right on 4.5 and can round to just under it.
3. **Do:** double-click the value `#9ca3af` → **Command A** → type `#6b7280` → **Return**. Click the colour square again.
   **See:** both grey texts get darker, and the ratio is about 4.8 with a check mark for AA. Press **Escape** to close the picker.
   **Why:** `#6b7280` is the grey the email box's border already uses, so the page stays in its palette and passes with some margin. DevTools changes disappear on reload, so the real fix goes in the CSS file next. Command A matters: a double-click may select only `9ca3af`, and typing `#6b7280` over that gives `##6b7280`.

### E. Fix the code (about 11:35–18:00) · VS Code: MODIFY

Four changes: three in `index.html` and one in `src/styles.css`. Nothing is added or removed, so no line moves while you edit: the changes stay on lines 2, 11, 25 and 87 (`REFERENCE.md` has every keystroke). Type one piece, stop, point at it, say why. You don't need to talk while you type.

1. **Do:** VS Code in the Dock → Explorer → `index.html` (just under `.gitignore`). Point out that three of the problems are on lines 2, 11 and 25.
2. **Do**, one change at a time, in this order. For each, first say why it's needed, then the line number, then click and type, then point at it and say what it does. In `index.html`, when you type `=` after an attribute name and pause, VS Code adds `""` and puts the cursor between the quotes: type only the value, never the quotes.

   | # | 1. Say why | 2. Say the line number, then click | 3. Type |
   |---|---|---|---|
   | 1 | Screen readers pick the voice and pronunciation from `lang`. | Line 2, `<html>`: double-click `html` → press → | ` lang=`, pause for the quotes, then `en` |
   | 2 | The logo shows the newsletter's name as a picture, which screen readers can't read. | Line 11, the logo: double-click `img` → press → | ` alt=`, pause, then `The Build Notes` |
   | 3 | The caption is a plain `div`, so nothing connects it to the box; that's why VoiceOver said "edit text". | Line 25: double-click the first `div` | `label` |
   | | `for` must match the input's `id="email"` on line 27. | Line 25: the cursor is already just after `label` | ` for=`, pause, then `email` |
   | | The closing tag must match. | Line 25: double-click the closing `div` near the end of the line | `label` |
   | 4 | `#9ca3af` is about 2.5:1 and AA needs 4.5. `#6b7280` is the email box border's grey (line 66), about 4.8. | Explorer → `src` → `styles.css`, scroll down to `.muted` (line 85). Line 87: double-click `9ca3af` (the `#` stays) | `6b7280` |

   After change 3, point at lines 25 and 27: `for="email"` matches `id="email"`. The `.field-label` style already sets `display: block`, so the label looks exactly like the `div` did. After change 4, point at line 66, where the border uses the same grey. Both grey texts use `.muted`, so one line fixes both.
3. **Do:** menu bar → File → **Save All**.
   **See:** the dots on the `index.html` and `styles.css` tabs disappear.

### F. Verify (about 18:00–21:25) · Brave Browser: LOOKUP

1. **Do:** Brave in the Dock → reload button (⟳, just left of the address bar).
   **Why:** the page loads the saved files, and the colour you tried in DevTools is gone, so what you test next comes from the code.
2. **Do:** click the words **Email address**: the cursor jumps into the box with a focus ring. Click the heading, then press Tab: a focus ring on the email box. Press Tab again: the ring moves to **Subscribe**. (Click the heading, not the empty space below the card: Tab starts from where you last clicked.)
   **Why:** that's the ticket's keyboard check, and the label click shows the field now has a name.
3. **Do:** **Lighthouse** tab → **+** (New report, left end of the Lighthouse toolbar) → **Analyze page load**. Only Accessibility is still ticked.
   **See:** a green **100** and no failed audits. Point at **Additional items to manually check** under the score: Lighthouse says automated checks can't catch everything, which is why you did the label and keyboard checks by hand.
4. **Do:** ⋮ → **Save as HTML** → `lighthouse-after` → **Save**. It becomes `artifact 2.html`.

### G. Review and commit (about 21:25–23:40) · VS Code: CREATE

1. **Do:** VS Code in the Dock → Source Control (Activity Bar, third icon) → click `index.html` and say its three changed lines (2, 11, 25), then `styles.css` and its one line (87).
   **See:** two changed files, four green lines in all. Nothing else changed, so the page keeps its look.
2. **Do:** ＋ at the right end of the Changes header (Stage All Changes) → click the message box → type "Fix accessibility issues on sign-up page (WEB-318)" → **Commit**.
   **See:** the Changes list is empty. If VS Code then offers **Publish Branch**, don't click it: this copy has no remote.
3. **Stop here.** Don't keep tinkering.

### H. Epilogue (about 23:40–27:00, no mouse)

Say the lines in `NARRATION.md`, changed to match what actually happened in *your* recording. They cover:

- **Verification:** Lighthouse went from 66 to 100; clicking the label now focuses the field; Tab reaches the field and the button; before and after reports saved.
- **Key decisions:** a real `<label>` instead of a hidden `aria-label`; alt text that says what the logo says; reusing the palette grey with some margin instead of the picker's borderline suggestion.
- **Limitations and next steps:** Lighthouse checks only part of WCAG; a VoiceOver pass and checking the Subscribe flow once it's connected (WEB-322) would come next. An automated accessibility check in the build would stop this from coming back.
- **Common mistake to name:** text that looks like a label but isn't connected to its field, and colours that pass by a hair, which rounding or a different background can push under.

## 5. Cue card (paper or phone, never on the recorded screen)

```
EACH STEP: WHY (what next + why) → DO (where · element · action) → SEE (result).   ONE TAKE, no pauses.
A  Goal doc → "I will be beginning my task soon. Here is the workflow I have in mind."
B  minimise Goal doc (yellow, top left) → VS Code (Dock, left) → Explorer: docs (top) → WEB-318 Open Preview
   (can't go live · VoiceOver "edit text" = no name · 3 expectations) → README (last in list) Open Preview
   → form not connected (WEB-322) · checklist: contrast 4.5, only Accessibility → NPM Scripts (bottom): ▷ dev
C  Brave (Dock) → address bar: localhost:5173 ⏎ → point: grey line under box, grey footer
   → click "Email address": nothing → menu bar View → Developer → Developer Tools (opens on the right)
   → Lighthouse (2nd tab) → Navigation, Mobile → untick Performance, Best practices, SEO → Analyze page load
   → orange 66, 4 failed: alt (logo) · label (box) · contrast (grey line, footer) · lang (html): open, point, who
   → ⋮ (top right of report) → Save as HTML → lighthouse-before, Downloads → Save
D  page: right-click grey line → Inspect → Styles (under HTML): .muted #9ca3af → square: Contrast 2.5 ⚠
   → arrow (right end of row): AA 4.5 → suggestion borderline → Esc
   → double-click value → ⌘A → #6b7280 ⏎ → both darker → square: 4.8 ✓ → Esc → DevTools = temporary
E  VS Code (Dock) → Explorer: index.html (under .gitignore) → problems on 2, 11, 25
   Each change: WHY → LINE NUMBER → DO click + type → SEE explain.   VS Code types the quotes: type only the value.
   1  lang: voice, pronunciation   line 2: double-click html → right arrow    " lang=" pause → en
   2  logo: name in a picture      line 11: double-click img → right arrow    " alt=" pause → The Build Notes
   3  caption is a plain div       line 25: double-click 1st div → label · " for=" pause → email (id on 27)
                                   · double-click closing div → label   (display: block, same look)
   4  2.5, needs 4.5               src › styles.css, scroll to .muted (85) · 87: double-click 9ca3af → 6b7280
                                   (border on 66 uses it · both greys use .muted)
   → menu bar File → Save All (tab dots go)
F  Brave (Dock) → ⟳ (left of address bar) → click "Email address": cursor + ring in box
   → click heading → Tab: email box → Tab: Subscribe → Lighthouse tab → ＋ (left of toolbar) → Analyze
   → green 100, 0 failed → point: Additional items to manually check → ⋮ Save as HTML: lighthouse-after
G  VS Code (Dock) → Source Control (Activity Bar, 3rd icon) → index.html diff: 2, 11, 25 → styles.css: 87
   → ＋ on Changes header → message box: "Fix accessibility issues on sign-up page (WEB-318)" → Commit → STOP
H  Epilogue 3–4 min: outcome · verified · decisions · challenges · limits · lesson
```

## 6. If something goes wrong while recording

- **Lighthouse isn't the second tab, or only Accessibility is already ticked:** DevTools wasn't reset (section 3). Say so, open Lighthouse from the **»** at the right end of the tab row, leave the ticks as they are and carry on.
- **Lighthouse shows an error:** click Brave's lion icon, turn Shields off for `localhost`, reload and analyse again.
- **Not 100 after the fix:** open the failed audit. It's usually a typo (`for="emial"`), doubled quote marks or a file that wasn't saved. Fix it, save and analyse again.
- **Doubled quote marks, like `lang=""en""`:** you typed the quotes after VS Code had added them. Press Command Z until the line is back as it was, then type it again, pausing after the equals sign. Say what you're fixing.
- **No quote marks appear after the equals sign:** you typed on too quickly. Type the quotes yourself (`"en"`): VS Code closes the pair, and the closing quote you type steps over it.
- **`##6b7280`, or the value is struck through in the Styles pane:** the whole value wasn't selected. Double-click the value again, press Command A, type `#6b7280` and press Return.
- **Escape doesn't close the picker, or opens the console drawer at the bottom:** click an empty part of the Styles pane to close the picker, press Escape again to hide the drawer, and say what you did.
- **The Styles pane is to the right of the HTML, not under it:** DevTools is wider than about 680 pixels. Say "to the right of the HTML" instead.
- **The picker shows 2.54 instead of 2.53:** rounding. Either is fine; the narration says "about 2.5".
- **Port 5173 is busy:** use whatever URL Vite prints and say why it changed.
- **A mistake on camera:** fix it and explain what happened. Don't restart for small slips.

## 7. After recording

1. If task 1's `~/Developer/Deliverables` folder and `Deliverables.zip` are still there, rename them to `Deliverables-task-1` first (or delete them once task 1 is accepted).
2. Make `~/Developer/Deliverables` with:
   - `input 1.zip`: copy of `inputs/input 1.zip`
   - `artifact 1.html`: `lighthouse-before.html`, renamed
   - `artifact 2.html`: `lighthouse-after.html`, renamed
   - `final output 1.zip`: the fixed repo without `node_modules`. In Terminal:
     ```bash
     cd ~/Developer && zip -r "Deliverables/final output 1.zip" newsletter-signup -x "newsletter-signup/node_modules/*"
     ```
3. Zip the folder as `Deliverables.zip`. Keep `Metadata.rtf`, `video.mp4` and the TaskRecorder archive separate.
4. **Metadata.rtf**, in TextEdit from the Studio template:
   - **Topology:** match what you actually did. If you follow the run-sheet it is:
     `Visual Studio Code (LOOKUP) -> Brave Browser (LOOKUP) -> Visual Studio Code (MODIFY) -> Brave Browser (LOOKUP) -> Visual Studio Code (CREATE)`
   - **Request:** your Goal, exactly as in TaskRecorder.
   - **Task Description:** a numbered outline built from the 6 Steps in your idea, adjusted to what you actually did.
5. **AI disclosure:** wherever Studio asks, state that `input 1` (the starter page, README and ticket) was AI-generated before recording, and that no AI was used during the recording.
6. Upload, then click **Run full AutoQC**, not Rerun failing, so every action in the recording is counted. Fix anything it flags, do the final checks and submit. Delete `~/Developer/newsletter-signup` once the task is accepted.
