# Task 2 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`). Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only text that isn't spoken is the two sections before the intro, the intro instruction and one note at the start of the epilogue.

## How to talk while recording

AutoQC's feedback on task 1's narration asks for three things, and they apply to this task too:

- **For every action, say what you do, name the element, say where it is on screen, and say why.** "Where" is the screen area, the toolbar or panel, or the line number in the file. For example: *"In the Explorer on the left, I'm right-clicking `WEB-318.md` and choosing Open Preview, so I can read the ticket formatted."* Every line below is written this way.
- **Record the task in one uninterrupted take,** from the intro to the end of the epilogue. Don't pause or stop TaskRecorder in between. If something goes wrong, say what happened and keep going.
- **To check the recording, click Run full AutoQC, not Rerun failing,** so all its actions are counted.

Also:

- **Keys are actions too.** Say Return, Tab, Escape, the right arrow and Command A as you press them, and why.
- **While editing code,** say each of the four changes in the same order: why it's needed, then the line number where it goes, then click there and type it, then stop and point at it while you say what it does. You don't need to talk while you type.
- **Let VS Code type the quote marks.** In `index.html`, when you type an equals sign after an attribute name and pause, VS Code adds `""` and puts the cursor between them. Type only the value. If you type the quotes yourself, you get two pairs.
- **After each result,** say what you see, where it is, and what it means.
- **Type in short pieces.** Type one piece, stop, then point at it with the cursor while you explain it. Odin allows at most 45 seconds of typing in one go, and nothing in this task needs more than about 20.
- Slow and clear is better than fast. Short pauses before important clicks are fine.
- If something unexpected happens, say what you see and what you'll try next. That's valuable, not a mistake.
- Read out the names, numbers and messages you *actually* see. The ones below come from preparation and may differ slightly.

## Where things are on screen

| App | Element | Where it is |
|---|---|---|
| macOS | Dock | the left edge of the screen |
| | Menu bar (View → Developer, File → Save All) | the top edge of the screen |
| | Save dialog | drops down from the top of the Brave window: the file name at the top, Where under it, Save at the bottom right |
| VS Code | Activity Bar | the strip of icons on the far left: Explorer is the first icon, Source Control the third |
| | Explorer | the sidebar on the left: the folders `docs`, `node_modules`, `public` and `src` at the top, then the files, with `index.html` just under `.gitignore` and `README.md` last; the NPM Scripts section at its bottom |
| | Editor | the middle of the window, with line numbers down its left edge and the open files as tabs along its top |
| | Terminal panel | the bottom of the window |
| | Source Control view | in the sidebar on the left: the message box and the blue Commit button at the top, then the Changes list |
| Brave | Address bar and reload button | the toolbar at the top; reload is the circular arrow just left of the address bar |
| | The page | the left part of the window once DevTools is open: one card, with the grey line under the email box and the grey footer under the card |
| | DevTools | the right side of the window |
| DevTools | Tab row (Elements, Lighthouse) | the top of DevTools; Lighthouse is the second tab, after Elements |
| | Lighthouse panel | a toolbar at the top, with the plus button (New report) at its left end; under it Mode, Device, Categories and the blue Analyze page load button |
| | Lighthouse report | the score at the top, the three-dot menu at its top right, then the failed audits under their group headings |
| | Elements panel | the page's HTML at the top, the Styles pane under it |
| | Colour square and picker | the small square just left of a colour value in the Styles pane; the picker opens beside it, with the Contrast ratio row in its lower half and an arrow at that row's right end |

## A. Intro (under 20 seconds)

With the Goal doc on screen for a few seconds, say only this:

- "I will be beginning my task soon. Here is the workflow I have in mind."

Don't read or explain the Goal. The first line of B minimises it.

## B. Read the ticket and start the page (VS Code)

**Open the project**
- I'm clicking the yellow minimise button at the top left of the Goal doc's window, to clear the screen for the work.
- I'm clicking VS Code in the Dock on the left, to open the sign-up page for our team's newsletter, The Build Notes. It's plain HTML and CSS, served by Vite.

