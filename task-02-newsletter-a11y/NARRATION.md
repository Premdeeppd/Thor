# Task 2 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`). Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only text that isn't spoken is the tags, the two sections before the intro, the intro instruction and one note at the start of the epilogue.

## How to talk while recording

Every line from B to G starts with a tag that says what kind of line it is. The tags are only for rehearsal; don't say them out loud.

- **[WHY]**: say it *before* you touch anything. It says what you'll do next and why.
- **[DO]**: say it *while* you do it. It says where the element is on screen, what you do and which element.
- **[SEE]**: say it once the result is on screen. It says what you see and what it means.

So every step goes the same way: first say what you'll do next and why, then do it, then say what you see.

AutoQC's feedback on task 1's narration asks for three things, and they apply to this task too:

- **For every action, say what you do, name the element, say where it is on screen, and say why.** "Where" is the screen area, the toolbar or panel, or the line number in the file. The [WHY] line gives the why just before the action, and the [DO] line gives the rest. For example: *"Ticket WEB-318 is about this page, so I'll read it first."* Then: *"I'm right-clicking `WEB-318.md`, just under docs in the Explorer on the left, and choosing Open Preview."*
- **Record the task in one uninterrupted take,** from the intro to the end of the epilogue. Don't pause or stop TaskRecorder in between. If something goes wrong, say what happened and keep going.
- **To check the recording, click Run full AutoQC, not Rerun failing,** so all its actions are counted.

Also:

- **Keys are actions too.** Say Return, Tab, Escape, the right arrow and Command A as you press them.
- **While editing code,** each of the four changes goes the same way: a [WHY] line for why it's needed, a [WHY] line for the line number where it goes, then [DO] lines as you click there and type it, then a [SEE] line while you point at it and say what it does. You don't need to talk while you type.
- **Let VS Code type the quote marks.** In `index.html`, when you type an equals sign after an attribute name and pause, VS Code adds `""` and puts the cursor between them. Type only the value. If you type the quotes yourself, you get two pairs.
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

Don't read or explain the Goal. B starts by minimising it.

## B. Read the ticket and start the page (VS Code)

**Open the project**
- **[WHY]** First, I'll clear the screen for the work, and open the sign-up page for our team's newsletter, The Build Notes. It's plain HTML and CSS, served by Vite.
- **[DO]** I'm clicking the yellow minimise button at the top left of the Goal doc's window.
- **[DO]** I'm clicking VS Code in the Dock on the left.

**Read the ticket**
- **[WHY]** Ticket WEB-318 is about this page, so I'll read it first. It's in the docs folder.
- **[DO]** In the Explorer on the left, I'm clicking the docs folder, at the top, to open it.
- **[DO]** I'm right-clicking `WEB-318.md`, just under docs, and choosing Open Preview.
- **[SEE]** The ticket opens formatted in the editor. The page fails our accessibility release check, so it can't go live on Friday. A VoiceOver user also said the email box is read out as just "edit text". So the box has no name.
- **[SEE]** The ticket expects a Lighthouse Accessibility score of 100 with no failed audits, a label that screen readers read out for the email box, a form that works with the keyboard, and the same look, apart from colour fixes. Those are my checks at the end.

**Read the README**
- **[WHY]** Next, I'll read the README, for the release checklist.
- **[DO]** I'm right-clicking `README.md`, at the bottom of the file list in the Explorer, and choosing Open Preview.
- **[SEE]** Near the top, it says the form isn't connected yet. That's ticket WEB-322, so Subscribe doesn't send anything.
- **[WHY]** The release checklist at the bottom says what the page must pass, so I'll go through it.
- **[DO]** I'm pointing at the release checklist at the bottom of the preview.
- **[SEE]** It adds one more check: text contrast of at least 4.5 to 1. And Lighthouse runs with only Accessibility ticked.

**Start the page**
- **[WHY]** Now I'll start Vite. The NPM Scripts section lets me start it with a click, without typing commands.
- **[DO]** In the NPM Scripts section at the bottom of the Explorer, I'm clicking the play button at the right end of the `dev` row.
- **[SEE]** In the terminal panel that opens at the bottom, Vite prints the address: localhost, port 5173.

## C. Run the audit (Brave)

