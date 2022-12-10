// const libs = ["/System/Matrix/js/regl/main.js"];

declare global {
  interface Window {
    Tartan: (canvas: HTMLCanvasElement) => Promise<void>;
  }
}

const Tartan = async (el?: HTMLElement | null): Promise<void> => {
  if (!el) return;

  const canvas = document.createElement("canvas");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const canvasContext = canvas.getContext("2d");

  canvasContext.fillStyle = "orange";

  const elem = new HTMLElement();
  elem.innerHTML = "hello";
  canvas.append(elem);

  // eslint-disable-next-line no-console
  console.log("canvas", canvas);

  el.append(canvas);

  await window.Tartan?.(canvas).then(() => {
    // eslint-disable-next-line no-console
    console.log("appended", window.Tartan);
  });

  // await loadFiles(libs, undefined, undefined, true);

  // await window.Tartan?.(canvas, { ...matrixConfig, ...config });
};

export default Tartan;