**Read the ticket**
- Ticket WEB-318 is about this page, so I'll read it first. In the Explorer on the left, I'm clicking the docs folder, at the top, to open it.
- I'm right-clicking `WEB-318.md`, just under docs, and choosing Open Preview, so the ticket opens formatted in the editor.
- The page fails our accessibility release check, so it can't go live on Friday. A VoiceOver user also said the email box is read out as just "edit text". So the box has no name.
- The ticket expects a Lighthouse Accessibility score of 100 with no failed audits, a label that screen readers read out for the email box, a form that works with the keyboard, and the same look, apart from colour fixes. Those are my checks at the end.

**Read the README**
- Next, I'm right-clicking `README.md`, at the bottom of the file list in the Explorer, and choosing Open Preview, to read the release checklist.
- Near the top, it says the form isn't connected yet. That's ticket WEB-322, so Subscribe doesn't send anything.
- I'm pointing at the release checklist at the bottom of the preview. It adds one more check: text contrast of at least 4.5 to 1. And Lighthouse runs with only Accessibility ticked.

**Start the page**
- In the NPM Scripts section at the bottom of the Explorer, I'm clicking the play button at the right end of the `dev` row, to start Vite without typing commands. In the terminal panel that opens at the bottom, Vite prints the address: localhost, port 5173.

## C. Run the audit (Brave)

**Look at the page**
- I'm clicking Brave, the lion icon in the Dock on the left, to look at the page.
- I'm clicking the address bar at the top of the Brave window, typing localhost:5173 and pressing Return, to open the page Vite is serving.
- It's one sign-up card. I'm pointing at the grey line under the email box, and at the grey footer under the card. Both are faint and hard to read.
- Now I'm clicking the words "Email address", just above the box, to see if they're a real label. Nothing happens. Clicking a real label puts the cursor in its box, so this caption isn't connected.

**Run Lighthouse**
- In the menu bar at the top of the screen, I'm clicking View, then Developer, then Developer Tools, because Lighthouse is part of DevTools. DevTools opens on the right.
- In the tab row at the top of DevTools, I'm clicking Lighthouse, the second tab, to open the audit.
- I'm leaving Mode on Navigation and Device on Mobile, the defaults. Under Categories, I'm unticking Performance, Best practices and SEO, so only Accessibility is ticked, as the README asks.
- I'm clicking the blue Analyze page load button near the top of the panel, to start the audit. Lighthouse reloads the page and checks it, in about fifteen seconds.

**Read the failed audits**
- At the top of the report, the Accessibility score is an orange 66. Below it, four audits failed, in three groups.
- Under Names and labels, I'm clicking the first one, "Image elements do not have alt attributes", to open it. I'm pointing at the element it lists, and the logo lights up in the page. Screen readers can't read the name inside this picture.
- I'm clicking the next one, "Form elements do not have associated labels", to open it, and pointing at its element: the email box lights up. That's the VoiceOver problem from the ticket.
- Under Contrast, I'm clicking "Background and foreground colors do not have a sufficient contrast ratio". It lists the grey line and the footer, which are hard to read with low vision or on a bright screen.
- Under Internationalization and localization, I'm clicking the last one: the html element has no lang attribute. Screen readers use lang to pick the right voice and pronunciation.

**Save the report**
- To keep this report as evidence, I'm clicking the three-dot menu at the top right of the report and choosing Save as HTML.
- In the save dialog, I'm typing lighthouse-before as the file name, checking that it's going to Downloads, and clicking Save at the bottom right.

## D. Check the contrast (Brave DevTools)

