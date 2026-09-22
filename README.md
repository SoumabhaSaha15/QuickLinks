![preview](/screenshots/image.png)
---

# QuickLinks

## An MV3 browser extension (chromium) for saving and accessing quick links on the go.

> Built using **CRXJS**.

> **Vite** as the build tool.

> Styled using **tailwindcss-v4** and **daisy-ui-v5**.

> **React 19+** UI library.

> Leverages the chrome **side-panel** API.

> Pin any site using the **context menu**.

> Import / export pinned sites across any **chromium browser**.

> Changes **theme** (light/dark) according to the **system settings**.

---

## Usage

- Click the QuickLinks toolbar icon to open the side panel.
- Right-click anywhere on a page and choose **"Pin this site"** to save it.
- Click a pinned site in the side panel to open it in a new tab.
- Use the **export** button to download your pinned sites as JSON, and the **import** button to restore them (on any chromium browser).

## Installation guide

```txt
Clone the repo (or download and unzip it).
->
Install packages using pnpm [preferred].
  pnpm install
->
Open a terminal and run:
  pnpm build
->
Open the browser and click on `manage extensions`.
->
Turn on developer mode.
->
Click load unpacked.
->
Choose the dist folder inside the root of the project.
->
Pin the installed extension.
```
