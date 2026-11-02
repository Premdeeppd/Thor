# Task 2 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`). Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only text that isn't spoken is the two sections before the intro, the intro instruction and one note at the start of the epilogue.

## How to talk while recording

- **One short sentence per action: where, what, which element, why.** *"In the Explorer on the left, I'm right-clicking `WEB-318.md` and choosing Open Preview, to read the ticket."* AutoQC checks every action for all four, so keep all four, just briefly.
- **Say the line, then move on.** Don't add explanations between the lines; your reasoning goes in the epilogue. That keeps the take near 20 minutes.
- **Keys are actions too.** Say Return, Tab, Escape, the right arrow and Command A as you press them.
- **Code:** for each of the four changes, say why it's needed, then the line number, then click and type. You don't need to talk while you type.
- **Let VS Code type the quote marks.** In `index.html`, type an equals sign after an attribute name and pause: VS Code adds `""` with the cursor between them, so type only the value. If you type the quotes yourself, you get two pairs.
- **One uninterrupted take,** from the intro to the end of the epilogue. If something goes wrong, say what happened and keep going.
- **Check with Run full AutoQC,** not Rerun failing, so every action is counted.
- Read out the names, numbers and messages you *actually* see. The ones below come from preparation.

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

- I'm clicking the yellow minimise button at the top left of the Goal doc's window, to clear the screen.
- I'm clicking VS Code in the Dock on the left, to open the sign-up page for our newsletter, The Build Notes: plain HTML and CSS, served by Vite.
- In the Explorer on the left, I'm opening the docs folder at the top, right-clicking `WEB-318.md` and choosing Open Preview, to read the ticket.
- The page fails our accessibility release check, so it can't go live on Friday. And a VoiceOver user heard the email box as just "edit text", so the box has no name.
- It expects a Lighthouse Accessibility score of 100, a label for the email box, a form that works with the keyboard, and the same look apart from colour fixes. Those are my checks at the end.
- I'm right-clicking `README.md`, last in the Explorer, and choosing Open Preview, to read the release checklist.
- Near the top, it says the form isn't connected yet, so Subscribe sends nothing.
- I'm pointing at the checklist at the bottom of the preview: it adds text contrast of at least 4.5 to 1, and running Lighthouse with only Accessibility ticked.
- In NPM Scripts at the bottom of the Explorer, I'm clicking the play button on the `dev` row, to start Vite. The terminal at the bottom shows the address: localhost, port 5173.

## C. Run the audit (Brave)

**Look at the page**
- I'm clicking Brave, the lion icon in the Dock, to look at the page.
- I'm clicking the address bar at the top, typing localhost:5173 and pressing Return, to open the page.
- I'm pointing at the grey line under the email box and the grey footer under the card, because both look faint.
- I'm clicking the words "Email address" above the box, to test them. Nothing happens, so it isn't a real label: a real one puts the cursor in its box.

**Run Lighthouse**
- In the menu bar at the top of the screen, I'm choosing View, Developer, Developer Tools, to run Lighthouse. DevTools opens on the right.
- In the tab row at the top of DevTools, I'm clicking Lighthouse, the second tab, to open the audit.
- Under Categories, I'm unticking Performance, Best practices and SEO, so only Accessibility runs, as the README asks.
- I'm clicking the blue Analyze page load button near the top of the panel, to start the audit.

**Read the failed audits**
- At the top of the report, the Accessibility score is an orange 66, with four failed audits.
- Under Names and labels, I'm clicking the alt audit to open it, and pointing at its element: the logo lights up. Screen readers can't read the name inside this picture.
- I'm clicking the labels audit below it, to see its element: the email box, the VoiceOver problem from the ticket.
- Under Contrast, I'm clicking the contrast audit: it lists the grey line and the footer, which are hard to read.
- Under Internationalization, I'm clicking the last audit: the html element has no lang, which screen readers use to pick the voice.

**Save the report**
- To keep this report as evidence, I'm clicking the three-dot menu at the top right of the report and choosing Save as HTML.
- In the save dialog, I'm typing lighthouse-before, checking it's going to Downloads, and clicking Save at the bottom right.

## D. Check the contrast (Brave DevTools)