**Look at the page**
- **[WHY]** Next, I'll open the page in Brave, to see it the way visitors do.
- **[DO]** I'm clicking Brave, the lion icon in the Dock on the left.
- **[DO]** I'm clicking the address bar at the top of the Brave window, typing localhost:5173 and pressing Return.
- **[SEE]** It's one sign-up card.
- **[WHY]** First, I'll look at the grey text, because the README asks for good contrast.
- **[DO]** I'm pointing at the grey line under the email box, and at the grey footer under the card.
- **[SEE]** Both are faint and hard to read.
- **[WHY]** Now I'll check whether the words "Email address", just above the box, are a real label. Clicking a real label puts the cursor in its box.
- **[DO]** I'm clicking the words "Email address".
- **[SEE]** Nothing happens, so this caption isn't connected to the box.

**Run Lighthouse**
- **[WHY]** Now I'll run Lighthouse, which is part of DevTools. First I'll open DevTools, then the Lighthouse panel.
- **[DO]** In the menu bar at the top of the screen, I'm clicking View, then Developer, then Developer Tools.
- **[SEE]** DevTools opens on the right.
- **[DO]** In the tab row at the top of DevTools, I'm clicking Lighthouse, the second tab.
- **[WHY]** Next, I'll set up the audit the way the README asks, with only Accessibility ticked.
- **[DO]** I'm leaving Mode on Navigation and Device on Mobile, the defaults. Under Categories, I'm unticking Performance, Best practices and SEO.
- **[WHY]** Now I'll start the audit.
- **[DO]** I'm clicking the blue Analyze page load button near the top of the panel.
- **[SEE]** Lighthouse reloads the page and checks it, in about fifteen seconds.

**Read the failed audits**
- **[SEE]** At the top of the report, the Accessibility score is an orange 66. Below it, four audits failed, in three groups.
- **[WHY]** I'll open each failed audit, to see what it found and where it is in the page.
- **[DO]** Under Names and labels, I'm clicking the first one, "Image elements do not have alt attributes", and pointing at the element it lists.
- **[SEE]** The logo lights up in the page. Screen readers can't read the name inside this picture.
- **[DO]** I'm clicking the next one, "Form elements do not have associated labels", and pointing at its element.
- **[SEE]** The email box lights up. That's the VoiceOver problem from the ticket.
- **[DO]** Under Contrast, I'm clicking "Background and foreground colors do not have a sufficient contrast ratio".
- **[SEE]** It lists the grey line and the footer, which are hard to read with low vision or on a bright screen.
- **[DO]** Under Internationalization and localization, I'm clicking the last one.
- **[SEE]** The html element has no lang attribute. Screen readers use lang to pick the right voice and pronunciation.

**Save the report**
- **[WHY]** I'll save this report as evidence.
- **[DO]** I'm clicking the three-dot menu at the top right of the report and choosing Save as HTML.
- **[DO]** In the save dialog, I'm typing lighthouse-before as the file name, checking that it's going to Downloads, and clicking Save at the bottom right.

## D. Check the contrast (Brave DevTools)

- **[WHY]** Before I change the code, I want to see the contrast numbers myself. First, I'll find the grey line's colour.
- **[DO]** In the page on the left, I'm right-clicking the grey line under the email box and choosing Inspect.
- **[SEE]** DevTools switches to the Elements panel and selects that paragraph. In the Styles pane, under the HTML, the `.muted` rule sets its colour to `#9ca3af`, a light grey.
- **[WHY]** The colour picker shows the contrast ratio, so I'll open it.
- **[DO]** I'm clicking the small grey square just left of `#9ca3af`.
- **[SEE]** In the lower half of the picker, the Contrast ratio row says about 2.5, with a warning sign.
- **[WHY]** I'll open that row, to see the targets.
- **[DO]** I'm clicking the arrow at the right end of the Contrast ratio row.
- **[SEE]** AA needs 4.5 for text this size, so this grey fails.
- **[WHY]** The picker also offers a colour that just reaches 4.5, but one right on the limit can round to just under it. So I won't use it.
- **[DO]** I'm pressing Escape to close the picker.
- **[WHY]** Instead, I'll try the darker grey our email box's border uses, `#6b7280`. First, I'll select the whole old value, hash sign included.
- **[DO]** I'm double-clicking the value `#9ca3af` in the `.muted` rule and pressing Command A.
- **[DO]** In that box, I'm typing `#6b7280` and pressing Return.
- **[SEE]** Both grey texts in the page turn darker, because they share the `.muted` class.
- **[WHY]** Now I'll check the ratio again, in the colour picker.
- **[DO]** I'm clicking the colour square next to the new value.
- **[SEE]** It's now about 4.8, with a check mark for AA, so it passes with some margin.
- **[WHY]** DevTools changes are lost when the page reloads, so I'll make the real fix in the code next. First, I'll close the picker.
- **[DO]** I'm pressing Escape.

