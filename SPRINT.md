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

## Change-log format for future updates

When the website changes, add a short note here:

- Date
- Pages/files changed
- What changed
- Why it changed
- Validation done
