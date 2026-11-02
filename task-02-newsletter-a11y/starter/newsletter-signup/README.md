# The Build Notes: newsletter sign-up page

The sign-up page for The Build Notes, our engineering team's monthly newsletter. Plain HTML and CSS, served by Vite during development.

- `index.html`: the page
- `src/styles.css`: the styles
- `public/logo.svg`: the newsletter logo
- `docs/`: tickets

The form isn't connected to the mailing service yet (that's WEB-322), so Subscribe doesn't send anything.

## Running locally

```bash
npm install
npm run dev   # http://localhost:5173, reloads when you save
```

## Release checklist

Before a page goes live:

1. Lighthouse Accessibility score of 100. Run it from the browser's DevTools with only the Accessibility category ticked.
2. Every form field can be reached and used with the keyboard.
3. Text meets WCAG AA contrast: at least 4.5:1 for normal-size text.