## E. Fix the code (VS Code)

**Open the HTML**
- **[WHY]** Now I'll go back to VS Code, to make the real fix in the code.
- **[DO]** I'm clicking VS Code in the Dock on the left.
- **[WHY]** First, I'll open the page's HTML.
- **[DO]** In the Explorer on the left, I'm clicking `index.html`, just under `.gitignore`.
- **[SEE]** Three of the problems are in this file, on lines 2, 11 and 25.
- **[WHY]** I'll fix them one at a time, then the colour in the CSS.

**Change 1 of 4: the page language (line 2)**
- **[WHY]** First, I'll add the page's language. Screen readers use the lang attribute to pick the voice and pronunciation, and this page doesn't say it's in English.
- **[WHY]** It goes on the html element, on line 2, right after the word html.
- **[DO]** I'm double-clicking the word html on line 2 and pressing the right arrow key.
- **[DO]** I'm typing a space, lang and an equals sign, and pausing.
- **[SEE]** VS Code adds the two quote marks and puts the cursor between them.
- **[DO]** So I'm typing just "en".
- **[SEE]** Line 2 now has `lang="en"`: the page is in English.

**Change 2 of 4: the logo's alt text (line 11)**
- **[WHY]** Next, the logo's alt text. The logo shows the newsletter's name as a picture, so it needs alt text that says the name. A purely decorative image would get an empty alt instead.
- **[WHY]** The logo is the img element on line 11, so the alt goes right after the word img.
- **[DO]** I'm double-clicking img on line 11 and pressing the right arrow key.
- **[DO]** I'm typing a space, alt and an equals sign, pausing for the quote marks, and typing "The Build Notes" between them.
- **[SEE]** Now screen readers read the logo as "The Build Notes".

**Change 3 of 4: a real label (line 25)**
- **[WHY]** Now the main problem from the ticket. The "Email address" caption looks like a label, but it's a plain div, so nothing connects it to the box. That's why VoiceOver said just "edit text". So I'll make it a real label.
- **[WHY]** The caption is on line 25, and its box is the input on line 27, with the id "email". First, I'll change the opening div on line 25 to label.
- **[DO]** I'm double-clicking the first div on line 25 and typing label.
- **[WHY]** Next, the label needs a for attribute that matches the box's id on line 27.
- **[DO]** Right after the word label, I'm typing a space, for and an equals sign, and "email" between the quote marks.
- **[WHY]** The closing tag at the end of line 25 still says div, so I'll change it too, to match.
- **[DO]** I'm double-clicking that div and typing label.
- **[SEE]** Now screen readers read "Email address" for the box. The field-label style already makes the label a block, so the page looks the same.

**Change 4 of 4: the grey text (styles.css, line 87)**
- **[WHY]** Last, the faint grey, which measured 2.5 when it needs 4.5. It's in the stylesheet, so I'll open it.
- **[DO]** In the Explorer, I'm clicking the src folder and then `styles.css` inside it.
- **[WHY]** The grey comes from the `.muted` rule, which starts on line 85, so I'll scroll down to it.
- **[DO]** I'm scrolling down the editor to line 85.
- **[SEE]** The colour is on line 87.
- **[WHY]** I'll change it to the grey I tested in DevTools.
- **[DO]** I'm double-clicking `9ca3af` on line 87, which selects the six characters after the hash sign, and typing 6b7280.
- **[WHY]** Next, I'll show where this grey comes from.
- **[DO]** I'm pointing at line 66, a little higher up.
- **[SEE]** The email box's border already uses this grey, so the page stays in its palette. Both grey texts use `.muted`, so this one line fixes both.

