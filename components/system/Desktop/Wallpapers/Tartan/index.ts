// const libs = ["/System/Matrix/js/regl/main.js"];

declare global {
  interface Window {
    Tartan: (canvas: HTMLCanvasElement) => Promise<void>;
  }
}

// const Tartan = (el?: HTMLElement | null): Promise<void> => {
//   if (!el) return;

//   const canvas = document.createElement("canvas");

//   canvas.height = window.innerHeight;
//   canvas.width = window.innerWidth;

//   // const canvasContext = canvas.getContext("2d");
//   // canvasContext.fillStyle = "blue";

//   el.append(canvas);

//   // await loadFiles(libs, undefined, undefined, true);

//   // await window.Tartan?.(canvas, { ...matrixConfig, ...config });
// };

const Tartan = (el?: HTMLElement | null): void => {
  // eslint-disable-next-line no-console
  console.log("hello", el);
};

export default Tartan;