- To see the contrast numbers myself, I'm right-clicking the grey line under the email box in the page and choosing Inspect.
- In the Styles pane under the HTML, the `.muted` rule sets its colour to `#9ca3af`, a light grey.
- I'm clicking the small grey square just left of `#9ca3af`, to open the colour picker, because it shows the contrast ratio.
- In the lower half of the picker, the contrast ratio is about 2.5, with a warning. I'm clicking the arrow at the right end of that row, to see the target: AA needs 4.5.
- The picker suggests a colour right on 4.5, which can round to just under it. So I'm pressing Escape to close the picker, and I'll try a grey from our palette instead.
- I'm double-clicking the value `#9ca3af` in the `.muted` rule and pressing Command A, to select the whole value, hash sign included.
- I'm typing `#6b7280`, the darker grey of the email box's border, and pressing Return. Both grey texts turn darker, because they share `.muted`.
- I'm clicking the colour square again, to check: about 4.8, with a check mark for AA. I'm pressing Escape to close it.
- DevTools changes are lost on reload, so now I'll make the real fix in the code.

## E. Fix the code (VS Code)

- I'm clicking VS Code in the Dock, to fix the code.
- In the Explorer on the left, I'm clicking `index.html`, just under `.gitignore`, to open the page's HTML. Three of the problems are here, on lines 2, 11 and 25.

**Change 1 of 4: line 2**
- Screen readers use lang to pick the voice, and this page doesn't say it's in English. That goes on the html element, line 2.
- I'm double-clicking html on line 2, pressing the right arrow to move after it, and typing a space, lang and an equals sign. VS Code adds the quotes, so I'm typing just en.

**Change 2 of 4: line 11**
- The logo shows the newsletter's name as a picture, so it needs alt text with that name. The logo is the img on line 11.
- I'm double-clicking img on line 11, pressing the right arrow, and typing a space, alt and an equals sign, pausing for the quotes, then The Build Notes.

**Change 3 of 4: line 25**
- Now the ticket's main problem. The "Email address" caption on line 25 is a plain div, so nothing connects it to the box. That's why VoiceOver said "edit text".
- I'm double-clicking the first div on line 25 and typing label, to make it a real label.
- Right after it, I'm typing a space, for and an equals sign, then email in the quotes, because for must match the box's id on line 27.
- I'm double-clicking the closing div at the end of line 25 and typing label, so the closing tag matches. Its style already makes it a block, so the page looks the same.

**Change 4 of 4: styles.css, line 87**
- Last, the grey text: about 2.5 when it needs 4.5. In the Explorer, I'm opening src and clicking `styles.css`, to open the stylesheet.
- I'm scrolling down the editor to the `.muted` rule on line 85. Its colour is on line 87.
- I'm double-clicking `9ca3af` on line 87 and typing 6b7280, the grey I tested, which the email box's border already uses on line 66. Both grey texts use `.muted`, so this fixes both.

**Save**
- In the menu bar at the top of the screen, I'm choosing File, then Save All, to save both files. The dots on their tabs at the top of the editor disappear.

## F. Verify the fix (Brave)

- I'm clicking Brave in the Dock, to check the fix.
- I'm clicking the reload button just left of the address bar, so the page loads my saved files instead of the DevTools try-out.
- In the page on the left, I'm clicking the words "Email address" again, to test the label. The cursor jumps into the box, so the label is connected.
- For the keyboard check, I'm clicking the heading, so focus starts there, and pressing Tab: the focus ring moves to the email box.
- I'm pressing Tab again, and the ring moves to the Subscribe button. Keyboard users can reach both.
- In the tab row at the top of DevTools, I'm clicking Lighthouse, to audit the fixed page.
- I'm clicking the plus button at the left end of the Lighthouse toolbar, to start a new report, then Analyze page load. Only Accessibility is still ticked.
- The score is now a green 100, with no failed audits.
- I'm clicking the three-dot menu at the top right of the report, choosing Save as HTML, typing lighthouse-after and clicking Save, so I have reports from before and after.

## G. Review and commit (VS Code)

- I'm clicking VS Code in the Dock, to review my changes before committing.
- In the Activity Bar on the far left, I'm clicking Source Control, the third icon, to see what changed: `index.html` and `styles.css`.
- I'm clicking `index.html` in the Changes list, to open its diff: lines 2, 11 and 25 changed.
- I'm clicking `styles.css` below it: only line 87, the grey, changed. So the page keeps its look.
- I'm clicking the plus at the right end of the Changes header, to stage both files.
- I'm clicking the message box at the top and typing "Fix accessibility issues on sign-up page (WEB-318)", so the commit names the ticket.
- I'm clicking the blue Commit button under the message box. The list is empty, so the fix is committed and the task is done.

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