- Before I change the code, I want to see the contrast numbers myself. In the page on the left, I'm right-clicking the grey line under the email box and choosing Inspect, to find its colour.
- DevTools switches to the Elements panel and selects that paragraph. In the Styles pane, under the HTML, the `.muted` rule sets its colour to `#9ca3af`, a light grey.
- I'm clicking the small grey square just left of `#9ca3af`, to open the colour picker, because it shows the contrast ratio.
- In the lower half of the picker, the Contrast ratio row says about 2.5, with a warning sign. I'm clicking the arrow at the right end of that row, to see the targets. AA needs 4.5 for text this size, so this grey fails.
- The picker also offers a colour that just reaches 4.5, but one right on the limit can round to just under it. I'm pressing Escape to close the picker.
- Instead, I'll try the darker grey our email box's border uses, `#6b7280`. I'm double-clicking the value `#9ca3af` in the `.muted` rule and pressing Command A, so the whole value is selected, hash sign included.
- In that box, I'm typing `#6b7280` and pressing Return, to apply it. Both grey texts in the page turn darker, because they share the `.muted` class.
- I'm clicking the colour square next to the new value, to check the ratio again. It's now about 4.8, with a check mark for AA, so it passes with some margin.
- I'm pressing Escape to close the picker. DevTools changes are lost when the page reloads, so next I'll make the real fix in the code.

## E. Fix the code (VS Code)

**Open the HTML**
- I'm clicking VS Code in the Dock on the left, to make the real fix in the code.
- In the Explorer on the left, I'm clicking `index.html`, just under `.gitignore`, to open the page's HTML.
- Three of the problems are in this file, on lines 2, 11 and 25. I'll fix them one at a time, then the colour in the CSS.

**Change 1 of 4: the page language (line 2)**
- Screen readers use the lang attribute to pick the voice and pronunciation, and this page doesn't say it's in English.
- It goes on the html element, on line 2. I'm double-clicking the word html on line 2 and pressing the right arrow key, so the cursor sits just after it.
- I'm typing a space, lang and an equals sign, and pausing. VS Code adds the two quote marks and puts the cursor between them, so I'm typing just "en".
- Line 2 now has `lang="en"`: the page is in English.

**Change 2 of 4: the logo's alt text (line 11)**
- The logo shows the newsletter's name as a picture, so it needs alt text that says the name. A purely decorative image would get an empty alt instead.
- The logo is the img element on line 11. I'm double-clicking img on line 11 and pressing the right arrow key, so the cursor sits just after it.
- I'm typing a space, alt and an equals sign, pausing for the quote marks, and typing "The Build Notes" between them.
- Now screen readers read the logo as "The Build Notes".

**Change 3 of 4: a real label (line 25)**
- Now the main problem from the ticket. The "Email address" caption looks like a label, but it's a plain div, so nothing connects it to the box. That's why VoiceOver said just "edit text".
- The caption is on line 25, and its box is the input on line 27, with the id "email". I'm double-clicking the first div on line 25 and typing label, to make the caption a real label.
- Right after the word label, I'm typing a space, for and an equals sign, and "email" between the quote marks. The for attribute must match the box's id on line 27.
- The closing tag at the end of line 25 still says div. I'm double-clicking that div and typing label, so the closing tag matches.
- Now screen readers read "Email address" for the box. The field-label style already makes the label a block, so the page looks the same.

**Change 4 of 4: the grey text (styles.css, line 87)**
- Last, the faint grey, which measured 2.5 when it needs 4.5. In the Explorer, I'm clicking the src folder and then `styles.css` inside it, to open the stylesheet.
- The grey comes from the `.muted` rule, which starts on line 85, so I'm scrolling down the editor to it. The colour is on line 87.
- I'm double-clicking `9ca3af` on line 87, which selects the six characters after the hash sign, and typing 6b7280, the grey I tested in DevTools.
- I'm pointing at line 66, a little higher up: the email box's border already uses this grey, so the page stays in its palette. Both grey texts use `.muted`, so this one line fixes both.

**Save**
- In the menu bar at the top of the screen, I'm clicking File, then Save All, to save both files. The dots on the `index.html` and `styles.css` tabs at the top of the editor disappear, so they're saved.

## F. Verify the fix (Brave)

**Reload**
- I'm clicking Brave in the Dock on the left, to check the fix.
- I'm clicking the reload button, the circular arrow just left of the address bar, so the page loads my saved files, without the colour I tried in DevTools.

