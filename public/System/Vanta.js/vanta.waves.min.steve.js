(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["_vantaEffect"] = factory();
	else
		root["_vantaEffect"] = factory();
})(typeof self !== 'undefined' ? self : this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ vanta_waves)
});

;// CONCATENATED MODULE: ./src/helpers.js
Number.prototype.clamp = function(min, max) { return Math.min(Math.max(this, min), max) }

// # module.exports = helpers

function mobileCheck(){
  if (typeof navigator !== 'undefined') {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || globalThis.innerWidth < 600
  }
  return null
}
const sample = items => items[Math.floor(Math.random()*items.length)]

function rn(start,end) {
  if (start == null) start = 0
  if (end == null) end = 1
  return start + (Math.random() * (end - start))
}

function ri(start,end) {
  if (start == null) start = 0
  if (end == null) end = 1
  return Math.floor(start + (Math.random() * ((end - start) + 1)))
}

const q = sel => document.querySelector(sel)

const color2Hex = (color) => {
  if (typeof color == 'number'){
    return '#' +  ('00000' + color.toString(16)).slice(-6)
  } else return color
}

const color2Rgb = (color, alpha=1) => {
  const hex = color2Hex(color)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const obj = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null
  return 'rgba('+ obj.r +','+ obj.g +','+ obj.b +','+ alpha +')'
}

const getBrightness = (threeColor) => {
  return (0.299 * threeColor.r) + (0.587 * threeColor.g) + (0.114 * threeColor.b);
}

function clearThree(obj) {
  // https://stackoverflow.com/questions/30359830/how-do-i-clear-three-js-scene/48722282
  while (obj.children && obj.children.length > 0) {
    clearThree(obj.children[0])
    obj.remove(obj.children[0])
  }
  if (obj.geometry) obj.geometry.dispose()
  if (obj.material) { // in case of map, bumpMap, normalMap, envMap ...
    Object.keys(obj.material).forEach(prop => {
      if (!obj.material[prop]) return
      if (obj.material[prop] !== null && typeof obj.material[prop].dispose === 'function') {
        obj.material[prop].dispose()
      }
    })
    obj.material.dispose()
  }
}
;// CONCATENATED MODULE: ./src/_base.js

// const DEBUGMODE = globalThis.location.toString().indexOf('VANTADEBUG') !== -1

const win = typeof globalThis == 'object'
let THREE = (win && globalThis.THREE) || {}
if (win && !globalThis.VANTA) globalThis.VANTA = {}
const VANTA = (win && globalThis.VANTA) || {}
VANTA.register = (name, Effect) => {
  return VANTA[name] = (opts) => new Effect(opts)
}
VANTA.version = '0.5.24'



// const ORBITCONTROLS = {
//   enableZoom: false,
//   userPanSpeed: 3,
//   userRotateSpeed: 2.0,
//   maxPolarAngle: Math.PI * 0.8, // (pi/2 is pure horizontal)
//   mouseButtons: {
//     ORBIT: THREE.MOUSE.LEFT,
//     ZOOM: null,
//     PAN: null
//   }
// }
// if (DEBUGMODE) {
//   Object.assign(ORBITCONTROLS, {
//     enableZoom: true,
//     zoomSpeed: 4,
//     minDistance: 100,
//     maxDistance: 4500
//   })
// }

// Namespace for errors
const error = function() {
  Array.prototype.unshift.call(arguments, '[VANTA]')
  return console.error.apply(this, arguments)
}

