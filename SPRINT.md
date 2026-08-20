# Soma Inc. Website Sprint List

This file is the working sprint tracker for the Soma Inc. website. Moving forward, update this list whenever the website changes so the project history, current focus, and next priorities stay easy to follow.

Last updated: 2026-08-19

## Current sprint: Site polish and user-flow stability

Goal: keep the site feeling futuristic, readable, and coherent while making the main user paths work smoothly.

### In progress

- Continue polishing page alignment, spacing, and readability across Home, Products, Shop, Account, and Purchase History.
- Keep the Products page centered, legible, and consistent with the retro terminal / futuristic tech-company style.
- Keep shop copy and product descriptions aligned with the Soma Inc. narrative tone.
- Keep the News & Events archive terminal expandable as more story files, attachments, and media are added.

### Next up

- Continue mobile QA for edge cases on very small phones, tablets, and rotated screens.
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
- Restored the full Shop dropdown category list across all main pages.
- Converted the Products page into a vertical terminal carousel with console-style text/image reveal effects.
- Matched the Products carousel frame to the News & Events archive terminal size and casing for stronger page-to-page consistency.
- Centered the Products carousel dots between the up/down arrows in a single right-side control rail.
- Added click-to-enlarge behavior for Products page schematic and SomaCloud images.
- Fixed Products carousel slide alignment so hash-loaded slides do not animate upward and top labels/headings remain immediately legible.
- Fixed the Products dropdown SomaCloud link so it loads the SomaCloud carousel slide without hidden terminal-screen scrolling.
- Fixed Home carousel text formatting so the first slide paragraph no longer clips and the Somacloud / Eidolon copy no longer overlaps.
- Repositioned the Home Eidolon-frame hero so its arm separates the title from the paragraph and restyled the Home carousel controls to match the Products control rail.
- Raised the Home first-slide Eidolon-frame and paragraph so the paragraph no longer cuts off on wide screens.
- Added device recognition and mobile-only responsive layouts for touch/small-screen devices while preserving the existing desktop view.
- Reworked the mobile navigation bar into a compact logo/search/cart/account row with hamburger access to the full nav menu.
- Made the mobile hamburger menu permanent in the HTML and cache-busted the nav CSS/JS so it appears reliably on deployed pages.
- Moved the mobile hamburger button to the far right of the navbar after search, cart, and account.
- Reordered the hamburger source markup after the mobile icon group and bumped nav assets to `mobile-menu-4` so the Home page cannot fall back to the old hamburger position.
- Restyled the shared navigation bar to match the archive terminal's dark teal, mint-glow visual system.
- Enlarged and shifted the Home page second-slide SomaCloud image closer to the text.
- Doubled the Home page second-slide SomaCloud image while preserving its current distance from the text.
- Enlarged the desktop Home page second-slide SomaCloud photo again and moved it slightly closer to the text.
- Doubled the current desktop Home page second-slide SomaCloud photo scale while keeping its latest text distance.
- Reduced the current desktop Home page second-slide SomaCloud photo by `1.5x` while keeping its latest text distance.
- Reduced the desktop Home page second-slide SomaCloud photo by `2x` and moved it slightly closer to the text.
- Nudged the Home second-slide SomaCloud foreground image slightly left and down to better overlap the matching grey server-room detail in the homepage background.
- Nudged the Home second-slide SomaCloud foreground image slightly right after the overlap pass.

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

### 2026-07-21

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `SPRINT.md`
- What changed: Restored the full Shop dropdown category list: Eidolon-Frames, Frame Components, Body Adaptations, Recovery Systems, Human Advancements, and SomaCloud & Somalink.
- Why it changed: The Shop navigation needed the fuller category list back while keeping the Home page navbar format consistent across the website.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, local nav consistency checks, and browser verification that every restored Shop dropdown link appears on each main page and points to an existing Shop section.

### 2026-07-21