**Save**
- **[WHY]** Now I'll save both files at once.
- **[DO]** In the menu bar at the top of the screen, I'm clicking File, then Save All.
- **[SEE]** The dots on the `index.html` and `styles.css` tabs at the top of the editor disappear, so they're saved.

## F. Verify the fix (Brave)

**Reload**
- **[WHY]** Now I'll switch to Brave, to check the fix.
- **[DO]** I'm clicking Brave in the Dock on the left.
- **[WHY]** I'll reload the page, so it loads my saved files, without the colour I tried in DevTools.
- **[DO]** I'm clicking the reload button, the circular arrow just left of the address bar.

**Label and keyboard**
- **[WHY]** First, I'll test the label, by clicking its words again.
- **[DO]** In the page on the left, I'm clicking the words "Email address".
- **[SEE]** Now the cursor jumps into the box and a focus ring appears, so the label is connected.
- **[WHY]** Next, the keyboard check from the README. I'll start from the heading and move through the form with Tab.
- **[DO]** I'm clicking the heading, "Get The Build Notes in your inbox", and pressing Tab.
- **[SEE]** The focus ring moves to the email box.
- **[DO]** I'm pressing Tab again.
- **[SEE]** The ring moves to the Subscribe button. So keyboard users can reach the field and the button.

**Run Lighthouse again**
- **[WHY]** Now I'll audit the fixed page with Lighthouse, in a new report.
- **[DO]** In the tab row at the top of DevTools, I'm clicking Lighthouse.
- **[DO]** I'm clicking the plus button at the left end of the Lighthouse toolbar, at the top of the panel, to start a new report.
- **[SEE]** Only Accessibility is still ticked.
- **[DO]** So I'm clicking Analyze page load.
- **[SEE]** The score is now a green 100, with no failed audits.
- **[WHY]** A score of 100 isn't the whole story, so I'll show what Lighthouse leaves for people to check.
- **[DO]** I'm pointing at "Additional items to manually check", just under the score.
- **[SEE]** Lighthouse can't check everything automatically, which is why I tested the label and the keyboard myself.

**Save the report**
- **[WHY]** I'll save this report too, so I have reports from before and after the fix.
- **[DO]** I'm clicking the three-dot menu at the top right of the report and choosing Save as HTML.
- **[DO]** In the save dialog, I'm typing lighthouse-after and clicking Save at the bottom right.

## G. Review and commit (VS Code)

**Review the diff**
- **[WHY]** Now I'll go back to VS Code, to review my changes before I commit them.
- **[DO]** I'm clicking VS Code in the Dock on the left.
- **[WHY]** I'll open Source Control, to see what changed.
- **[DO]** In the Activity Bar on the far left of VS Code, I'm clicking the Source Control icon, the third one down.
- **[SEE]** Under Changes, two files are listed: `index.html` and `styles.css`.
- **[WHY]** I'll open each file's diff, to check every line I changed.
- **[DO]** I'm clicking `index.html` in that list.
- **[SEE]** Its diff opens in the editor. The green lines are my changes: the language on line 2, the alt text on line 11 and the label on line 25.
- **[DO]** Now I'm clicking `styles.css` in the same list.
- **[SEE]** Only one line changed: the `.muted` colour on line 87. Nothing else changed, so the page keeps its look.

**Commit**
- **[WHY]** The changes look right, so I'll stage both files for the commit.
- **[DO]** I'm pointing at the Changes header and clicking the plus at its right end, Stage All Changes.
- **[WHY]** Next, I'll write a commit message that names the ticket it fixes, and commit the fix.
- **[DO]** I'm clicking the message box at the top of the Source Control view and typing "Fix accessibility issues on sign-up page (WEB-318)".
- **[DO]** I'm clicking the blue Commit button, just under the message box.
- **[SEE]** The Source Control list is empty now, so the fix is committed, and the task is done.

## H. Epilogue (3–4 minutes, no mouse)

*These lines have no tags: you say them with no mouse, and nothing new happens on screen. If something went differently in your take, say what really happened instead.*

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
