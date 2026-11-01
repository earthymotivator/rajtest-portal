# Rajtest.in UI implementation guidance

## Context and goals

Rajtest.in must present Rajasthan government exam preparation content as a structured, high-trust Hindi learning platform that feels fast, readable, and action-oriented without sacrificing clarity or accessibility.

Design intent:
- The product is a content-first exam prep site, not a dashboard-like app.
- Information density must support fast scanning, trust, and decision-making.
- All UI patterns must be tokenized, keyboard-accessible, and consistent across desktop and mobile.

## Design tokens and foundations

### Typography foundations

- Font family primary: Hind
- Font family stack: Hind, Arial, Noto Sans Devanagari, sans-serif
- Base font size: 17.5px
- Base font weight: 800
- Base line-height: 23.8px
- Scale:
  - xs: 8.5px
  - sm: 10px
  - md: 10.5px
  - lg: 11px
  - xl: 11.5px
  - 2xl: 12px
  - 3xl: 12.5px
  - 4xl: 13px
- Type usage must remain intentionally structured and compressed for content-heavy pages.
- Headings must use strong hierarchy with short line lengths.
- Body text must remain highly legible for dense Hindi educational content.
- Text below readable primary sizes must not be used for essential content.

### Color tokens

- color.text.primary = #ffffff
- color.text.secondary = #75675e
- color.text.tertiary = #261b16
- color.text.inverse = #52080d
- color.surface.base = #000000
- color.surface.muted = #7d1015
- color.surface.raised = #fffaf2
- color.surface.strong = #1877f2

Semantic usage:
- color.text.primary must be used for high-contrast text on dark backgrounds.
- color.text.tertiary must be used for primary page narrative and headings on light surfaces.
- color.surface.raised must be used for card and panel backgrounds.
- color.surface.strong must be used only for trust-building, focus, and primary action emphasis.
- color.surface.muted must be used as secondary emphasis, not as the default text background.

### Spacing and layout

- Spacing scale:
  - space.1 = 1px
  - space.2 = 2px
  - space.3 = 4px
  - space.4 = 6px
  - space.5 = 8px
  - space.6 = 9px
  - space.7 = 10px
  - space.8 = 12px
- Layout rules:
  - All spacing must come from the token scale.
  - Components must not introduce ad hoc padding or margins.
  - Content blocks should align to a consistent rhythm tied to 8px-based increments wherever possible.
  - The design system must prefer simple modular composition over arbitrary offsets.

### Radius, shadow, motion

- radius.xs = 8px
- radius.sm = 12px
- radius.md = 50px
- shadow.1 = rgba(0, 0, 0, 0.18) 0px 2px 6px 0px
- motion.duration.instant = 120ms
- motion.duration.fast = 150ms
- Interaction motion must be subtle and consistent; motion must not distract from reading flow.

## Component-level rules

### 1) Navigation

Anatomy:
- Must include brand lockup, main navigation, utility links, and a clear CTA area.
- Must support top-level categories for exam-prep content with visible hierarchy.
- Must maintain a maximum of 4 primary navigation items.
- The CTA must be action-oriented but must not visually dominate page content.

Variants:
- Default desktop nav
- Compact mobile nav
- Sticky nav on scroll
- Utility nav for quick links

State rules:
- Default state must be visible, readable, and high contrast.
- Hover state must use semantic token emphasis, not arbitrary color-only changes.
- Focus-visible state must use a clear ring or outline that meets contrast requirements.
- Active state must be visually distinct and use semantic emphasis, not color alone.
- Disabled state must be visibly muted and non-interactive.
- Loading state must use a skeleton or muted placeholder only when data is async.
- Error state must show a clear message if nav data or section content fails to load.

Behavior:
- Navigation must be fully operable by keyboard Tab, Enter, and Space.
- Pointer and touch interactions must work without hover-only behavior.
- Touch targets must be at least 44x44 CSS pixels.
- Focus must never be trapped.

Responsive behavior:
- Navigation must collapse to a mobile menu without losing CTA clarity.
- Long Hindi labels must wrap or compress without clipping.
- Overflow must be prevented in narrow layouts.

### 2) Cards

Anatomy:
- Must include title, descriptor, metadata, and primary action.
- Card density should stay high but readable; the known density target is 250 cards per page section when used in list grids.
- Cards must support a consistent icon, image, or badge treatment.
- Titles must be short, specific, and action-oriented.

Variants:
- Exam card
- Article card
- Highlight card
- Quick-link card

