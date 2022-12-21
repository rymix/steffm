import apodConfig from "components/system/Desktop/Wallpapers/APOD/config";
import type { WallpaperConfig } from "components/system/Desktop/Wallpapers/types";
import { jsonFetch, viewWidth } from "utils/functions";

declare global {
  interface Window {
    Apod: (div: HTMLDivElement, config: typeof apodConfig) => Promise<void>;
  }
}

const Apod = async (
  el?: HTMLElement | null,
  config: WallpaperConfig = {} as WallpaperConfig
): Promise<void> => {
  if (!el) return;

  const previousApodContainer = window.document.querySelector("#apodContainer");
  if (previousApodContainer !== null) {
    previousApodContainer.outerHTML = "";
  }
  const previousTartanContainer =
    window.document.querySelector("#tartanContainer");
  if (previousTartanContainer !== null) {
    previousTartanContainer.outerHTML = "";
  }

  const apodContainer = document.createElement("div");
  apodContainer.setAttribute("id", "apodContainer");
  apodContainer.setAttribute(
    "style",
    `position: absolute; top: 0; left: 0; height: ${window.innerHeight}px; width: ${window.innerWidth}px; z-index: -1;`
  );

  el.append(apodContainer);

  window.Apod = (div: HTMLElement, conf): Promise<void> => {
    const RESIZE_REDRAW_TIME = conf.resizeRedrawTime;

    const initApod = async (): Promise<void> => {
      let wallpaperUrl;
      const {
        date = "",
        hdurl = "",
        url = "",
      } = await jsonFetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
      );

      if (hdurl || url) {
        wallpaperUrl = ((viewWidth() > 1024 ? hdurl : url) || url) as string;
        const image = new Image();
        image.src = wallpaperUrl;
        image.addEventListener("load", () => {
          console.log(image.height);
          console.log(image.width);
        });
        const newWallpaperImage = `APOD ${wallpaperUrl} ${date as string}`;
        const imgContainer = document.createElement("div");
        imgContainer.setAttribute("id", "imgContainer");
        imgContainer.innerHTML = `<img src=${image.src} alt=${newWallpaperImage} />`;
        div.append(imgContainer);
      }

      // eslint-disable-next-line consistent-return, unicorn/no-useless-promise-resolve-reject
      return Promise.resolve();
    };

    let debounce: ReturnType<typeof setTimeout>;
    const resize = (): void => {
      clearTimeout(debounce);
      const previousImgContainer =
        window.document.querySelector("#imgContainer");
      if (previousImgContainer !== null) {
        previousImgContainer.outerHTML = "";
      }
      debounce = setTimeout(initApod, RESIZE_REDRAW_TIME);
    };
    window.addEventListener("resize", resize);

    initApod();

    // eslint-disable-next-line consistent-return, unicorn/no-useless-promise-resolve-reject
    return Promise.resolve();
  };

  await window.Apod?.(apodContainer, { ...apodConfig, ...config });
};

export default Apod;
