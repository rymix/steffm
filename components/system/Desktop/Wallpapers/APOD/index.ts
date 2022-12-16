import apodConfig from "components/system/Desktop/Wallpapers/Tartan/config";
import config from "next/config";

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

  window.Apod = (div: HTMLElement): Promise<void> => {
    const styleContainer = document.createElement("div");
    styleContainer.innerHTML =
      "<p style='color: white'>fartsfartsfartsfartsfartsfartsfartsfartsfartsfartsfarts</p>";
    div.append(styleContainer);

    return Promise.resolve();
  };

  await window.Apod?.(apodContainer, { ...apodConfig, ...config });
};

export default Apod;

// const [, currentUrl, currentDate] = wallpaperImage.split(" ");
// const [month, , day, , year] = new Intl.DateTimeFormat("en-US", {
//   timeZone: "US/Eastern",
// })
//   .formatToParts(Date.now())
//   .map(({ value }) => value);

// if (currentDate === `${year}-${month}-${day}`) {
//   wallpaperUrl = currentUrl;
// } else {
//   const {
//     date = "",
//     hdurl = "",
//     url = "",
//   } = await jsonFetch(
//     "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
//   );

//   if (hdurl || url) {
//     wallpaperUrl = ((viewWidth() > 1024 ? hdurl : url) || url) as string;
//     newWallpaperFit = "fit";

//     if (isYouTubeUrl(wallpaperUrl)) {
//       const ytBaseUrl = `https://i.ytimg.com/vi/${getYouTubeUrlId(
//         wallpaperUrl
//       )}`;

//       wallpaperUrl = `${ytBaseUrl}/maxresdefault.jpg`;
//       fallbackBackground = `${ytBaseUrl}/hqdefault.jpg`;
//     } else if (hdurl && url && hdurl !== url) {
//       fallbackBackground = (wallpaperUrl === url ? hdurl : url) as string;
//     }

//     const newWallpaperImage = `APOD ${wallpaperUrl} ${date as string}`;

//     if (newWallpaperImage !== wallpaperImage) {
//       setWallpaper(newWallpaperImage, newWallpaperFit);
//       setTimeout(loadWallpaper, MILLISECONDS_IN_DAY);
//     }
//   }
// }