VANTA.VantaBase = class VantaBase {
  constructor(userOptions = {}) {
    if (!win) return false
    VANTA.current = this
    this.windowMouseMoveWrapper = this.windowMouseMoveWrapper.bind(this)
    this.windowTouchWrapper = this.windowTouchWrapper.bind(this)
    this.windowGyroWrapper = this.windowGyroWrapper.bind(this)
    this.resize = this.resize.bind(this)
    this.animationLoop = this.animationLoop.bind(this)
    this.restart = this.restart.bind(this)

    const defaultOptions = (typeof this.getDefaultOptions === 'function') ? this.getDefaultOptions() : this.defaultOptions
    this.options = Object.assign({
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
    }, defaultOptions)

    if ((typeof HTMLElement !== "undefined" && userOptions instanceof HTMLElement) || typeof userOptions === 'string') {
      userOptions = {el: userOptions}
    }
    Object.assign(this.options, userOptions)

    if (this.options.THREE) {
      THREE = this.options.THREE // Optionally use a custom build of three.js
    }

    // Set element
    if (!this.options.canvas) {
      this.el = this.options.el
      if (this.el == null) {
        error("Instance needs \"el\" param!")
      } else if (typeof HTMLElement !== "undefined" && !(this.options.el instanceof HTMLElement)) {
        const selector = this.el
        this.el = q(selector)
        if (!this.el) {
          error("Cannot find element", selector)
          return
        }
      }

      this.prepareEl()
    }
    this.initThree()
    this.setSize() // Init needs size

    try {
      this.init()
    } catch (e) {
      // FALLBACK - just use color
      error('Init error', e)
      if (!this.options.canvas) {
          if (this.renderer && this.renderer.domElement) {
            this.el.removeChild(this.renderer.domElement)
          }
          if (this.options.backgroundColor) {
            console.log('[VANTA] Falling back to backgroundColor')
            this.el.style.background = color2Hex(this.options.backgroundColor)
          }
      }
      return
    }

    // After init
    this.initMouse() // Triggers mouse, which needs to be called after init
    this.resize()
    this.animationLoop()

    globalThis.requestAnimationFrame(this.resize) // Force a resize after the first frame

    if (typeof window !== "undefined") {
        // Event listeners
        const ad = window.addEventListener
        ad('resize', this.resize)
  
        // Add event listeners on window, because this element may be below other elements, which would block the element's own mousemove event
        if (this.options.mouseControls) {
          ad('scroll', this.windowMouseMoveWrapper)
          ad('mousemove', this.windowMouseMoveWrapper)
        }
        if (this.options.touchControls) {
          ad('touchstart', this.windowTouchWrapper)
          ad('touchmove', this.windowTouchWrapper)
        }
        if (this.options.gyroControls) {
          ad('deviceorientation', this.windowGyroWrapper)
        }
    }
  }

  setOptions(userOptions={}){
    Object.assign(this.options, userOptions)
    this.triggerMouseMove()
  }

  prepareEl() {
    let i, child
    // wrapInner for text nodes, so text nodes can be put into foreground
    if (typeof Node !== 'undefined' && Node.TEXT_NODE) {
      for (i = 0; i < this.el.childNodes.length; i++) {
        const n = this.el.childNodes[i]
        if (n.nodeType === Node.TEXT_NODE) {
          const s = document.createElement('span')
          s.textContent = n.textContent
          n.parentElement.insertBefore(s, n)
          n.remove()
        }
      }
    }
    // Set foreground elements
    for (i = 0; i < this.el.children.length; i++) {
      child = this.el.children[i]
      if (getComputedStyle(child).position === 'static') {
        child.style.position = 'relative'
      }
      if (getComputedStyle(child).zIndex === 'auto') {
        child.style.zIndex = 1
      }
    }
    // Set canvas and container style
    if (getComputedStyle(this.el).position === 'static') {
      this.el.style.position = 'relative'
    }
  }

  initThree() {
    if (!THREE.WebGLRenderer) {
      console.warn("[VANTA] No THREE defined on window")
      return
    }
    // Set renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      canvas: this.options.canvas,
      depth: false,
      stencil: false,
      powerPreference: "high-performance"
    })
    if (!this.options.canvas) {
        this.el.appendChild(this.renderer.domElement);
      } else {
        this.options.canvas.style = {
          height: this.options.canvas.height,
          width: this.options.canvas.width
        };
      }
    if (isNaN(this.options.backgroundAlpha)) {
      this.options.backgroundAlpha = 1
    }

    this.scene = new THREE.Scene()
  }

  getCanvasElement() {
    if (this.renderer) {
      return this.renderer.domElement // three.js
    }
    if (this.p5renderer) {
      return this.p5renderer.canvas // p5
    }
  }

  getCanvasRect() {
    const canvas = this.getCanvasElement()
    if (!canvas) return false
    return canvas.getBoundingClientRect()
  }

  windowMouseMoveWrapper(e){
    const rect = this.getCanvasRect()
    if (!rect) return false
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (x>=0 && y>=0 && x<=rect.width && y<=rect.height) {
      this.mouseX = x
      this.mouseY = y
      if (!this.options.mouseEase) this.triggerMouseMove(x, y)
    }
  }
  windowTouchWrapper(e){
    const rect = this.getCanvasRect()
    if (!rect) return false
    if (e.touches.length === 1) {
      const x = e.touches[0].clientX - rect.left
      const y = e.touches[0].clientY - rect.top
      if (x>=0 && y>=0 && x<=rect.width && y<=rect.height) {
        this.mouseX = x
        this.mouseY = y
        if (!this.options.mouseEase) this.triggerMouseMove(x, y)
      }
    }
  }
  windowGyroWrapper(e){
    const rect = this.getCanvasRect()
    if (!rect) return false
    const x = Math.round(e.alpha * 2) - rect.left
    const y = Math.round(e.beta * 2) - rect.top
    if (x>=0 && y>=0 && x<=rect.width && y<=rect.height) {
      this.mouseX = x
      this.mouseY = y
      if (!this.options.mouseEase) this.triggerMouseMove(x, y)
    }
  }

  triggerMouseMove(x, y) {
    if (x === undefined && y === undefined) { // trigger at current position
      if (this.options.mouseEase) {
        x = this.mouseEaseX
        y = this.mouseEaseY
      } else {
        x = this.mouseX
        y = this.mouseY
      }
    }
    if (this.uniforms) {
      this.uniforms.iMouse.value.x = x / this.scale // pixel values
      this.uniforms.iMouse.value.y = y / this.scale // pixel values
    }
    const xNorm = x / this.width // 0 to 1
    const yNorm = y / this.height // 0 to 1
    typeof this.onMouseMove === "function" ? this.onMouseMove(xNorm, yNorm) : void 0
  }

  setSize() {
    this.scale || (this.scale = 1)
    if (mobileCheck() && this.options.scaleMobile) {
      this.scale = this.options.scaleMobile
    } else if (this.options.scale) {
      this.scale = this.options.scale
    }
    this.width = Math.max((this.options.canvas ? this.options.canvas.width : this.el.offsetWidth), this.options.minWidth)
    this.height = Math.max((this.options.canvas ? this.options.canvas.height : this.el.offsetHeight), this.options.minHeight)
  }
  initMouse() {
    // Init mouseX and mouseY
    if ((!this.mouseX && !this.mouseY) ||
      (this.mouseX === this.options.minWidth/2 && this.mouseY === this.options.minHeight/2)) {
      this.mouseX = this.width/2
      this.mouseY = this.height/2
      this.triggerMouseMove(this.mouseX, this.mouseY)
    }
  }

  resize() {
    this.setSize()
    if (this.camera) {
      this.camera.aspect = this.width / this.height
      if (typeof this.camera.updateProjectionMatrix === "function") {
        this.camera.updateProjectionMatrix()
      }
    }
    if (this.renderer) {
      this.renderer.setSize(this.width, this.height)
      this.renderer.setPixelRatio((this.options.devicePixelRatio || globalThis.devicePixelRatio || 1) / this.scale)
    }
    typeof this.onResize === "function" ? this.onResize() : void 0
  }

  isOnScreen() {
    if (typeof window === "undefined") return true;

    const elHeight = this.el.offsetHeight
    const elRect = this.el.getBoundingClientRect()
    const scrollTop = (window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body).scrollTop
    )
    const offsetTop = elRect.top + scrollTop
    const minScrollTop = offsetTop - window.innerHeight
    const maxScrollTop = offsetTop + elHeight
    return minScrollTop <= scrollTop && scrollTop <= maxScrollTop
  }

  animationLoop() {
    // Step time
    this.t || (this.t = 0)
    // Uniform time
    this.t2 || (this.t2 = 0)

    // Normalize animation speed to 60fps
    const now = performance.now()
    if (this.prevNow) {
      let elapsedTime = (now-this.prevNow) / (1000/60)
      elapsedTime = Math.max(0.2, Math.min(elapsedTime, 5))
      this.t += elapsedTime

      this.t2 += (this.options.speed || 1) * elapsedTime
      if (this.uniforms) {
        this.uniforms.iTime.value = this.t2 * 0.016667 // iTime is in seconds
      }
    }
    this.prevNow = now


    if (this.options.mouseEase) {
      this.mouseEaseX = this.mouseEaseX || this.mouseX || 0
      this.mouseEaseY = this.mouseEaseY || this.mouseY || 0
      if (Math.abs(this.mouseEaseX-this.mouseX) + Math.abs(this.mouseEaseY-this.mouseY) > 0.1) {
        this.mouseEaseX += (this.mouseX - this.mouseEaseX) * 0.05
        this.mouseEaseY += (this.mouseY - this.mouseEaseY) * 0.05
        this.triggerMouseMove(this.mouseEaseX, this.mouseEaseY)
      }
    }

    // Only animate if element is within view
    if (this.options.forceAnimate || this.isOnScreen()) {
      if (typeof this.onUpdate === "function") {
        this.onUpdate()
      }
      if (this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera)
        this.renderer.setClearColor(this.options.backgroundColor, this.options.backgroundAlpha)
      }
      // if (this.stats) this.stats.update()
      // if (this.renderStats) this.renderStats.update(this.renderer)
      if (this.fps && this.fps.update) this.fps.update()
      if (typeof this.afterRender === "function") this.afterRender()
    }
    return this.req = globalThis.requestAnimationFrame(this.animationLoop)
  }

  // setupControls() {
  //   if (DEBUGMODE && THREE.OrbitControls) {
  //     this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
  //     Object.assign(this.controls, ORBITCONTROLS)
  //     return this.scene.add(new THREE.AxisHelper(100))
  //   }
  // }

  restart() {
    // Restart the effect without destroying the renderer
    if (this.scene) {
      while (this.scene.children.length) {
        this.scene.remove(this.scene.children[0])
      }
    }
    if (typeof this.onRestart === "function") {
      this.onRestart()
    }
    this.init()
  }

  init() {
    if (typeof this.onInit === "function") {
      this.onInit()
    }
    // this.setupControls()
  }

  destroy() {
    if (typeof this.onDestroy === "function") {
      this.onDestroy()
    }
    if (typeof window !== "undefined") {
        const rm = window.removeEventListener
        rm('touchstart', this.windowTouchWrapper)
        rm('touchmove', this.windowTouchWrapper)
        rm('scroll', this.windowMouseMoveWrapper)
        rm('mousemove', this.windowMouseMoveWrapper)
        rm('deviceorientation', this.windowGyroWrapper)
        rm('resize', this.resize)
      }
    globalThis.cancelAnimationFrame(this.req)

    const scene = this.scene
    if (scene && scene.children) {
      clearThree(scene)
    }
    if (this.renderer) {
      if (this.renderer.domElement && !this.options.canvas) {
        this.el.removeChild(this.renderer.domElement)
      }
      this.renderer = null
      this.scene = null
    }

    if (VANTA.current === this) {
      VANTA.current = null
    }
  }
}

