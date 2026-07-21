# Soma Inc. Website Sprint List

This file is the working sprint tracker for the Soma Inc. website. Moving forward, update this list whenever the website changes so the project history, current focus, and next priorities stay easy to follow.

Last updated: 2026-07-21

## Current sprint: Site polish and user-flow stability

Goal: keep the site feeling futuristic, readable, and coherent while making the main user paths work smoothly.

### In progress

- Continue polishing page alignment, spacing, and readability across Home, Products, Shop, Account, and Purchase History.
- Keep the Products page centered, legible, and consistent with the retro terminal / futuristic tech-company style.
- Keep shop copy and product descriptions aligned with the Soma Inc. narrative tone.
- Keep the News & Events archive terminal expandable as more story files, attachments, and media are added.

### Next up

- Review mobile responsiveness for all pages.
- Add clearer cart / purchase-history feedback after a user adds or removes an item.
- Improve page-to-page consistency for headings, buttons, card spacing, and hover states.
- Add a more polished empty-state message for purchase history.
- Add a simple checkout-style confirmation flow for demo purchases.

## Completed recently

- Added functional site search for keywords and main pages.
- Added demo account creation and email notification signup.
- Separated purchase history from account / email login.
- Added local purchase-history saving.
- Added ability to delete items from purchase history.
- Expanded the shop with Eidolon-Frame models, accessories, repairs, and upgrade options.
- Updated the cart icon to lead to purchase history.
- Restyled the Products page with a centered retro terminal / old-school computer feel.
- Fixed the `schematic-head` image path.
- Fixed navbar clickability on the Products page.
- Fixed Products page alignment where old `#eframe` and `#sctitle` CSS offsets made the page illegible.
- Rebuilt News & Events as an interactive Fallout-style archive terminal with selectable files and attachments.
- Updated the News & Events archive terminal to move one screen at a time from Files to Attachments to Opened Log, with Back navigation.
- Recolored the News & Events archive terminal to match the Products page's dark teal, mint, and cyan Soma Inc. palette.
- Added a live archive-terminal date/time display that uses today's real date, weekday, and time while showing the year as 2122.
- Fit the News & Events archive terminal to the visible screen so the page itself no longer needs scrolling.
- Centered and narrowed the News & Events archive terminal into a more square monitor shape with side spacing similar to the Products page.
- Removed the News & Events archive terminal intro paragraph and changed the Soma Inc. terminal copyright year to 2038.
- Added clickable opened-log media previews with an enlarged terminal-style viewer and translucent description overlay.
- Standardized the navigation bar across all main pages using the Home page layout and typography.

## Backlog

### Design and content

- Add more product imagery or schematic-style visuals for shop items.
- Create a consistent visual system for Soma Inc. panels, cards, buttons, and callouts.
- Add lore-rich News & Events content.
- Add a stronger homepage call-to-action path into Products and Shop.
- Add more real archive media to News & Events, such as additional newspaper clippings, comic pages, and recorded audio files.

### Shop and purchase flow

- Add quantity controls to cart / purchase history.
- Add item categories and filters for frames, accessories, repairs, and upgrades.
- Add a demo order-detail view for each purchase-history item.
- Add local order IDs and timestamps for demo purchases.

### Account and notifications

- Improve the demo account dashboard.
- Let users edit saved notification preferences locally.
- Add a clearer distinction between demo-only login and real backend authentication.
- Future option: connect real email signup through a backend or email provider.

### Technical quality

- Audit image sizes and loading performance.
- Add a shared CSS theme section for reusable Soma Inc. design tokens.
- Reduce duplicate CSS rules from older page versions.
- Add basic automated checks for broken local links and missing assets.
- Consider splitting larger CSS and JavaScript files once the site grows.

## Change log

### 2026-07-21

- Pages/files changed: `events.html`, `css/style.css`, `js/events-terminal.js`, `js/search.js`, `SPRINT.md`
- What changed: Replaced the static News & Events image layout with an interactive archive terminal. Users can select file logs, view contained attachments, and open newspaper clippings, comic strips, schematic images, and simulated audio logs.
- Why it changed: The page needed to feel like a Fallout-style console / save-log system instead of a static document page.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, local asset reference check, and live browser smoke tests for file selection, comic loading, clipping loading, and audio playback toggle.

