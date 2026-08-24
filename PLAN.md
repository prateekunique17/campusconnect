# CampusConnect Refactor Plan

## Goal

Rewrite the project in a beginner-friendly style using simple React components and plain JavaScript. The pages should look like normal HTML and CSS converted into React JSX.

## HTML and CSS Style

Each React component will be written as if its HTML structure was copied into JSX:

- Use normal HTML elements such as `header`, `nav`, `main`, `section`, `div`, `h1`, `p`, `form`, `input`, and `button`.
- Use simple `className` values that match the CSS file.
- Keep the visual design in CSS instead of writing complex styles inside JSX.
- Keep each component focused on displaying one part of the page.
- Use clear opening and closing tags with readable indentation.
- Avoid compressed one-line JSX and difficult nested expressions.
- Use props only when a component needs data from its parent.
- Use basic event functions for buttons and forms.
- Do not convert the project into advanced React patterns.

The goal is for a beginner to understand the JSX by comparing it directly with regular HTML and then understand the appearance by opening the matching CSS class.

## Allowed React Topics

Only these React topics will be used:

- JavaScript basics inside JSX
- Components
- Props
- Events
- Forms
- `fetch()`

The React code will not use:

- `useState`
- `useEffect`
- `useContext`
- `useMemo`
- `useCallback`
- Custom React hooks
- Redux or another state library
- Advanced React patterns

## Allowed JavaScript Topics

Only these JavaScript topics will be used:

- Basic variables and conditions
- Arrays
- Objects
- Functions
- Callback functions
- DOM selection and DOM updates
- Browser events
- Promises
- `async` and `await`
- Error handling with `try`, `catch`, and simple error messages

## Important Implementation Decision

Without `useState` and `useEffect`, React will not manage changing screen data in the normal way. React components will mainly display markup using props.

Interactive behavior will be handled with beginner-level DOM JavaScript:

- Buttons will use event handlers.
- Forms will read values from the form elements.
- Theme changes will update `document.body` directly.
- Local storage data will be read and written with simple functions.
- Lists will be rendered by passing arrays as props.
- Countdown and other changing values will use normal browser callbacks only where required.

This keeps the code close to HTML, CSS, and basic JavaScript, but it means React will not automatically re-render every data change. After an action that needs a new screen, the page can navigate or reload the displayed data.

## Planned Component Structure

### Shared Components

- `App.jsx`: render the main page layout and routes.
- `Navbar.jsx`: display navigation and handle the theme button.
- `Footer.jsx`: display the footer.
- `EventCard.jsx`: receive one event through props and display it.
- `Toast.jsx`: display simple success or error messages.

### Pages

- `Home.jsx`: landing page with sections and featured event cards.
- `Events.jsx`: event list, search form, and category filter.
- `EventDetails.jsx`: event information and registration form.
- `AddEvent.jsx`: add-event form and image preview.
- `Registrations.jsx`: display registrations and saved events.
- `Auth.jsx`: sign-in and sign-up forms.

## Data Plan

- Keep event data in an array of objects.
- Keep the data helper functions simple and easy to read.
- Use `localStorage` for the current demo data.
- Use `fetch()` only if a simple data request is needed later.
- Do not add a backend or a complex data management library.

## File Changes

1. Remove React hooks from `App.jsx`.
2. Simplify the toast system so it does not depend on React hooks.
3. Rewrite page components with simple JSX and clear variable names.
4. Pass event data into `EventCard` with props.
5. Use normal form and button events for user actions.
6. Move repeated JavaScript logic into small plain functions.
7. Keep the existing colour theme and CSS design.
8. Remove unnecessary advanced syntax and keep the formatting beginner-friendly.
9. Keep the landing page and login/signup page.
10. Run the production build after the refactor.

## Validation Checklist

- The app starts with `npm run dev`.
- The project builds with `npm run build`.
- All routes still open correctly.
- Event cards display from the event array.
- Search and category filtering work.
- Forms accept and validate user input.
- Add event and registration actions still work.
- Login and signup still work for the local demo.
- Theme switching still works.
- No React hooks are used.
- No unrelated design changes are made.

## Approval

The plan was approved and implemented.