/* harmony default export */ const _base = (VANTA.VantaBase);
;// CONCATENATED MODULE: ./src/vanta.waves.js



let vanta_waves_THREE = (typeof window == 'object' && globalThis.THREE)

const defaultOptions = {
  color: 0x005588,
  shininess: 30,
  waveHeight: 15,
  waveSpeed: 1,
  zoom: 1
}

class Waves extends _base {
  static initClass() {
    this.prototype.ww = 100;
    this.prototype.hh = 80;
    this.prototype.waveNoise = 4; // Choppiness of water
  }
  constructor(userOptions) {
    vanta_waves_THREE = userOptions.THREE || vanta_waves_THREE
    super(userOptions)
  }

  getMaterial() {
    const options = {
      color: this.options.color,
      shininess: this.options.shininess,
      flatShading: true,
      side: vanta_waves_THREE.DoubleSide,
      ...(this.options.material && this.options.material.options || {})
    };
    console.log("options", options);
    return new vanta_waves_THREE.MeshPhongMaterial(options);
  }

  onInit() {
    let i, j;
    const CELLSIZE = 18;
    const material = this.getMaterial();
    console.log("material", material);
    const geometry = new vanta_waves_THREE.BufferGeometry();

    // Add vertices
    this.gg = [];
    const points = [];
    for (i=0; i<=(this.options.ww || this.ww); i++){
      this.gg[i] = [];
      for (j=0; j<=(this.options.hh || this.hh); j++){
        const id = points.length;
        const newVertex = new vanta_waves_THREE.Vector3(
          (i - ((this.options.ww || this.ww) * 0.5)) * CELLSIZE,
          rn(0, this.waveNoise) - 10,
          (((this.options.hh || this.hh) * 0.5) - j) * CELLSIZE
        );
        points.push(newVertex);
        this.gg[i][j] = id;
      }
    }
    geometry.setFromPoints(points);

    // Add faces
    // a b
    // c d <-- Looking from the bottom right point
    const indices = [];
    for (i=1; i<=(this.options.ww || this.ww); i++){
      for (j=1; j<=(this.options.hh || this.hh); j++){
        let face1, face2
        const d = this.gg[i][j]
        const b = this.gg[i][j-1]
        const c = this.gg[i-1][j]
        const a = this.gg[i-1][j-1]
        if (ri(0,1)) {
          face1 = [a, b, c]
          face2 = [b, c, d]
        } else {
          face1 = [a, b, d]
          face2 = [a, c, d]
        }
        indices.push(...face1, ...face2)
      }
    }
    geometry.setIndex(indices);

    this.plane = new vanta_waves_THREE.Mesh(geometry, material);
    this.scene.add(this.plane);

    // LIGHTS
    const ambience = new vanta_waves_THREE.AmbientLight( 0xffffff, 0.9 );
    this.scene.add(ambience);

    const pointLight = new vanta_waves_THREE.PointLight( 0xffffff, 0.9 );
    pointLight.position.set(-100,250,-100);
    this.scene.add(pointLight);

    // CAMERA
    this.camera = new vanta_waves_THREE.PerspectiveCamera(
      this.options.camera && this.options.camera.fov || 35,
      this.width / this.height,
      this.options.camera && this.options.camera.near || 50,
      this.options.camera && this.options.camera.far || 10000);

    const xOffset = -10;
    const zOffset = -10;
    this.cameraPosition = new vanta_waves_THREE.Vector3( 250+xOffset, 200, 400+zOffset );
    this.cameraTarget = new vanta_waves_THREE.Vector3( 150+xOffset, -30, 200+zOffset );
    this.camera.position.copy(this.cameraPosition);
    this.scene.add(this.camera);
  }

