# Task 2 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`). Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only text that isn't spoken is the tags, the two sections before the intro, the intro instruction and the note at the start of the epilogue.

## How to talk while recording

- **Explain, then do.** Every step starts with a **[WHY]** line: say what you're about to do and why, in plain words, as if you're explaining it to a colleague sitting next to you. Then do it.
- **[DO]** lines: say them while you do the action. They name the place on screen, what you do and the element.
- **[SEE]** lines: say them once the result is on screen. Read out what you actually see; the numbers below come from preparation.
- AutoQC checks every action for where, what, which element and why: the [WHY] line gives the why, and the [DO] line gives the rest.
- **Say the line, then move on.** Deeper reasoning goes in the epilogue. That keeps the take near 25 minutes.
- **Keys are actions too.** Say Return, Tab, Escape, the right arrow and Command A as you press them.
- **Code:** each of the four changes starts with a [WHY] line saying what you're going to change and why. Then the [DO] line gives the line number, and you click and type. Change 3 is three small edits on line 25, each with its own [WHY]. You don't need to talk while you type.
- **Let VS Code type the quote marks.** In `index.html`, type an equals sign after an attribute name and pause: VS Code adds `""` with the cursor between them, so type only the value. If you type the quotes yourself, you get two pairs.
- **One uninterrupted take,** from the intro to the end of the epilogue. If something goes wrong, say what happened and keep going.
- **Check with Run full AutoQC,** not Rerun failing, so every action is counted.

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

> "I will be beginning my task soon. Here is the workflow I have in mind."

Don't read or explain the Goal. The first line of B minimises it.

## B. Read the ticket and start the page (VS Code)

- **[WHY]** First, I'll clear the screen and open the project in VS Code. It's the sign-up page for our team's newsletter, The Build Notes: plain HTML and CSS, served by Vite.
- **[DO]** I'm clicking the yellow minimise button at the top left of the Goal doc's window, then VS Code in the Dock on the left.
- **[WHY]** There's a ticket about this page, WEB-318, so I'll read it first, to understand what's wrong.
- **[DO]** In the Explorer on the left, I'm opening the docs folder at the top, right-clicking `WEB-318.md` and choosing Open Preview.
- **[SEE]** The page fails our accessibility release check, so it can't go live on Friday. Also, a VoiceOver user said the email box is read out as just "edit text". So the box has no name.
- **[SEE]** It expects a Lighthouse Accessibility score of 100, a label for the email box, a form that works with the keyboard, and the same look apart from colour fixes. Those will be my checks at the end.
- **[WHY]** Next, I'll read the README, because it has our release checklist.
- **[DO]** I'm right-clicking `README.md`, last in the Explorer, and choosing Open Preview.
- **[SEE]** Near the top, it says the form isn't connected yet, so Subscribe doesn't send anything. At the bottom, the checklist adds a contrast rule: at least 4.5 to 1. And it says to run Lighthouse with only Accessibility ticked.
- **[WHY]** Now I'll start the page. The NPM Scripts panel lets me start Vite with one click.
- **[DO]** In NPM Scripts at the bottom of the Explorer, I'm clicking the play button on the `dev` row.
- **[SEE]** The terminal at the bottom shows the address: localhost, port 5173.

## C. Run the audit (Brave)

**Look at the page**
- **[WHY]** Now I'll open the page in Brave, to see it the way a reader does.
- **[DO]** I'm clicking Brave, the lion icon in the Dock, then the address bar at the top, typing localhost:5173 and pressing Return.
- **[SEE]** It's one sign-up card. The grey line under the email box and the grey footer under the card both look faint.
- **[WHY]** Let me check if the words "Email address" are a real label. With a real label, clicking the words puts the cursor in the box.
- **[DO]** I'm clicking the words "Email address", just above the box.
- **[SEE]** Nothing happens, so these words aren't connected to the box.

