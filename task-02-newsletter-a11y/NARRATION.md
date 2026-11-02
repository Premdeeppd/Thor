# Task 2 narration: what to say

Two or three short lines per step, in run-sheet order (`PLAN.md`). Say them in your own words, read out the numbers you actually see, and close this file before recording.

## How to talk

- Before a click, say what you're clicking and why. After it, say what you see.
- If something unexpected happens, say what you see and what you'll try next.

## A. Intro

- "I will be beginning my task soon. Here is the workflow I have in mind." Say only this, then minimise the Goal doc.

## B. Ticket, README, start the page (VS Code)

- I'm opening ticket WEB-318 in preview. Our newsletter sign-up page fails the accessibility release check, so it can't go live.
- A reader using VoiceOver said the email box was read out as just "edit text", so the box has no name.
- The README's release checklist has three checks: Lighthouse 100, keyboard access and AA contrast. I'll check all three at the end.
- I'm starting the page from the NPM Scripts panel, with the play button next to `dev`. Vite serves it on localhost 5173.

## C. Run the audit (Brave)

- The grey text under the button and in the footer is faint, even for me.
- When I click the words "Email address", nothing happens. A real label would put the cursor in the box.
- I'm opening DevTools and the Lighthouse tab, ticking only Accessibility, and clicking Analyze page load.
- The score is 66, with four failed audits. Going through them:
  - The logo image has no alt text. It shows the newsletter's name as a picture, which screen readers can't read.
  - The email box has no label. That's the problem from the ticket.
  - Two grey texts don't have enough contrast, so they're hard to read for people with low vision.
  - The page has no `lang`. Screen readers use it to pick the right voice and pronunciation.
- I'm saving this report as HTML, `lighthouse-before`, as evidence.

## D. Check the contrast (Brave DevTools)

- I'm right-clicking the grey text and choosing Inspect. Its colour comes from the `.muted` class: `#9ca3af`.
- The colour picker shows a contrast ratio of about 2.5. Text this size needs 4.5 for AA.
- The email box's border already uses a darker grey, `#6b7280`. I'm trying it here: about 4.8, so it passes with some margin.
- The picker can suggest a colour, but it lands right on 4.5, so I prefer our palette grey. DevTools changes are temporary, so next I'll fix the CSS file.

## E. Fix the code (VS Code)

- In `index.html`, I'm adding `lang="en"` to the `html` element.
- The logo gets alt text with the newsletter's name. A purely decorative image would get an empty alt instead.
- The caption "Email address" is just a `div`. I'm making it a `label` with `for="email"`, which matches the input's id, so now the box has a name.
- The style already sets `display: block`, so the page looks the same.
- In `styles.css`, `.muted` gets `#6b7280`, the same grey as the input border.
- I'm saving all files, and Vite reloads the page.

## F. Verify (Brave)

- Clicking "Email address" now puts the cursor in the box, so the label is connected.
- I'm clicking the heading and pressing Tab: the email box gets a focus ring. Tab again: the Subscribe button.
- I'm running Lighthouse again: 100, with no failed audits.
- Lighthouse also lists items to check by hand. It can't catch everything, which is why I tested the keyboard myself.
- I'm saving this report as `lighthouse-after`.

## G. Review and commit (VS Code)

- In Source Control, `index.html` has three changed lines: the language, the alt text and the label. `styles.css` has one: the text colour.
- I'm staging both and committing with "Fix accessibility issues on sign-up page (WEB-318)". The task is done.

## H. Epilogue (3–4 minutes, no mouse)

Pick from these, and say what really happened in your take:

1. **Outcome:** Lighthouse went from 66 to 100, the email field has a real label, and the form works with the keyboard. The fix is committed.
2. **Verification:** the before and after reports, clicking the label, and tabbing through the form.
3. **Approach:** let Lighthouse find the problems, read each one, fix it with the smallest change, then run it again.
4. **Decisions:** a real label instead of a caption `div`; alt text that says what the logo says; a palette grey with some margin instead of the borderline suggestion.
5. **Limitations and next steps:** Lighthouse covers only part of WCAG. Next would be a VoiceOver pass, checking the Subscribe flow once it's connected (WEB-322), and an automated accessibility check in CI.
6. **Lesson:** text that looks like a label isn't one unless it's connected to its field. And don't pick a colour that passes by a hair.
- That's the end of the task.