- Pages/files changed: `prod.html`, `css/style.css`, `js/product-vertical-carousel.js`, `js/product-scroll-reveal.js`, `SPRINT.md`
- What changed: Converted the Products page into an eight-slide vertical terminal carousel while preserving the existing Soma Inc. product-page look. Added Home-style up/down controls, slide dots, mouse-wheel navigation, keyboard navigation, product-anchor support, and console-style text/image reveal behavior on each active slide.
- Why it changed: The Products page needed to feel like the Home carousel, but vertical and still styled like a retro Soma Inc. product archive.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, browser console check, slide overflow checks, and local preview smoke tests for wheel navigation, keyboard navigation, `#eframe` / `#sctitle` anchor routing, slide dots, fade/typing activation, and image reveal setup. GitHub push is intentionally pending until preview approval.

### 2026-07-22

- Pages/files changed: `prod.html`, `css/style.css`, `js/product-vertical-carousel.js`, `js/product-scroll-reveal.js`, `SPRINT.md`
- What changed: Wrapped the Products vertical carousel in an archive-terminal-style shell, bezel, and screen so it takes up the same centered 940×700 terminal footprint as the News & Events archive while preserving slide controls, dots, URL anchors, and console-style reveal behavior.
- Why it changed: The Products page needed to feel visually consistent with the News & Events archive terminal without losing the vertical carousel interaction.
- Validation done: Matched the Products shell, bezel, and screen measurements against the News & Events terminal in the local browser, confirmed all eight slides fit without overflow, tested next/previous controls and `#sctitle` anchor routing, and verified no product-page console errors.

### 2026-07-22

- Pages/files changed: `prod.html`, `css/style.css`, `SPRINT.md`
- What changed: Moved the Products carousel dots into the same control rail as the arrows so the up arrow sits above the dot column and the down arrow sits below it.
- Why it changed: The carousel controls needed to feel visually centered and intentional instead of having the arrow buttons and dots separated into two offset groups.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, HTML order check, and browser coordinate verification confirming the arrows and dots share the same center line with the dots bracketed between the buttons.

### 2026-07-22

- Pages/files changed: `prod.html`, `css/style.css`, `js/product-image-lightbox.js`, `SPRINT.md`
- What changed: Added a product-image lightbox so users can click the Products page schematic and SomaCloud images to open a larger terminal-style viewer with a caption and Close control.
- Why it changed: Product imagery needed to be easier to inspect without leaving the carousel or breaking the Products page terminal experience.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, verified all four product images are expandable/focusable, browser-tested opening and closing the active Eidolon image, confirmed the carousel stayed on `#eframe`, and checked for product-page console errors.

### 2026-07-22

- Pages/files changed: `prod.html`, `css/style.css`, `js/product-vertical-carousel.js`, `js/product-scroll-reveal.js`, `SPRINT.md`
- What changed: Added safe vertical spacing to Products carousel slides, disabled the initial animated jump when opening hash links like `#eframe`, cache-busted the updated product scripts, and kept slide labels/headings fully visible instead of type-clipping them.
- Why it changed: The Products carousel pages appeared pushed upward on load and the top product label/heading could look clipped or illegible while the carousel and typewriter effects initialized.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, short-viewport and normal-viewport browser checks, verified all eight slides have safe top spacing and zero overflow, tested next-slide navigation, tested product image enlargement, and confirmed no website console errors.

### 2026-07-22

- Pages/files changed: `prod.html`, `js/product-vertical-carousel.js`, `SPRINT.md`
- What changed: Intercepted same-page product hash links like `prod.html#sctitle`, reset the carousel's internal terminal-screen scroll whenever slides change, and cache-busted the updated carousel script.
- Why it changed: Selecting SomaCloud from the Products dropdown activated the correct slide but also triggered native anchor scrolling inside the hidden terminal screen, pushing the SomaCloud content out of view.
- Validation done: Ran JavaScript syntax checks, whitespace diff check, reproduced the hidden `screenScrollTop` issue, verified same-page `#eframe` to `#sctitle` transitions keep `screenScrollTop` at `0`, verified fresh cross-page loads into `prod.html#sctitle`, confirmed SomaCloud image/text render inside the terminal, and checked for website console errors.

