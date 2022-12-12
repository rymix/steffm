import { loadFiles } from "utils/functions";

const libs = ["/System/Tartan/plaid.js"];

declare global {
  interface Window {
    Tartan: (div: HTMLDivElement) => Promise<void>;
  }
}

const Tartan = async (el?: HTMLDivElement | null): Promise<void> => {
  if (!el) return;

  const tartanContainer = document.createElement("div");
  tartanContainer.setAttribute("id", "tartanContainer");
  tartanContainer.setAttribute(
    "style",
    `position: absolute; top: 0; left: 0; height: ${window.innerHeight}px; width: ${window.innerWidth}px; z-index: -1;`
  );

  el.append(tartanContainer);
  await loadFiles(libs, undefined, undefined, true);
  await window.Tartan?.(tartanContainer);
};

export default Tartan;
