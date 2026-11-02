# Task 2: Newsletter sign-up page, accessibility fixes with Lighthouse

Status (2 Nov 2026): prepared, not submitted in Studio yet. The input is built, and both the problem and the fix are measured with Lighthouse 13.5.0, the same version Brave 1.98.63 bundles in DevTools: 66 before, 100 after.

| | |
|---|---|
| Domain | DSD: Software engineering |
| Role | Front-end developer on the web team that builds the company's marketing and sign-up pages |
| Apps, the same list everywhere | **Visual Studio Code · Brave Browser** |
| Planned length | About 21–23 min: intro 0:20, work about 17:30, epilogue about 3:30 |
| Typing | About 170 characters in all: the address, two file names, one colour value typed twice, three short attribute edits and the commit message. Roughly 5% of the recording; the longest entry (the commit message) takes about 20 s. |
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
2. **VS Code:** File → Open Folder → `~/Developer/newsletter-signup`. In the Explorer's `…` menu, tick **NPM Scripts**. Close every editor tab.
3. **Brave DevTools:** open DevTools once on any page. If **Lighthouse** isn't in the tab bar, open it from the **»** menu and drag its tab next to Elements, so you don't have to hunt for it on camera. Dock DevTools to the right (DevTools ⋮ → Dock side), so the page and the report sit side by side. Leo, Rewards and News stay off, as for task 1.
4. **Rehearse on a separate copy:**
   ```bash
   bash ~/Developer/Odin/task-02-newsletter-a11y/setup-workcopy.sh ~/Developer/newsletter-signup-rehearsal
   ```
   Do the whole run-sheet once while timing yourself, then delete `~/Developer/newsletter-signup-rehearsal` and the rehearsal's `lighthouse-*.html` files in Downloads.

`REFERENCE.md` has the finished code and what you should see, and `NARRATION.md` has two or three lines to say at each step. Rehearse with both, then close them.

## 3. On recording day: before you press Record

Do the full pre-check list in `../ODIN_PLAYBOOK.md`, plus:

- [ ] Stop your Examlo frontend dev server. It holds port 5173.
- [ ] Set a desktop appearance different from task 1 (for example, switch light/dark mode) and log it in the playbook's variety table.
- [ ] Downloads has no `lighthouse-*.html` files left from rehearsal.
- [ ] VS Code: `newsletter-signup` open, no editor tabs, NPM Scripts panel visible, then minimised.
- [ ] Brave: one window, one blank tab, DevTools closed, then minimised.
- [ ] Goal doc in Google Docs with only the Goal text, behind TaskRecorder.
- [ ] TaskRecorder: Task Description = Goal (exact); Used Apps = Visual Studio Code, Brave Browser.
- [ ] This file, NARRATION.md, REFERENCE.md and the playbook closed. The cue card (section 5) is on paper or your phone.

## 4. Run-sheet

**Do** is the action, **Why** is the reasoning to say, and **See** is what should happen. Say what you click, where it is and why.

### A. Intro (0:00–0:20)

- **Do:** Goal doc visible. Say *"I will be beginning my task soon. Here is the workflow I have in mind."* Minimise the Goal doc.

### B. Read the ticket, start the page (about 0:20–2:20) · VS Code: LOOKUP

1. **Do:** Explorer → `docs` → right-click `WEB-318.md` → **Open Preview**.
   **Why:** the page can't go live until Lighthouse Accessibility is 100, and a VoiceOver user couldn't tell what to type in the email box. The Expected list becomes your checks at the end.
2. **Do:** right-click `README.md` → **Open Preview** and point at the three-item release checklist.
3. **Do:** NPM Scripts panel → ▷ next to `dev`.
   **See:** Vite prints `Local: http://localhost:5173/`.

### C. Run the audit (about 2:20–6:20) · Brave Browser: LOOKUP

1. **Do:** open Brave, type `localhost:5173` in the address bar. Point at the faint grey line under the button and the grey footer. Click the words **Email address**: the cursor doesn't go into the box.
   **Why:** a real label puts the cursor in its field when you click it, so this caption isn't connected to the box.
2. **Do:** View → Developer → **Developer Tools** → **Lighthouse** tab. Leave Mode on Navigation and Device on Mobile. Under Categories, untick everything except **Accessibility**. Click **Analyze page load**.
   **See:** after about 10–15 s, an orange **66** and four failed audits in three groups:
   - *Names and labels:* "Image elements do not have `[alt]` attributes" and "Form elements do not have associated labels".
   - *Contrast:* "Background and foreground colors do not have a sufficient contrast ratio", for two elements.
   - *Internationalization and localization:* "`<html>` element does not have a `[lang]` attribute".
3. **Do:** click each failed audit to open it. Hover the element it lists to highlight it on the page, and say in one line who the problem affects.
   **Why:** screen readers can't read text inside an image, can't name an unlabelled field, and use `lang` to pick the voice and pronunciation; faint text is hard to read for people with low vision or on a bright screen.
4. **Do:** the report's **⋮** menu (top right of the report) → **Save as HTML** → Downloads → name it `lighthouse-before`. It becomes `artifact 1.html`.

### D. Check the contrast in DevTools (about 6:20–8:50) · Brave Browser: LOOKUP

1. **Do:** right-click the grey "One email a month…" text on the page → **Inspect**.
   **See:** the Elements panel selects `<p class="muted">`, and the Styles pane shows `.muted` with `color: #9ca3af`.
