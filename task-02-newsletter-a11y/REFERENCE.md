# Task 2 reference: for rehearsal only

> Close this file before you press Record, and never paste from it while recording. The current Studio form says "No AI while recording".
>
> Rehearse until you can make the four changes yourself and say why each one is there.

This is the finished fix, measured on 2 Nov 2026 with Lighthouse 13.5.0 (the version Brave 1.98.63 / Chromium 156 bundles in DevTools) against the starter in `inputs/input 1.zip`. Two files change: four lines in all.

The comment above each change says why it's needed. The comments are only notes here, not in the files, so the line numbers below don't count them.

## `index.html`

```html
<!doctype html>
<!-- Screen readers use lang to pick the voice and pronunciation. -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Subscribe to The Build Notes</title>
    <link rel="stylesheet" href="/src/styles.css" />
  </head>
  <body>
    <main class="card">
      <!-- Screen readers can't read the name in the picture, so alt says it. -->
      <img alt="The Build Notes" class="logo" src="/logo.svg" width="220" height="48" />

      <h1>Get The Build Notes in your inbox</h1>
      <p class="intro">
        One email a month from our engineering team: what we shipped, what broke, and what we
        learned fixing it.
      </p>
      <ul class="perks">
        <li>Release highlights before they reach the changelog</li>
        <li>One deep dive into a real production bug</li>
        <li>Tools and tips the team actually uses</li>
      </ul>

      <form class="signup">
        <!-- A real label, tied to the box by for="email", so screen readers read it. -->
        <label for="email" class="field-label">Email address</label>
        <div class="field-row">
          <input id="email" name="email" type="email" autocomplete="email" required />
          <button type="submit">Subscribe</button>
        </div>
        <p class="muted">One email a month. Unsubscribe any time.</p>
      </form>
    </main>

    <footer class="muted">© 2026 The Build Notes · Sent by our engineering team</footer>
  </body>
</html>
```

The changes are on lines 2 (`lang="en"`), 11 (`alt`, typed straight after `img`) and 25 (`div` → `label for="email"`). The input that `for="email"` points at is on line 27. Nothing is added or removed, so no line moves while you edit, and the file stays 36 lines.

## `src/styles.css`

```css
.muted {
  font-size: 14px;
  /* #9ca3af was 2.53:1 on white; AA needs 4.5:1, and this grey is 4.83:1. */
  color: #6b7280;
}
```

The only change: `#9ca3af` → `#6b7280` on line 87. The `.muted` rule starts on line 85, and the email field's border already uses `#6b7280` on line 66.

## The changes, in the order you make them

Checked on 2 Nov 2026 by replaying these keystrokes on the starter with VS Code 1.144's default settings. Two of those settings matter:

- **Double-click selects one word.** `<`, `>`, `/`, `=`, quotes and `#` end a word, so double-clicking `html` on line 2 selects only `html`, and double-clicking `9ca3af` leaves the `#` in place.
- **VS Code types the quote marks.** When you type `=` straight after an attribute name inside a tag and pause for a moment, VS Code adds `""` and puts the cursor between them (the HTML setting Auto Create Quotes). So type only the value. If you type the quotes yourself, you get `lang=""en""`.

| # | Line | Where you click | What you type | What the line shows after it |
|---|---|---|---|---|
| 1 | 2 | Double-click `html` in `<html>`, then press → | ` lang=`, pause, then `en` | `<html lang="en">` |
| 2 | 11 | Double-click `img`, then press → | ` alt=`, pause, then `The Build Notes` | `<img alt="The Build Notes" class="logo" src="/logo.svg" width="220" height="48" />` |
| 3a | 25 | Double-click the first `div` | `label` | `<label class="field-label">Email address</div>` |
| 3b | 25 | Nowhere: the cursor is already just after `label` | ` for=`, pause, then `email` | `<label for="email" class="field-label">Email address</div>` |
| 3c | 25 | Double-click the closing `div` | `label` | `<label for="email" class="field-label">Email address</label>` |
| 4 | 87 of `src/styles.css` | Double-click `9ca3af` | `6b7280` | `color: #6b7280;` |

About 54 typed characters in the two files; the longest piece is `The Build Notes`, 15 characters. Then File → Save All.

## The colour try-out in DevTools (section D)

In the Styles pane: double-click the value `#9ca3af` in `.muted`, press Command A so the whole value is selected, type `#6b7280` and press Return. Command A matters: a double-click may select only `9ca3af`, and typing `#6b7280` over that gives `##6b7280`, which DevTools strikes through. The change is gone after a reload, so the real fix is change 4 above.

## What you should see

| Check | Before | After |
|---|---|---|
| Lighthouse Accessibility (Mobile or Desktop) | 66, orange | 100, green |
| Failed audits | 4 (below) | none |
| Contrast of the grey text on white | 2.53:1 (the picker may show 2.54) | 4.83:1 (AA needs 4.5) |
| Click the words "Email address" | nothing | the cursor goes into the box, with a focus ring |
| Click the heading, press Tab twice | | focus ring on the email box, then on Subscribe |

The four failed audits, under three headings:

| Heading | Audit title | Element |
|---|---|---|
| Names and labels | Image elements do not have `[alt]` attributes | the logo `<img>` |
| Names and labels | Form elements do not have associated labels | the email `<input>` |
| Contrast | Background and foreground colors do not have a sufficient contrast ratio. | `<p class="muted">` and `<footer class="muted">` |
| Internationalization and localization | `<html>` element does not have a `[lang]` attribute | `<html>` |

Lighthouse also shows 10 "Additional items to manually check". They're the same before and after and don't affect the score.

## Why not the colour picker's suggestion

DevTools suggests the colour that hits exactly 4.5:1, then rounds it to a hex value. For grey text on white this rounds down to just under 4.5 (for example `#a3a3a3` gets `#777777`, 4.48:1), so Lighthouse would still fail it. That's why the run-sheet reuses `#6b7280`, which passes with some margin. Anything darker than `#767676` on white passes AA too.

## Why each fix is right

- **`lang="en"`:** screen readers choose the voice and pronunciation from it. Without it they guess from the user's settings.
- **`alt="The Build Notes"`:** the logo shows the newsletter's name, so the alt text says the name. A purely decorative image would get `alt=""` so screen readers skip it. Typing it straight after `img` puts it first among the attributes; their order doesn't matter.
- **`<label for="email">`:** `for` points at the input's `id`, so screen readers read "Email address" for the box, and clicking the text focuses it. Wrapping the input inside the label would also work; the `for`/`id` pair keeps the layout unchanged. The `.field-label` rule already has `display: block`, so a `label` looks exactly like the `div` did.
- **`#6b7280`:** passes AA (4.83:1) with some margin and keeps the page in its existing palette. Both grey texts use the `.muted` class, so one change fixes both.