State rules:
- Default state must be clear, readable, and visually balanced.
- Hover state must use subtle border or elevation changes with semantic tokens.
- Focus-visible state must show a clear, high-contrast ring.
- Active state must be obvious but not disruptive.
- Disabled state must be visibly muted and non-interactive.
- Loading state must use skeleton placeholders when needed.
- Error state must use a neutral fallback message or empty-state treatment.

Behavior:
- Cards must be keyboard focusable when they contain a primary action.
- Pointer click must trigger the intended primary action.
- Touch targets must be large enough for thumb use.
- Keyboard users must reach the primary action without hidden nested elements.

Responsive behavior:
- Cards must reflow cleanly across mobile, tablet, and desktop.
- Long Hindi titles must not overflow or clip.
- Empty states must provide a clear fallback action and readable layout spacing.

### 3) Buttons

Anatomy:
- Must have clear labels, visible affordance, and consistent hierarchy.
- Buttons must use tokenized text, background, border, and state variables.
- Roles must be limited to primary, secondary, tertiary, destructive, and ghost.

Variants:
- Primary: exam CTA
- Secondary: category or filter action
- Tertiary: utility action
- Destructive: only when required by real actions
- Ghost: low-emphasis utility

State rules:
- Default state must be visible and intentional.
- Hover state must be obvious but restrained.
- Focus-visible state must meet contrast and be unmistakable.
- Active state must provide clear pressed feedback.
- Disabled state must be visibly muted and non-interactive.
- Loading state must disable the action and show a spinner or text change.
- Error state must be explicit and actionable.

Behavior:
- Buttons must support Enter and Space activation.
- Buttons must not trigger unintended actions on repeated key press.
- Pointer and touch activation must work consistently.
- Hover-only affordances must not hide essential functionality.

Responsive behavior:
- Buttons must remain legible on small screens.
- Labels must not collapse below readable width without wrapping or stacking.
- Long Hindi labels must still be understandable.

### 4) Links and text actions

Anatomy:
- Must be scannable, descriptive, and distinct from non-interactive text.
- Link density should remain consistent with the known target of 129 links on a full content page.
- Link text must describe the destination or action clearly.

Variants:
- Inline link
- Navigation link
- Read-more link
- CTA link

State rules:
- Default state must be readable and visible.
- Hover state must include token-based emphasis such as underline or subtle color shift.
- Focus-visible state must be clear and high contrast.
- Active state must be visibly pressed.
- Disabled state must not appear interactive.
- Loading state must use a placeholder only when absolutely necessary.
- Error state must provide a fallback label or status message if the target is unavailable.

Behavior:
- Links must be keyboard focusable.
- Pointer and touch interfaces must support the same interaction as keyboard.
- Link text must be descriptive; “Click here” is prohibited.

### 5) Inputs and filters

Anatomy:
- Inputs must be clear, minimal, and labeled.
- The target density is 1 primary input per page template unless a search or filter pattern is required.
- Search and filter UI must not overpower content and must remain secondary to the reading flow.

Variants:
- Search input
- Select field
- Filter chips
- Checkbox and radio controls

State rules:
- Default state must have clear labels and visible boundaries.
- Hover state must be subtle and consistent.
- Focus-visible state must be high-contrast and unmissable.
- Active state must indicate current selection or input emphasis.
- Disabled state must be muted and non-interactive.
- Loading state must indicate pending data fetch or processing.
- Error state must include a clear validation message adjacent to the field.

Behavior:
- Keyboard navigation and visible focus order must be consistent.
- Touch and pointer input must work without hidden controls.
- Error recovery must be visible and actionable.

Responsive behavior:
- Inputs must remain usable on small screens.
- Long Hindi values must not overflow the viewport.
- Search filters must remain clear and uncluttered.

### 6) Content page structure

Anatomy:
- Must prioritize top-of-page clarity: H1, summary, key metadata, body content, related links, and CTA.
- Content pages must maintain strong hierarchy across headings, lists, callouts, and FAQs.
- Pages must be optimized for scanning, not just reading.

State rules:
- Default state must be clean and readable.
- Hover state must be reserved for interactive elements only.
- Focus-visible state must be applied to all interactive controls.
- Active state must be visible on click or tap.
- Disabled state must be avoided in primary content flow.
- Loading state must use skeletons only for heavier data blocks.
- Error state must provide a clear recovery message.

Responsive behavior:
- Layout must support long-form content and scanning patterns.
- Long content blocks must handle lists, quotes, tables, and snippets without layout breakage.
- No “everything looks the same” problem must be allowed; hierarchy must remain visible.

