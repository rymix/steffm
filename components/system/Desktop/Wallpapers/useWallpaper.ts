import {
  BASE_CANVAS_SELECTOR,
  cssFit,
  WALLPAPER_PATHS,
  WALLPAPER_WORKERS,
} from "components/system/Desktop/Wallpapers/constants";
import type { WallpaperConfig } from "components/system/Desktop/Wallpapers/types";
import { config as vantaCloudsConfig } from "components/system/Desktop/Wallpapers/vantaClouds/config";
import { config as vantaWavesConfig } from "components/system/Desktop/Wallpapers/vantaWaves/config";
import { useFileSystem } from "contexts/fileSystem";
import { useSession } from "contexts/session";
import useWorker from "hooks/useWorker";
import { useCallback, useEffect } from "react";
import { HIGH_PRIORITY_REQUEST } from "utils/constants";
import {
  bufferToUrl,
  cleanUpBufferUrl,
  createOffscreenCanvas,
} from "utils/functions";

declare global {
  interface Window {
    WallpaperDestroy: () => void;
  }
}

const WALLPAPER_WORKER_NAMES = Object.keys(WALLPAPER_WORKERS);

const useWallpaper = (
  desktopRef: React.MutableRefObject<HTMLElement | null>
): void => {
  const { exists, readFile } = useFileSystem();
  const { sessionLoaded, setWallpaper, wallpaperImage, wallpaperFit } =
    useSession();
  const [wallpaperName] = wallpaperImage.split(" ");
  const vantaWireframe = wallpaperImage === "VANTA WIREFRAME";
  const wallpaperWorker = useWorker<void>(
    WALLPAPER_WORKERS[wallpaperName],
    undefined,
    vantaWireframe ? "Wireframe" : ""
  );
  const resizeListener = useCallback(() => {
    if (!desktopRef.current) return;

    const desktopRect = desktopRef.current.getBoundingClientRect();

    wallpaperWorker.current?.postMessage(desktopRect);

    const canvasElement =
      desktopRef.current.querySelector(BASE_CANVAS_SELECTOR);

    if (canvasElement instanceof HTMLCanvasElement) {
      canvasElement.style.width = `${desktopRect.width}px`;
      canvasElement.style.height = `${desktopRect.height}px`;
    }
  }, [desktopRef, wallpaperWorker]);
  const loadWallpaper = useCallback(() => {
    if (desktopRef.current) {
      let config: WallpaperConfig | undefined;

      if (wallpaperName === "VANTAWAVES") {
        config = { ...vantaWavesConfig };
        vantaWavesConfig.material.options.wireframe = vantaWireframe;
      } else if (wallpaperName === "VANTACLOUDS") {
        config = { ...vantaCloudsConfig };
      } else if (wallpaperImage === "MATRIX 3D") {
        config = { volumetric: true };
      }

      desktopRef.current.setAttribute("style", "");
      desktopRef.current.querySelector(BASE_CANVAS_SELECTOR)?.remove();

      window.WallpaperDestroy?.();

      if (window.OffscreenCanvas !== undefined && wallpaperWorker.current) {
        console.log("Offscreen is true");
        const offscreen = createOffscreenCanvas(desktopRef.current);

        wallpaperWorker.current.postMessage(
          { canvas: offscreen, config, devicePixelRatio: 2 },
          [offscreen]
        );

        window.removeEventListener("resize", resizeListener);
        window.addEventListener("resize", resizeListener, { passive: true });
      } else if (WALLPAPER_PATHS[wallpaperName]) {
        console.log("Direct wallpaper is true");
        WALLPAPER_PATHS[wallpaperName]().then(({ default: wallpaper }) =>
          wallpaper?.(desktopRef.current, config)
        );
      } else {
        setWallpaper("VANTACLOUDS");
      }

      console.log("wallpaperName", wallpaperName);
    }
  }, [
    desktopRef,
    resizeListener,
    setWallpaper,
    vantaWireframe,
    wallpaperImage,
    wallpaperName,
    wallpaperWorker,
  ]);
  const loadFileWallpaper = useCallback(async () => {
    const [, currentWallpaperUrl] =
      desktopRef.current?.style.backgroundImage.match(/"(.*?)"/) || [];

    if (currentWallpaperUrl === wallpaperImage) return;
    if (currentWallpaperUrl) cleanUpBufferUrl(currentWallpaperUrl);
    desktopRef.current?.setAttribute("style", "");
    desktopRef.current?.querySelector(BASE_CANVAS_SELECTOR)?.remove();

    let wallpaperUrl = "";
    const fallbackBackground = "";
    const newWallpaperFit = wallpaperFit;

    if (await exists(wallpaperImage)) {
      wallpaperUrl = bufferToUrl(await readFile(wallpaperImage));
    }

    if (wallpaperUrl) {
      const wallpaperStyle = (url: string): string => `
        background-image: url(${url});
        ${cssFit[newWallpaperFit]}
      `;

      if (fallbackBackground) {
        fetch(wallpaperUrl, {
          ...HIGH_PRIORITY_REQUEST,
          mode: "no-cors",
        })
          .then(({ ok }) => {
            if (!ok) throw new Error("Failed to load url");

            desktopRef.current?.setAttribute(
              "style",
              wallpaperStyle(wallpaperUrl)
            );
          })
          .catch(() =>
            desktopRef.current?.setAttribute(
              "style",
              wallpaperStyle(fallbackBackground)
            )
          );
      } else {
        desktopRef.current?.setAttribute("style", wallpaperStyle(wallpaperUrl));
      }
    } else {
      loadWallpaper();
    }
  }, [
    desktopRef,
    exists,
    loadWallpaper,
    readFile,
    wallpaperFit,
    wallpaperImage,
  ]);

  useEffect(() => {
    if (sessionLoaded) {
      if (wallpaperName && !WALLPAPER_WORKER_NAMES.includes(wallpaperName)) {
        loadFileWallpaper().catch(loadWallpaper);
      } else {
        loadWallpaper();
      }
    }
  }, [loadFileWallpaper, loadWallpaper, sessionLoaded, wallpaperName]);
};

export default useWallpaper;
