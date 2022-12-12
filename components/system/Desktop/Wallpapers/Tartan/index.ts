// const libs = ["/System/Matrix/js/regl/main.js"];

declare global {
  interface Window {
    Tartan: (div: HTMLDivElement) => Promise<void>;
  }
}

const Tartan = async (el?: HTMLDivElement | null): Promise<void> => {
  if (!el) return;

  const tartanContainer = document.createElement("div");
  tartanContainer.setAttribute(
    "style",
    `background-color: red; position: absolute; top: 0; left: 0; height: ${window.innerHeight}px; width: ${window.innerWidth}px; z-index: -1;`
  );
  // tartanContainer.setAttribute("style", `height: ${window.innerHeight}`);
  tartanContainer.innerHTML =
    "<p>FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br />FARTS<br /></p>";

  // tartanContainer.height = window.innerHeight;
  // tartanContainer.width = window.innerWidth;

  console.log("el", el);
  console.log("tartanContainer", tartanContainer);

  el.append(tartanContainer);
  // document.body.append(tartanContainer);

  // await loadFiles(libs, undefined, undefined, true);

  // await window.Tartan?.(canvas, { ...matrixConfig, ...config });
};

export default Tartan;