**Run Lighthouse**
- **[WHY]** Now I'll run a Lighthouse audit. It's built into DevTools, and it checks the page for accessibility problems and gives a score.
- **[DO]** In the menu bar at the top of the screen, I'm choosing View, Developer, Developer Tools. DevTools opens on the right, and in its tab row at the top, I'm clicking Lighthouse, the second tab.
- **[WHY]** The README says to run it with only Accessibility ticked, so I'll untick the others.
- **[DO]** Under Categories, I'm unticking Performance, Best practices and SEO. Then I'm clicking the blue Analyze page load button near the top of the panel.
- **[SEE]** The Accessibility score at the top of the report is an orange 66, with four failed audits.

**Read the failed audits**
- **[WHY]** I'll open each failed audit, to see which part of the page it's about.
- **[DO]** Under Names and labels, I'm clicking the alt audit and pointing at its element.
- **[SEE]** The logo lights up. It shows the newsletter's name as a picture, and screen readers can't read a picture.
- **[DO]** I'm clicking the labels audit just below it.
- **[SEE]** Its element is the email box. That's the VoiceOver problem from the ticket.
- **[DO]** Under Contrast, I'm clicking the contrast audit.
- **[SEE]** It lists the grey line and the footer. They're hard to read with weak eyesight, or on a bright screen.
- **[DO]** Under Internationalization, I'm clicking the last audit.
- **[SEE]** The html element has no lang attribute. Screen readers use it to pick the right voice.

**Save the report**
- **[WHY]** I'll save this report, so I have evidence of where we started.
- **[DO]** I'm clicking the three-dot menu at the top right of the report and choosing Save as HTML. In the save dialog, I'm typing lighthouse-before, checking it goes to Downloads, and clicking Save at the bottom right.

## D. Check the contrast (Brave DevTools)

- **[WHY]** Before I change any code, I want to measure the grey text's contrast myself, and try a better colour.
- **[DO]** In the page on the left, I'm right-clicking the grey line under the email box and choosing Inspect.
- **[SEE]** DevTools switches to the Elements panel. In the Styles pane under the HTML, the `.muted` rule sets the colour to `#9ca3af`, a light grey.
- **[WHY]** The colour picker shows the contrast ratio, so I'll open it.
- **[DO]** I'm clicking the small grey square just left of `#9ca3af`.
- **[SEE]** In the lower half of the picker, the contrast ratio is about 2.5, with a warning sign.
- **[DO]** I'm clicking the arrow at the right end of that row, to see the target.
- **[SEE]** AA needs 4.5. The picker suggests a colour, but it sits right on 4.5, so it can round to just under it.
- **[WHY]** So instead, I'll try a grey we already use: `#6b7280`, the border colour of the email box. It's darker, and it keeps the page in our palette.
- **[DO]** I'm pressing Escape to close the picker. Then I'm double-clicking the value `#9ca3af` in the `.muted` rule and pressing Command A, so the whole value is selected, hash sign included.
- **[DO]** I'm typing `#6b7280` and pressing Return.
- **[SEE]** Both grey texts turn darker, because they share the `.muted` class.
- **[DO]** I'm clicking the colour square again, to check the new ratio.
- **[SEE]** It's now about 4.8, with a check mark for AA, so it passes with some margin.
- **[WHY]** Changes in DevTools disappear when the page reloads, so I'll close the picker and make the real fix in the code.
- **[DO]** I'm pressing Escape to close the picker.

## E. Fix the code (VS Code)

- **[WHY]** I'll start with the HTML file, because three of the four problems are there.
- **[DO]** I'm clicking VS Code in the Dock. In the Explorer on the left, I'm clicking `index.html`, just under `.gitignore`.
- **[SEE]** The three problems are on lines 2, 11 and 25.

**Change 1 of 4: line 2**
- **[WHY]** First, the page language. Screen readers use the lang attribute to pick the right voice and pronunciation, and this page doesn't say it's in English. So I'll add lang to the html element.
- **[DO]** I'm double-clicking html on line 2, pressing the right arrow to move after it, and typing a space, lang and an equals sign. VS Code adds the quote marks, so I'm typing just en.

**Change 2 of 4: line 11**
- **[WHY]** Next, the logo. It shows the newsletter's name as a picture, and screen readers can't read pictures. So I'll give it alt text with the name.
- **[DO]** I'm double-clicking img on line 11, pressing the right arrow, and typing a space, alt and an equals sign, pausing for the quotes, then The Build Notes.