### 2026-07-22

- Pages/files changed: `css/style.css`, `SPRINT.md`
- What changed: Rebuilt the Home carousel slide spacing with grid-based layouts, kept the Home navbar links from wrapping at the preview width, moved the Eidolon-frame hero/text presentation higher, placed the first paragraph under the arm without clipping, separated the Somacloud and Eidolon slide text blocks, and centered the Home carousel arrow controls beside the dots.
- Why it changed: The Home page carousel text was overlapping itself, the first slide paragraph was being cut off, and the visual controls were not sitting cleanly in the carousel rail.
- Validation done: Ran whitespace diff checks and live browser previews for Home slide 1 and slide 2, confirming slide 1 has safe headline-to-paragraph spacing, the paragraph fits inside the viewport, slide 2 text blocks have a visible gap, and the navbar remains single-line at the app preview width.

### 2026-07-22

- Pages/files changed: `index.html`, `css/style.css`, `SPRINT.md`
- What changed: Repositioned the Home Eidolon-frame image and first-slide text so the outstretched arm reads as the divider between the title and paragraph, converted the Home carousel controls into the same arrow/dot/arrow rail structure used by the Products carousel, restyled the Home arrows and dots with the Products terminal colors, and added spacing safeguards to the Products carousel control rail.
- Why it changed: The Home hero arm was still visually colliding with the paragraph, and the carousel arrows/dots needed to look consistent and avoid overlap.
- Validation done: Ran whitespace diff checks, verified the Home carousel markup uses one shared control rail, confirmed the local server returns `200`, and completed a live Home preview before the final paragraph nudge showing the Products-style rail with clean arrow-to-dot spacing.

### 2026-07-22

- Pages/files changed: `css/style.css`, `SPRINT.md`
- What changed: Removed the extra downward paragraph offset from the Home first carousel slide, tightened the paragraph's responsive top margin, and shifted the Eidolon-frame image higher so the arm remains above the copy without pushing text below the viewport.
- Why it changed: At the wider browser size shown in the latest screenshot, the first-slide paragraph was still getting cut off at the bottom.
- Validation done: Ran live browser layout checks at the normal preview width and a temporary `1916x923` viewport matching the screenshot. The wide viewport now shows the paragraph fully inside the screen with `53px` bottom clearance, then the temporary viewport override was reset.

### 2026-07-30

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `js/device-recognition.js`, `SPRINT.md`
- What changed: Added a shared device-recognition script that tags each page with viewport/input classes, then added a mobile-only responsive CSS layer for touch and small-screen devices. The mobile layer adapts the navbar, Home carousel, Products terminal carousel, News archive terminal, Shop grids, Account forms, and Purchase History panels without changing the desktop layout rules.
- Why it changed: Mobile devices needed screen-size and input-type-aware layouts while keeping the existing computer browser view intact.
- Validation done: Ran JavaScript syntax checks and whitespace diff checks. Captured local 390x844 mobile browser previews for Home, Products, News & Events, and Shop; those pages reported `mobile` viewport mode and no horizontal overflow. GitHub push is intentionally pending until preview approval.

### 2026-07-30

- Pages/files changed: `css/style.css`, `js/device-recognition.js`, `SPRINT.md`
- What changed: Replaced the two-row mobile navbar with a compact one-row mobile control bar showing only the Soma logo, hamburger, search, purchase history, and account icons. The hamburger opens a terminal-style menu containing the existing News & Events, Products, Shop, and dropdown category links.
- Why it changed: The mobile navbar was taking up too much vertical screen space when scrolling and needed to keep primary actions visible while moving secondary navigation behind a menu.
- Validation done: Ran JavaScript syntax checks, whitespace diff checks, captured mobile closed/open menu previews at `390x844`, and smoke-tested all six main pages at `390x844` and `320x740` with a `70px` closed navbar and no horizontal overflow.

