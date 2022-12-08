import type { Processes } from "contexts/process/types";
import dynamic from "next/dynamic";
import { FOLDER_ICON, TASKBAR_HEIGHT } from "utils/constants";

const directory: Processes = {
  BoxedWine: {
    Component: dynamic(() => import("components/apps/BoxedWine")),
    allowResizing: false,
    backgroundColor: "#000",
    defaultSize: {
      height: 480,
      width: 640,
    },
    icon: "/System/Icons/boxedwine.webp",
    libs: [
      "/Program Files/BoxedWine/browserfs.boxedwine.js",
      "/Program Files/BoxedWine/jszip.min.js",
      "/Program Files/BoxedWine/boxedwine-shell.js",
      "/Program Files/BoxedWine/boxedwine.js",
    ],
    lockAspectRatio: true,
    singleton: true,
    title: "BoxedWine",
  },
  Browser: {
    Component: dynamic(() => import("components/apps/Browser")),
    backgroundColor: "#FFF",
    defaultSize: {
      height: 480,
      width: 640,
    },
    icon: "/System/Icons/chromium.webp",
    title: "Browser",
  },
  ClassiCube: {
    Component: dynamic(() => import("components/apps/ClassiCube")),
    backgroundColor: "#201E20",
    defaultSize: {
      height: 420,
      width: 640,
    },
    hideMaximizeButton: true,
    icon: "/System/Icons/classicube.webp",
    libs: ["/Program Files/ClassiCube/ClassiCube.js"],
    title: "ClassiCube",
  },
  DXBall: {
    Component: dynamic(() => import("components/apps/DX-Ball")),
    backgroundColor: "#000",
    defaultSize: {
      height: 480,
      width: 640,
    },
    icon: "/System/Icons/dxball.webp",
    libs: ["/Program Files/DX-Ball/game.js"],
    lockAspectRatio: true,
    title: "DX-Ball",
  },
  DevTools: {
    Component: dynamic(() => import("components/apps/DevTools")),
    backgroundColor: "#242424",
    defaultSize: {
      height: 380,
      width: 545,
    },
    icon: "/System/Icons/eruda.webp",
    libs: [
      "/Program Files/Eruda/eruda.js",
      "/Program Files/Eruda/eruda-dom.js",
    ],
    singleton: true,
    title: "DevTools",
  },
  Emulator: {
    Component: dynamic(() => import("components/apps/Emulator")),
    backgroundColor: "#000",
    defaultSize: {
      height: 400,
      width: 600,
    },
    icon: "/System/Icons/emulator.webp",
    lockAspectRatio: true,
    singleton: true,
    title: "Emulator",
  },
  FileExplorer: {
    Component: dynamic(() => import("components/apps/FileExplorer")),
    backgroundColor: "#202020",
    icon: FOLDER_ICON,
    title: "File Explorer",
  },
  IRC: {
    Component: dynamic(() => import("components/apps/IRC")),
    backgroundColor: "#FFF",
    defaultSize: {
      height: 512,
      width: 704,
    },
    icon: "/System/Icons/kiwiirc.webp",
    libs: ["Program Files/kiwiirc/index.html"],
    title: "IRC",
  },
  JSDOS: {
    Component: dynamic(() => import("components/apps/JSDOS")),
    autoSizing: true,
    backgroundColor: "#000",
    defaultSize: {
      height: 200,
      width: 320,
    },
    icon: "/System/Icons/jsdos.webp",
    libs: [
      "/Program Files/js-dos/emulators.js",
      "/Program Files/js-dos/emulators-ui.js",
    ],
    lockAspectRatio: true,
    title: "js-dos v7",
  },
  Marked: {
    Component: dynamic(() => import("components/apps/Marked")),
    backgroundColor: "#FFF",
    defaultSize: {
      height: 480,
      width: 560,
    },
    icon: "/System/Icons/marked.webp",
    libs: [
      "/Program Files/Marked/marked.min.js",
      "/Program Files/Marked/purify.min.js",
    ],
    title: "Marked",
  },
  MonacoEditor: {
    Component: dynamic(() => import("components/apps/MonacoEditor")),
    backgroundColor: "#1E1E1E",
    defaultSize: {
      height: 480,
      width: 544,
    },
    icon: "/System/Icons/monaco.webp",
    title: "Monaco Editor",
  },
  PDF: {
    Component: dynamic(() => import("components/apps/PDF")),
    backgroundColor: "#525659",
    defaultSize: {
      height: 480,
      width: 640,
    },
    icon: "/System/Icons/pdf.webp",
    libs: ["/Program Files/PDF.js/pdf.js"],
    title: "PDF",
  },
  Paint: {
    Component: dynamic(() => import("components/apps/Paint")),
    backgroundColor: "#808080",
    defaultSize: {
      height: 480,
      width: 640,
    },
    icon: "/System/Icons/paint.webp",
    libs: ["Program Files/jspaint/index.html"],
    title: "Paint",
  },
  Photos: {
    Component: dynamic(() => import("components/apps/Photos")),
    backgroundColor: "#222",
    defaultSize: {
      height: 432,
      width: 576,
    },
    hideTitlebarIcon: true,
    icon: "/System/Icons/photos.webp",
    title: "Photos",
  },
  Ruffle: {
    Component: dynamic(() => import("components/apps/Ruffle")),
    backgroundColor: "#000",
    defaultSize: {
      height: 400,
      width: 550,
    },
    icon: "/System/Icons/ruffle.webp",
    libs: ["/Program Files/Ruffle/ruffle.js"],
    lockAspectRatio: true,
    title: "Ruffle",
  },
  Run: {
    Component: dynamic(() => import("components/system/Dialogs/Run")),
    allowResizing: false,
    defaultSize: {
      height: 174,
      width: 397,
    },
    hideMaximizeButton: true,
    hideMinimizeButton: true,
    icon: "/System/Icons/run.webp",
    initialRelativePosition: {
      bottom: TASKBAR_HEIGHT + 11,
      left: 15,
    },
    singleton: true,
    title: "Run",
  },
  SpaceCadet: {
    Component: dynamic(() => import("components/apps/SpaceCadet")),
    backgroundColor: "#000",
    defaultSize: {
      height: 428,
      width: 600,
    },
    icon: "/System/Icons/pinball.webp",
    libs: ["/Program Files/SpaceCadet/SpaceCadetPinball.js"],
    lockAspectRatio: true,
    singleton: true,
    title: "Space Cadet",
  },
  Terminal: {
    Component: dynamic(() => import("components/apps/Terminal")),
    backgroundColor: "rgba(12, 12, 12, 0.5)",
    defaultSize: {
      height: 340,
      width: 553,
    },
    icon: "/System/Icons/xterm.webp",
    libs: [
      "/Program Files/Xterm.js/xterm.css",
      "/Program Files/Xterm.js/xterm.js",
      "/Program Files/Xterm.js/xterm-addon-fit.js",
      "/Program Files/Xterm.js/local-echo.js",
    ],
    title: "Terminal",
  },
  TinyMCE: {
    Component: dynamic(() => import("components/apps/TinyMCE")),
    backgroundColor: "#FFF",
    defaultSize: {
      height: 480,
      width: 640,
    },
    icon: "/System/Icons/tinymce.webp",
    libs: ["/Program Files/TinyMCE/tinymce.min.js"],
    singleton: true,
    title: "TinyMCE",
  },
  Transfer: {
    Component: dynamic(() => import("components/system/Dialogs/Transfer")),
    allowResizing: false,
    backgroundColor: "#FFF",
    defaultSize: {
      height: 163,
      width: 400,
    },
    icon: "/System/Icons/copying.webp",
    title: "Copying...",
  },
  V86: {
    Component: dynamic(() => import("components/apps/V86")),
    allowResizing: false,
    autoSizing: true,
    backgroundColor: "#000",
    defaultSize: {
      height: 200,
      width: 320,
    },
    icon: "/System/Icons/v86.webp",
    libs: ["/Program Files/Virtual x86/libv86.js"],
    title: "Virtual x86",
  },
  VideoPlayer: {
    Component: dynamic(() => import("components/apps/VideoPlayer")),
    autoSizing: true,
    backgroundColor: "#000",
    icon: "/System/Icons/vlc.webp",
    libs: [
      "/Program Files/Video.js/video-js.min.css",
      "/Program Files/Video.js/video.min.js",
      "/Program Files/Video.js/Youtube.min.js",
    ],
    title: "Video Player",
  },
  Vim: {
    Component: dynamic(() => import("components/apps/Vim")),
    allowResizing: false,
    backgroundColor: "#222324",
    defaultSize: {
      height: 448,
      width: 595,
    },
    icon: "/System/Icons/vim.webp",
    libs: ["/Program Files/Vim.js/vim.js"],
    singleton: true,
    title: "Vim",
  },
  Webamp: {
    Component: dynamic(() => import("components/apps/Webamp")),
    allowResizing: false,
    hasWindow: false,
    icon: "/System/Icons/webamp.webp",
    libs: ["/Program Files/Webamp/webamp.bundle.min.js"],
    singleton: true,
    title: "Webamp",
  },
};

export default directory;