**Change 3 of 4: line 25**
- **[WHY]** Now the main problem from the ticket. The words "Email address" on line 25 look like a label, but they're a plain div, so nothing connects them to the box. That's why VoiceOver said "edit text". So I'll turn the div into a real label. It will look the same, because its style already makes it a block.
- **[DO]** I'm double-clicking the first div on line 25 and typing label.
- **[WHY]** A label also has to say which box it belongs to. The box is the input on line 27, and its id is email.
- **[DO]** Right after label, I'm typing a space, for and an equals sign, pausing for the quotes, then email.
- **[WHY]** And the closing tag has to match the new opening tag.
- **[DO]** I'm double-clicking the closing div at the end of line 25 and typing label.

**Change 4 of 4: styles.css, line 87**
- **[WHY]** Last, the faint grey text. It measured about 2.5, and it needs 4.5. So I'll change it to the grey I just tested, which the email box's border already uses on line 66. Both grey texts use `.muted`, so one line fixes both.
- **[DO]** In the Explorer, I'm opening src and clicking `styles.css`, then scrolling down the editor to the `.muted` rule on line 85.
- **[DO]** I'm double-clicking `9ca3af` on line 87 and typing 6b7280.

**Save**
- **[WHY]** Now I'll save both files, so I can test them in Brave.
- **[DO]** In the menu bar at the top of the screen, I'm choosing File, then Save All. The dots on both tabs at the top of the editor disappear.

## F. Verify the fix (Brave)

- **[WHY]** Now I'll check the fix in Brave. I'll reload the page first, so it uses my saved files, not the colour I tried in DevTools.
- **[DO]** I'm clicking Brave in the Dock, then the reload button just left of the address bar.
- **[WHY]** First, the label. If it's connected now, clicking the words should put the cursor in the box.
- **[DO]** In the page on the left, I'm clicking the words "Email address".
- **[SEE]** This time the cursor jumps into the box, with a focus ring. So the label works.
- **[WHY]** Next, the keyboard check from the README. I'll start from the heading and press Tab, to see if the keyboard reaches the box and the button.
- **[DO]** I'm clicking the heading, "Get The Build Notes in your inbox", and pressing Tab.
- **[SEE]** The focus ring moves to the email box.
- **[DO]** I'm pressing Tab again.
- **[SEE]** The ring moves to the Subscribe button. So keyboard users can reach both.
- **[WHY]** Now I'll run Lighthouse again, on the fixed page.
- **[DO]** In the tab row at the top of DevTools, I'm clicking Lighthouse. Then I'm clicking the plus button at the left end of the Lighthouse toolbar, for a new report, and Analyze page load. Only Accessibility is still ticked.
- **[SEE]** The score is now a green 100, with no failed audits.
- **[WHY]** I'll save this report too, so I have one from before and one from after.
- **[DO]** I'm clicking the three-dot menu at the top right of the report, choosing Save as HTML, typing lighthouse-after and clicking Save.

## G. Review and commit (VS Code)

- **[WHY]** Finally, I'll review my changes in VS Code before I commit them.
- **[DO]** I'm clicking VS Code in the Dock. In the Activity Bar on the far left, I'm clicking Source Control, the third icon.
- **[SEE]** Two files have changed: `index.html` and `styles.css`.
- **[DO]** I'm clicking `index.html` in the Changes list, to open its diff.
- **[SEE]** Lines 2, 11 and 25 changed.
- **[DO]** I'm clicking `styles.css` below it.
- **[SEE]** Only line 87, the grey, changed. So the page keeps its look.
- **[WHY]** Everything looks right, so I'll stage both files and commit them, with a message that names the ticket.
- **[DO]** I'm clicking the plus at the right end of the Changes header. Then I'm clicking the message box at the top, typing "Fix accessibility issues on sign-up page (WEB-318)", and clicking the blue Commit button under it.
- **[SEE]** The list is empty, so the fix is committed, and the task is done.

## H. Epilogue (3–4 minutes, no mouse)

*Everything here is explanation, said with no mouse, so these lines have no tags. If something went differently in your take, say what really happened instead.*

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