  onUpdate() {
    // Update options
    let diff;
    if (typeof this.options.hue !== "undefined") {
      if (this.options.hue >= 360) {
        this.countDown = true;
      } else if (this.options.hue <= 0) {
        this.countDown = false;
      }

      const updateColor = this.updateTick === this.options.colorCycleSpeed;

      this.updateTick = updateColor || typeof this.updateTick === "undefined" ? 0 : this.updateTick + 1;

      if (updateColor) {
        const hue = this.countDown ? --this.options.hue : ++this.options.hue;

        this.plane.material.color.set(`hsl(${hue}, ${this.options.saturation}%, ${this.options.lightness}%)`);
      }
    }
    this.plane.material.shininess = this.options.shininess
    this.camera.ox = this.cameraPosition.x / this.options.zoom
    this.camera.oy = this.cameraPosition.y / this.options.zoom
    this.camera.oz = this.cameraPosition.z / this.options.zoom

    if (this.controls != null) {
      this.controls.update()
    }

    const c = this.camera
    if (Math.abs(c.tx - c.position.x) > 0.01) {
      diff = c.tx - c.position.x
      c.position.x += diff * 0.02
    }
    if (Math.abs(c.ty - c.position.y) > 0.01) {
      diff = c.ty - c.position.y
      c.position.y += diff * 0.02
    }
    if (Math.abs(c.tz - c.position.z) > 0.01) {
      diff = c.tz - c.position.z
      c.position.z += diff * 0.02
    }

    c.lookAt( this.cameraTarget )

    // WAVES
    this.oy = this.oy || {};
    for (let i = 0; i < this.plane.geometry.attributes.position.array.length; i += 3) {
      if (!this.oy[i]) { // INIT
        this.oy[i] = this.plane.geometry.attributes.position.array[i + 1];
        } else {
        const vX = this.plane.geometry.attributes.position.array[i];
        const vZ = this.plane.geometry.attributes.position.array[i + 2];
        const s = this.options.waveSpeed;
        const crossChop = Math.sqrt(s) * Math.cos(-vX - (vZ*0.7));
        const delta = Math.sin((((s*this.t*0.02) - (s*vX*0.025)) + (s*vZ*0.015) + crossChop));
        const trochoidDelta = Math.pow(delta + 1, 2) / 4;

        this.plane.geometry.attributes.position.array[i + 1] = this.oy[i] + (trochoidDelta * this.options.waveHeight);
      }
    }

    this.plane.geometry.attributes.position.setUsage(vanta_waves_THREE.DynamicDrawUsage);
    this.plane.geometry.computeVertexNormals();
    this.plane.geometry.attributes.position.needsUpdate = true;
  }

  onMouseMove(x,y) {
    const c = this.camera;
    if (!c.oy) {
      c.oy = c.position.y;
      c.ox = c.position.x;
      c.oz = c.position.z;
    }
    c.tx = c.ox + (((x-0.5) * 100) / this.options.zoom);
    c.ty = c.oy + (((y-0.5) * -100) / this.options.zoom);
    return c.tz = c.oz + (((x-0.5) * -50) / this.options.zoom);
  }
}

Waves.prototype.defaultOptions = defaultOptions
Waves.initClass()
/* harmony default export */ const vanta_waves = (VANTA.register('WAVES', Waves));
/******/ 	return __webpack_exports__;
/******/ })()
;
});