### 2026-07-30

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `js/device-recognition.js`, `SPRINT.md`
- What changed: Added the mobile hamburger button directly into every page's navbar HTML, assigned the shared menu list an explicit `soma-mobile-menu` ID, updated the device script to wire up an existing button instead of relying only on JavaScript injection, and cache-busted the mobile nav CSS/JS links with `mobile-menu-2`.
- Why it changed: The hamburger menu needed to appear reliably on mobile/deployed pages and clearly contain News & Events, Products, and Shop.
- Validation done: Ran JavaScript syntax checks, whitespace diff checks, captured local mobile closed/open previews showing the hamburger and terminal menu, and verified all six main pages render exactly one mobile hamburger with News & Events, Products, and Shop in the menu.

### 2026-07-30

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Reordered the mobile navbar so the hamburger button sits at the far right after the search, purchase-history, and account controls. Bumped the stylesheet cache tag to `mobile-menu-3`.
- Why it changed: The hamburger needed to sit flush at the right edge of the mobile navigation bar instead of between the logo and search.
- Validation done: Ran JavaScript syntax checks, whitespace diff checks, and local mobile previews at `390x844` and `320x740`; all six main pages kept a `70px` navbar, had no horizontal overflow, and placed the hamburger as the rightmost nav control.

### 2026-07-30

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `SPRINT.md`
- What changed: Moved the hamburger button markup after the search/cart/account group in every navbar and bumped both the stylesheet and device-recognition script references to `mobile-menu-4`.
- Why it changed: The Home page could still appear to use the old hamburger placement if a cached script or source order was being reused.
- Validation done: Ran JavaScript syntax checks, whitespace diff checks, captured a local Home mobile preview showing the hamburger at the far right, and verified all six main pages at `390x844` and `320x740` load `mobile-menu-4`, keep the hamburger after the icons, maintain a `70px` nav height, and avoid horizontal overflow.

### 2026-07-30

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Restyled the shared navbar, dropdown menus, search field, status popover, logo/icon glow, and mobile hamburger/menu panel with the archive terminal palette: dark teal/black glass, mint borders, cyan highlights, scanline texture, and terminal-style glow. Bumped the shared stylesheet reference to `archive-nav-1`.
- Why it changed: The navigation bar needed to share the same color and visual aesthetic as the News & Events archive terminal.
- Validation done: Ran JavaScript syntax checks, whitespace diff checks, desktop navbar render verification, and mobile checks across all six main pages. Confirmed the hamburger remains right-aligned, the mobile menu opens with News & Events, Products, and Shop, and the navbar/menu use the archive terminal colors without horizontal overflow.

### 2026-08-04

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Enlarged the Home page second-slide SomaCloud image, shifted its image stage left closer to the text panels, increased its height cap, and bumped the shared stylesheet reference to `home-slide2-1`.
- Why it changed: The second Home carousel slide needed the photo to feel bigger and more connected to the surrounding text.
- Validation done: Ran desktop Home slide 2 browser preview, mobile `390x844` sanity check, JavaScript syntax check, and whitespace diff check. Confirmed the larger/left-shifted image stays behind the text, the page has no horizontal overflow, and the mobile navbar remains 70px tall with the hamburger right-aligned.

### 2026-08-04

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Doubled the Home page second-slide SomaCloud image scale, changed the image stage to anchor from the left edge, and bumped the shared stylesheet reference to `home-slide2-2`.
- Why it changed: The SomaCloud photo needed to become about two times larger while keeping the same distance from the text that the previous version had.
- Validation done: Ran desktop Home slide 2 browser preview, JavaScript syntax check, and whitespace diff check. Confirmed the image left edge stayed at the previous preview position, the image height doubled, the visible photo is much larger, and the page has no horizontal overflow.