### 2026-07-21

- Pages/files changed: `events.html`, `css/style.css`, `js/events-terminal.js`, `SPRINT.md`
- What changed: Converted the archive terminal from a three-column layout into a step-by-step screen flow. Users now move from Files to Attachments to Opened Log one page at a time, with a Back button and breadcrumb trail for returning to the previous screen.
- Why it changed: The archive needed to feel more like a terminal/save-log interface where each selection opens a new screen instead of exposing every panel at once.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, asset reference check, and live browser tests for Files → Attachments → Opened Log → Back → Back.

### 2026-07-21

- Pages/files changed: `events.html`, `css/style.css`, `SPRINT.md`
- What changed: Updated the News & Events archive terminal colors and font imports to match the Products page's Eidolon-Frame look: deep teal/black panels, mint highlights, pale white-mint headings, and cyan-tinted glow.
- Why it changed: The archive terminal needed to feel visually connected to the PRODUCT_01 // EIDOLON-FRAME product page instead of using a separate Fallout-green palette.
- Validation done: Ran CSS/JavaScript checks, asset reference checks, and visual browser inspection of the recolored archive terminal.

### 2026-07-21

- Pages/files changed: `events.html`, `js/events-terminal.js`, `SPRINT.md`
- What changed: Replaced the archive terminal's hardcoded status date with a live browser-based clock that displays today's real month, day, weekday, and time while forcing the story year to read `2122`.
- Why it changed: The News & Events terminal needed to feel current and alive without breaking the future Soma Inc. timeline.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, and local browser verification of the live `2122` terminal clock.

### 2026-07-21

- Pages/files changed: `events.html`, `css/style.css`, `SPRINT.md`
- What changed: Converted the News & Events archive terminal into a fit-to-screen layout with locked page height, flexible terminal panels, smaller status/intro spacing, and internal panel scrolling only when content is too large.
- Why it changed: The archive terminal needed to sit fully inside the visible browser window so users can operate it without scrolling the page.
- Validation done: Ran CSS/JavaScript checks, whitespace diff check, and browser layout tests at the normal app viewport plus a 1280x720 stress viewport confirming no document scroll.

### 2026-07-21

- Pages/files changed: `events.html`, `css/style.css`, `SPRINT.md`
- What changed: Narrowed and centered the News & Events archive terminal, capped it at a more square monitor-style size, and reduced the rounded CRT corners so it visually relates better to the Products page panels while keeping side breathing room.
- Why it changed: The terminal felt too wide and screen-filling after the fit-to-screen pass; it needed to feel like a centered object on the page instead of covering the whole viewport.
- Validation done: Ran CSS/JavaScript checks, whitespace diff check, and browser layout verification confirming equal side spacing, no page scroll, and working file-to-attachment-to-opened-log flow.

### 2026-07-21

- Pages/files changed: `events.html`, `SPRINT.md`
- What changed: Removed the archive terminal intro paragraph and changed the Soma Inc. archive boot copyright line to `COPYRIGHT 2038 SOMA INC. ARCHIVE SERVER`.
- Why it changed: The News & Events terminal needed cleaner on-screen copy and the requested Soma Inc. copyright year.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, and browser verification confirming the removed paragraph is no longer present and the copyright line shows 2038.

### 2026-07-21

- Pages/files changed: `events.html`, `css/style.css`, `js/events-terminal.js`, `SPRINT.md`
- What changed: Made opened-log media previews clickable. Comic panels, schematic photos, and future video attachments now open in an enlarged terminal-style viewer with a translucent title/description box over the media when written context exists.
- Why it changed: Users needed to inspect archive photos/videos more clearly without leaving the archive terminal flow.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, and browser tests for opening and closing enlarged schematic media from the Opened Log screen.

### 2026-07-21

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Standardized the navbar markup, dropdown labels, search placeholder, cart/account icons, and Home page typography treatment across all main pages. Fixed old News dropdown links that still pointed to `event.html`.
- Why it changed: The navigation bar needed to remain visually and structurally consistent between pages while preserving the Home page format.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, local nav consistency checks, and browser checks across the main pages.

## Change-log format for future updates

When the website changes, add a short note here:

- Date
- Pages/files changed
- What changed
- Why it changed
- Validation done