2. **Do:** click the small colour square next to `#9ca3af`.
   **See:** the colour picker shows a contrast ratio of about 2.5 with a warning. Open that row: AA needs 4.5 for text this size.
3. **Do:** close the picker. Double-click `#9ca3af`, type `#6b7280`, press Enter. Click the colour square again.
   **See:** both grey texts get darker, and the ratio is about 4.8 with a check for AA.
   **Why:** `#6b7280` is the grey the email field's border already uses, so the page stays in its palette and passes with some margin. Don't click the picker's suggested colour: it lands right on 4.5 and can round to just under it. DevTools changes disappear on reload, so the real fix goes in the CSS file next.

### E. Fix the code (about 8:50–12:50) · VS Code: MODIFY

1. **Do:** open `index.html`.
   - Line 2: `<html>` → `<html lang="en">`.
   - Line 11, the logo: add `alt="The Build Notes"`.
     **Why:** the logo shows the newsletter's name as a picture. A purely decorative image would get an empty `alt=""` instead, so screen readers skip it.
   - Line 25: change `<div class="field-label">Email address</div>` to `<label for="email" class="field-label">Email address</label>`. Point at line 27: `for="email"` matches the input's `id="email"`.
     **Why:** the caption looked like a label but was a plain `div`, so nothing connected it to the box. That's why VoiceOver read the box as just "edit text". The `.field-label` style already has `display: block`, so the page looks the same.
2. **Do:** open `src/styles.css`. Line 87, in `.muted`: `#9ca3af` → `#6b7280`. Point at line 66, where the input border uses the same grey.
3. **Do:** File → **Save All**.

### F. Verify (about 12:50–16:20) · Brave Browser: LOOKUP

1. **Do:** back in Brave, the page has reloaded by itself. Click the words **Email address**: the cursor jumps into the box. Click the heading, then press Tab: a focus ring on the email field. Press Tab again: the ring moves to **Subscribe**. (Click the heading, not the empty space below the card: Tab starts from where you last clicked.)
   **Why:** that's the ticket's keyboard check, and the label click shows the field now has a name.
2. **Do:** Lighthouse tab → **+** (new report, top left of the panel) → **Analyze page load**.
   **See:** a green **100** and no failed audits. Point at **Additional items to manually check**: Lighthouse says automated checks can't catch everything, which is why you did the keyboard check by hand.
3. **Do:** ⋮ → **Save as HTML** → Downloads → `lighthouse-after`. It becomes `artifact 2.html`.

### G. Review and commit (about 16:20–17:50) · VS Code: CREATE

1. **Do:** Source Control view → click `index.html` (three changed lines), then `styles.css` (one line), and say what each change does.
2. **Do:** stage both (＋ next to Changes), type "Fix accessibility issues on sign-up page (WEB-318)", then **Commit**. If VS Code offers **Publish Branch**, don't click it.
3. **Stop here.** Don't keep tinkering.

### H. Epilogue (about 17:50–21:20, no mouse)

Talk from what actually happened in *your* recording:

- **Verification:** Lighthouse went from 66 to 100; clicking the label now focuses the field; Tab reaches the field and the button; before and after reports saved.
- **Key decisions:** a real `<label>` instead of a placeholder; alt text that says what the logo says; reusing the palette grey with some margin instead of the picker's borderline suggestion.
- **Limitations and next steps:** Lighthouse checks only part of WCAG; a VoiceOver pass and checking the Subscribe flow once it's connected (WEB-322) would come next. An automated accessibility check in CI would stop this from coming back.
- **Common mistake to name:** text that looks like a label but isn't connected to its field (or a placeholder used as the only label), and colours that pass by a hair, which rounding or a different background can push under.

## 5. Cue card (paper or phone, never on the recorded screen)

```
A  Goal doc → "I will be beginning my task soon. Here is the workflow I have in mind." → minimise
B  Preview WEB-318 (score 100, VoiceOver "edit text") → README checklist (3) → NPM Scripts ▷ dev
C  Brave localhost:5173 → faint text → click "Email address": nothing
   → DevTools → Lighthouse → Accessibility only → Analyze → 66, 4 failed
   → open each: who it affects → ⋮ Save as HTML: lighthouse-before
D  right-click grey text → Inspect → .muted #9ca3af → swatch: 2.5, AA 4.5
   → type #6b7280 → 4.8 ✓ (input border's grey; skip the suggestion) → temporary
E  index.html: lang="en" (2) · alt="The Build Notes" (11) · div → label for="email" (25)
   → styles.css .muted #6b7280 (87) → Save All
F  click label → cursor in box · click heading, Tab, Tab → Lighthouse + → Analyze → 100 → Save: lighthouse-after
G  Source Control: 2 diffs → ＋ → "Fix accessibility issues on sign-up page (WEB-318)" → Commit → STOP
H  Epilogue 3–4 min: verify · decisions · limits · common mistake
```

## 6. If something goes wrong while recording

- **No Lighthouse tab:** open it from DevTools' **»** menu.
- **Lighthouse shows an error:** click Brave's lion icon, turn Shields off for `localhost`, reload and analyse again.
- **Not 100 after the fix:** open the failed audit. It's usually a typo (`for="emial"`) or a file that wasn't saved. Fix it, save and analyse again.
- **Port 5173 is busy:** use whatever URL Vite prints and say why it changed.
- **The picker shows 2.54 instead of 2.53:** rounding. Either is fine.
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
6. Upload, run AutoQC, final checks, submit. Delete `~/Developer/newsletter-signup` once the task is accepted.