## Accessibility requirements and testable acceptance criteria

### Core accessibility rules

- All interactive elements must have visible focus states that meet WCAG 2.2 AA contrast requirements.
- Text and background combinations must pass contrast checks.
- Keyboard-first interaction must work for every control.
- Touch targets must be at least 44x44 CSS pixels.
- All labels must be explicit and descriptive.
- Components must not rely on color alone to communicate state or meaning.

### Acceptance criteria

- Pass: All visible focus states are clearly visible against both light and dark surfaces.
- Pass: The keyboard tab order matches the expected content and interaction order.
- Pass: Buttons, links, and inputs are operable without a mouse.
- Pass: All critical actions are accessible via Enter or Space.
- Pass: Contrast ratios meet or exceed WCAG 2.2 AA for text and controls.
- Pass: Hover-only behavior does not hide required UI functionality.
- Pass: Long Hindi text wraps without being cut off or overlapped.
- Pass: Empty states provide explicit guidance and do not leave blank containers.
- Pass: Error states explain what went wrong and what the user can do next.
- Pass: Disabled states are visually and programmatically communicated.
- Fail: A control lacks a visible focus state.
- Fail: Text appears on a low-contrast background.
- Fail: A button is only clickable with hover.
- Fail: Link text is vague like “Click here”.
- Fail: A component introduces arbitrary one-off spacing outside the token system.

## Content and tone standards with examples

Writing standards:
- Must be concise, confident, and implementation-focused.
- Must use Hindi-first language where appropriate, with English terms only when exam naming or product context requires them.
- Must prefer direct, helpful phrases over promotional fluff.
- Must avoid jargon unless it is common in Rajasthan government exam preparation.
- Must keep CTA language specific and action-oriented.

Examples:
- Good: “RPSC RAS तैयारी नोट्स”
- Good: “आज का राजस्थान GK टेस्ट”
- Good: “परीक्षा पैटर्न समझें”
- Good: “सभी पाठ्यक्रम देखें”
- Avoid: “Explore a world of opportunities”
- Avoid: “Click here for details”
- Avoid: “More information”
- Avoid: “Best ever test series”

Tone by surface:
- Marketing headline: concise, aspirational, and trustworthy
- Supporting text: practical, direct, and useful
- Button text: action-first and explicit
- Card metadata: precise and scannable
- Error text: factual and actionable

## Anti-patterns and prohibited implementations

- Must not use low-contrast text or hidden focus indicators.
- Must not create one-off spacing or typography exceptions that bypass the design tokens.
- Must not introduce ambiguous labels such as “View”, “More”, or “Read”.
- Must not rely on hover-only affordances for essential functionality.
- Must not use decorative content or pseudo-actions to hide missing functionality.
- Must not overload cards with too many competing actions.
- Must not allow text overflow to silently clip Hindi content.
- Must not use a dense wall of text without hierarchy and spacing.
- Must not forget the required state rules for default, hover, focus-visible, active, disabled, loading, and error.
- Must not ship component guidance without explicit state logic and accessibility validation.

Migration notes:
- Teams should prefer system consistency over local visual exceptions.
- Existing content templates must be mapped to tokens before visual refinement.
- Card and navigation patterns should be normalized before adding new creative treatments.
- New components must inherit the semantic token set instead of introducing local color or spacing variables.
- If a requirement conflicts with accessibility, accessibility must win.

Edge-case handling:
- Long Hindi titles must truncate or wrap gracefully without breaking layout.
- Empty search results must include a neutral empty state and a recovery action.
- Broken content images must show a clean placeholder, not a blank gap.
- Missing metadata must not create irregular card heights.
- Mobile nav must support long labels without hidden menu overflow.
- Error states must be visible without hover or mouse inspection.

## QA checklist

- All components have default, hover, focus-visible, active, disabled, loading, and error states.
- All color usage follows semantic tokens and passes contrast tests.
- All interactive controls are reachable by keyboard.
- Focus indicators are visible and consistent.
- Touch targets meet minimum size.
- Labels are explicit and descriptive.
- Long Hindi strings wrap or truncate cleanly.
- Card, link, and button density remain within expected page patterns.
- Navigation remains readable and limited to clear hierarchical choices.
- No one-off spacing or typography exceptions exist.
- Empty, loading, and error states are implemented.
- Accessibility criteria pass for WCAG 2.2 AA.
- Content tone remains concise, informative, and trustworthy.

