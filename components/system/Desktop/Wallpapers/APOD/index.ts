import apodConfig from "components/system/Desktop/Wallpapers/Tartan/config";
import config from "next/config";
import { jsonFetch, viewWidth } from "utils/functions";

declare global {
  interface Window {
    Apod: (div: HTMLDivElement, conf: typeof apodConfig) => Promise<void>;
  }
}

const Apod = async (el?: HTMLElement | null): Promise<void> => {
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

  window.Apod = async (div: HTMLElement): Promise<void> => {
    let wallpaperUrl;
    const {
      date = "",
      hdurl = "",
      url = "",
    } = await jsonFetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");

    if (hdurl || url) {
      wallpaperUrl = ((viewWidth() > 1024 ? hdurl : url) || url) as string;
      const newWallpaperImage = `APOD ${wallpaperUrl} ${date as string}`;
      const styleContainer = document.createElement("div");
      styleContainer.innerHTML = `<img src=${wallpaperUrl} alt=${newWallpaperImage} />`;
      div.append(styleContainer);
    }
  };

  await window.Apod?.(apodContainer, { ...apodConfig, ...config });
};

export default Apod;
