# CampusConnect — React version

Converted from the original multi-page vanilla HTML/CSS/JS site into a
single-page React app (Vite + react-router-dom).

## Run it

```
npm install
npm run dev
```

## Where everything went

**Each old HTML page → one component in `src/pages/`:**

| Old file             | New file                        |
|-----------------------|----------------------------------|
| index.html            | src/pages/Home.jsx               |
| events.html           | src/pages/Events.jsx             |
| add-event.html        | src/pages/AddEvent.jsx           |
| event-details.html    | src/pages/EventDetails.jsx       |
| registrations.html    | src/pages/Registrations.jsx      |

**Repeated markup → `src/components/`:**
- `Navbar.jsx` — the header/nav bar + theme toggle, shown on every page
- `Footer.jsx` — the footer, shown on every page
- `EventCard.jsx` — the single event card, reused on Home and Events

**`script.js` was split by what it actually did:**
- `src/data/events.js` — the static `EVENTS` array (pure data, no logic)
- `src/utils/storage.js` — the localStorage read/write helpers and small
  formatters (`formatDate`, `getCategoryTag`, `findEventById`,
  `getAllEvents`). Plain functions like this that don't touch the DOM
  are the right place for "just JavaScript" in a React app — any
  component can `import` them instead of every component reinventing
  the logic.
- `src/context/ToastContext.jsx` — the old global `showToast()` DOM
  function, rewritten as a `useToast()` hook any component can call
- Theme state and the countdown timer became `useState`/`useEffect`
  hooks living in `App.jsx` and `EventDetails.jsx` respectively, since
  in React, state and DOM updates are supposed to live inside
  components/hooks rather than a separate global script.
- The `var`/callback-hell/BOM teaching examples from the top of the old
  `script.js` were left out — they were demo comments, not app logic.

**`style.css` → `src/index.css`**, imported once in `main.jsx` and left
almost untouched, since all the original class names (`.card`, `.btn`,
`.event-grid`, etc.) are reused as-is in JSX via `className`. The one
page-scoped `<style>` block from `event-details.html`'s `<head>` was
folded into the bottom of this file, since a React page doesn't have
its own `<head>`.

**Routing**: react-router-dom replaces the plain `<a href="...">` links
between pages, and `useParams()` replaces reading `?id=` off
`window.location.search` in `event-details.html`.