### 2026-08-04

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Increased the desktop Home page second-slide SomaCloud image size again, moved the image stage left from `28.5%` to `25%`, increased the desktop image width/height caps, and bumped the shared stylesheet reference to `home-slide2-3`.
- Why it changed: The desktop second-slide photo needed to be bigger and sit a little closer to the text after returning focus to the computer browser view.
- Validation done: Ran desktop Home slide 2 browser preview, JavaScript syntax check, and whitespace diff check. Confirmed the image moved about `45px` farther left toward the text, grew larger, stayed behind the copy, and introduced no horizontal overflow.

### 2026-08-04

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Doubled the current desktop Home page second-slide SomaCloud image width and height caps again while keeping the `25%` left image-stage anchor, then bumped the shared stylesheet reference to `home-slide2-4`.
- Why it changed: The desktop photo needed to become about two times larger from its current placement without changing its latest distance from the text.
- Validation done: Ran desktop Home slide 2 browser preview, JavaScript syntax check, and whitespace diff check. Confirmed the image left edge stayed at the current `25%` anchor, the rendered image grew about `1.86x` in width and height, and the page introduced no horizontal overflow.

### 2026-08-04

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Reduced the current desktop Home page second-slide SomaCloud image width and height caps by about `1.5x` while preserving the `25%` left image-stage anchor, then bumped the shared stylesheet reference to `home-slide2-5`.
- Why it changed: The current SomaCloud photo had become too large and needed to be scaled down without changing its distance from the text.
- Validation done: Ran desktop Home slide 2 browser preview, JavaScript syntax check, and whitespace diff check. Confirmed the image stayed at the same left anchor, rendered at about `0.66x` of the previous size, stayed behind the copy, and introduced no horizontal overflow.

### 2026-08-17

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Reduced the desktop Home page second-slide SomaCloud image width and height caps by `2x`, moved the image-stage anchor left from `25%` to `22.5%`, and bumped the shared stylesheet reference to `home-slide2-6`.
- Why it changed: The second Home carousel slide needed the photo smaller while also sitting slightly closer to the text.
- Validation done: Ran desktop Home slide 2 browser preview, JavaScript syntax check, and whitespace diff check. Confirmed the image rendered at `0.5x` of the previous size, moved `32px` left toward the text, stayed behind the copy, and introduced no horizontal overflow.

### 2026-08-18

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Restored the Home first-slide Eidolon-frame position, moved the Home second-slide SomaCloud foreground image slightly left and down, and bumped the shared stylesheet reference to `home-slide2-align-1`.
- Why it changed: The alignment request was intended for the second Home carousel slide so the sharper SomaCloud photo overlaps the matching grey server-room detail in the homepage background.
- Validation done: Captured desktop Home slide 2 previews at `1280x720` and `1920x1080`, checked that there was no horizontal overflow, ran JavaScript syntax checks for the site scripts, and ran `git diff --check`.

### 2026-08-19

- Pages/files changed: `index.html`, `events.html`, `prod.html`, `shop.html`, `account.html`, `purchase-history.html`, `css/style.css`, `SPRINT.md`
- What changed: Moved the Home second-slide SomaCloud foreground image slightly right by shifting its desktop image-stage anchor from `20%` to `22%`, then bumped the shared stylesheet reference to `home-slide2-align-2`.
- Why it changed: The second Home carousel slide photo needed to sit a little farther right after the previous overlap/alignment pass.
- Validation done: Captured desktop Home slide 2 previews, checked that the page kept zero horizontal overflow, ran JavaScript syntax checks for the site scripts, and ran `git diff --check`.

## Change-log format for future updates

When the website changes, add a short note here:

- Date
- Pages/files changed
- What changed
- Why it changed
- Validation done