**Label and keyboard**
- In the page on the left, I'm clicking the words "Email address" again, to test the label. Now the cursor jumps into the box and a focus ring appears, so the label is connected.
- Next, the keyboard check from the README. I'm clicking the heading, "Get The Build Notes in your inbox", so the keyboard starts from there, and pressing Tab. The focus ring moves to the email box.
- I'm pressing Tab again, and the ring moves to the Subscribe button. So keyboard users can reach the field and the button.

**Run Lighthouse again**
- In the tab row at the top of DevTools, I'm clicking Lighthouse, to audit the fixed page.
- I'm clicking the plus button at the left end of the Lighthouse toolbar, at the top of the panel, to start a new report. Only Accessibility is still ticked, so I'm clicking Analyze page load.
- The score is now a green 100, with no failed audits.
- I'm pointing at "Additional items to manually check", just under the score. Lighthouse can't check everything automatically, which is why I tested the label and the keyboard myself.

**Save the report**
- I'm clicking the three-dot menu at the top right of the report and choosing Save as HTML. In the save dialog, I'm typing lighthouse-after and clicking Save at the bottom right. Now I have reports from before and after the fix.

## G. Review and commit (VS Code)

**Review the diff**
- I'm clicking VS Code in the Dock on the left, to review my changes before I commit them.
- In the Activity Bar on the far left of VS Code, I'm clicking the Source Control icon, the third one down, to see what changed. Under Changes, two files are listed: `index.html` and `styles.css`.
- I'm clicking `index.html` in that list to open its diff in the editor. The green lines are my changes: the language on line 2, the alt text on line 11 and the label on line 25.
- Now I'm clicking `styles.css` in the same list. Only one line changed: the `.muted` colour on line 87. Nothing else changed, so the page keeps its look.

**Commit**
- I'm pointing at the Changes header and clicking the plus at its right end, Stage All Changes, to stage both files for the commit.
- I'm clicking the message box at the top of the Source Control view and typing "Fix accessibility issues on sign-up page (WEB-318)", so the commit names the ticket it fixes.
- I'm clicking the blue Commit button, just under the message box, to commit the fix.
- The Source Control list is empty now, so the fix is committed, and the task is done.

## H. Epilogue (3–4 minutes, no mouse)

*If something went differently in your take, say what really happened instead.*

**1. Outcome**
- The task is complete. The newsletter sign-up page now scores 100 in Lighthouse Accessibility, up from 66, with no failed audits.
- The email field has a real label, the form works with the keyboard, and the fix is committed.

**2. How I verified it**
- I ran Lighthouse before and after the fix and saved both reports.
- When I clicked the words "Email address", the cursor went into the box, so the label is now connected to the field.
- And when I tabbed through the form, the focus ring moved from the email box to the Subscribe button, so keyboard users can reach both.

**3. Approach and key decisions**
- I let Lighthouse find the problems first, then fixed each one with the smallest change, so the page still looks the same.
- I turned the visible caption into a real label, rather than adding a hidden aria-label, so screen-reader users hear the same words everyone else sees.
- The logo's alt text says the newsletter's name, because that's what the image shows.
- For the faint text, I reused the darker grey from the email box's border. It passes with some margin and stays in our palette.

**4. Challenges**
- The colour picker suggests a colour, but it lands right on the 4.5 minimum and can round to just under it, so I chose one with some margin.
- The caption was easy to miss. It looked like a label, but it was a plain div, which is why VoiceOver only said "edit text".

**5. Limitations and next steps**
- The change is small, four lines in two files, so it's easy to review.
- But Lighthouse only checks part of the accessibility guidelines, so a score of 100 doesn't prove the page is fully accessible.
- With more time, I'd test the page with VoiceOver, check the Subscribe flow once it's connected, and add an automated accessibility check to our build so this can't come back.

**6. One lesson for less experienced developers**
- Text that looks like a label isn't a label until it's connected to its field.
- And don't choose a colour that passes contrast by a hair; rounding or a different background can push it under.
- That's the end of the task.
