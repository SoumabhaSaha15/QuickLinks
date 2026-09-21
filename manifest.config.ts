import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json' with {type: "json"};

export default defineManifest({
  manifest_version: 3,
  name: "QuickLinks",
  description: pkg.description,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
  },
  "background": {
    service_worker: "src/background.ts",
    type: "module"
  },
  permissions: [
    "contextMenus",
    'sidePanel',
    'storage',
  ],
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
})
