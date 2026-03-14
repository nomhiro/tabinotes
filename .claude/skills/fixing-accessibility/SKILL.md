---
name: fixing-accessibility
description: Audit and fix HTML accessibility issues including ARIA labels, keyboard navigation, focus management, color contrast, and form errors. Use when adding interactive controls, forms, dialogs, or reviewing WCAG compliance.
---

# fixing-accessibility

Fix accessibility issues.

## how to use

- `/fixing-accessibility`
  Apply these constraints to any UI work in this conversation.

- `/fixing-accessibility <file>`
  Review the file against all rules below and report:
  - violations (quote the exact line or snippet)
  - why it matters (one short sentence)
  - a concrete fix (code-level suggestion)

Do not rewrite large parts of the UI. Prefer minimal, targeted fixes.

## when to apply

Reference these guidelines when:
- adding or changing buttons, links, inputs, menus, dialogs, tabs, dropdowns
- building forms, validation, error states, helper text
- implementing keyboard shortcuts or custom interactions
- working on focus states, focus trapping, or modal behavior
- rendering icon-only controls
- adding hover-only interactions or hidden content

## rule categories by priority

| priority | category | impact |
|----------|----------|--------|
| 1 | accessible names | critical |
| 2 | keyboard access | critical |
| 3 | focus and dialogs | critical |
| 4 | semantics | high |
| 5 | forms and errors | high |
| 6 | announcements | medium-high |
| 7 | contrast and states | medium |
| 8 | media and motion | low-medium |
| 9 | tool boundaries | critical |

## quick reference

### 1. accessible names (critical)

- every interactive control must have an accessible name
- icon-only buttons must have aria-label or aria-labelledby
- every input, select, and textarea must be labeled
- links must have meaningful text (no “click here”)
- decorative icons must be aria-hidden

### 2. keyboard access (critical)

- do not use div or span as buttons without full keyboard support
- all interactive elements must be reachable by Tab
- focus must be visible for keyboard users
- do not use tabindex greater than 0
- Escape must close dialogs or overlays when applicable

### 3. focus and dialogs (critical)

- modals must trap focus while open
- restore focus to the trigger on close
- set initial focus inside dialogs
- opening a dialog should not scroll the page unexpectedly

### 4. semantics (high)

- prefer native elements (button, a, input) over role-based hacks
- if a role is used, required aria attributes must be present
- lists must use ul or ol with li
- do not skip heading levels
- tables must use th for headers when applicable

### 5. forms and errors (high)

- errors must be linked to fields using aria-describedby
- required fields must be announced
- invalid fields must set aria-invalid
- helper text must be associated with inputs
- disabled submit actions must explain why

### 6. announcements (medium-high)

- critical form errors should use aria-live
- loading states should use aria-busy or status text
- toasts must not be the only way to convey critical information
- expandable controls must use aria-expanded and aria-controls

### 7. contrast and states (medium)

- ensure sufficient contrast for text and icons
- hover-only interactions must have keyboard equivalents
- disabled states must not rely on color alone
- do not remove focus outlines without a visible replacement

### 8. media and motion (low-medium)

- images must have correct alt text (meaningful or empty)
- videos with speech should provide captions when relevant
- respect prefers-reduced-motion for non-essential motion
- avoid autoplaying media with sound

### 9. tool boundaries (critical)

- prefer minimal changes, do not refactor unrelated code
- do not add aria when native semantics already solve the problem
- do not migrate UI libraries unless requested

## common fixes

```html
<!-- icon-only button: add aria-label -->
<!-- before --> <button><svg>...</svg></button>
<!-- after -->  <button aria-label="Close"><svg aria-hidden="true">...</svg></button>

<!-- div as button: use native element -->
<!-- before --> <div onclick="save()">Save</div>
<!-- after -->  <button onclick="save()">Save</button>

<!-- form error: link with aria-describedby -->
<!-- before --> <input id="email" /> <span>Invalid email</span>
<!-- after -->  <input id="email" aria-describedby="email-err" aria-invalid="true" /> <span id="email-err">Invalid email</span>
```

## project-specific checklist

This project has recurring patterns that need attention:

### color contrast
- banned colors: `#9a918a` (~3.5:1), `#8a7f76` (~3.5:1), `#7a7068` (~3.8:1), `#888` (~3.5:1), `#555` (passes on white but banned for project consistency)
- use `#756d65` for muted text (time, `.day-date`, labels, notes, toggles, DayMap popup time)
- use `#6a6058` for description text (`.tl-desc`, `.nav-btn`, genre badges, `.trip-list-label`, DayMap popup desc)
- use `#5a5048` for form labels
- cover `.cover-label` opacity must be ≥ 0.8, `.cover-members` ≥ 0.85
- TripList `.trip-card-members` opacity must be ≥ 0.85
- audit inline styles (`style={{}}` in JSX) as well as CSS class definitions — colors hide in both places
- do not duplicate CSS rules — define each selector once

### focus-visible
- every `<a>` rendered with inline styles only must also get a CSS class with `:focus-visible`
- known classes: `.memo-link`, `.dinner-map-link`, `.booking-links a`, `.tl-links a`, `.cover-back`
- AuthGate input/button need `:focus-visible` in `<style>` (inline styles can't do pseudo-classes)

### semantics
- memo box headings must use `<h3>` (not `<div>` with bold styling)
- DayMap wrapper must use `role="region"` (not `role="img"` — the map is interactive)
- heading hierarchy: `<h1>` (cover) → `<h2>` (day/cost title) → `<h3>` (memo heading)

### emoji aria-hidden
- all decorative emoji must be wrapped: `<span aria-hidden="true">🌐</span>`
- applies to: timeline icons, booking-links, memo-links, dinner-map-links, DayMap popups
- links that have both emoji and text: emoji gets `aria-hidden`, text stays visible

### sr-only pattern
- use `clipPath: "inset(50%)"` not `clip: "rect(0,0,0,0)"` (deprecated)

## review guidance

- fix critical issues first (names, keyboard, focus, tool boundaries)
- prefer native HTML before adding aria
- quote the exact snippet, state the failure, propose a small fix
- for complex widgets (menu, dialog, combobox), prefer established accessible primitives over custom behavior