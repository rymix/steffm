delete window.Tartan;

window.Tartan = (div, config) => {
  document.getElementById("tartanContainer").style.height = window.innerHeight + "px";
  document.getElementById("tartanContainer").style.width = window.innerWidth + "px";

  //   div.innerHTML = `<input
  //   placeholder="Enter a name..."
  //   spellcheck="false"
  //   type="text"
  //   onkeyup="generateFromName(this.value)"
  // />
  // <span>
  //   Coded by <a href="https://codepen.io/niallains">
  //     Niall
  //   </a>
  //   <br/>
  //   *Names used as random seeds, not linked to tartan registries
  // </span>`;

  const style = `#tartanInnerContainer {
    background: "#0099ff";
    position: fixed;
    inset: 50%;
    transform: translate(-50%, -50%)
  }

  .tile {
    float: left;
  }

  input {
    position: fixed;
    inset: 40% 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    width: 350px;
    max-width: 90%;
    height: 30px;
    padding: 5px 10px;
    border: 0;
    border-radius: 6px;
    opacity: 0.7;
    transition: opacity 0.5s;
  }

  input:hover,
  input:focus {
    opacity: 1;
  }

  span {
    position: fixed;
    z-index: 10;
    bottom: 10px;
    right: 10px;
    color: white;
    font-size: 14px;
    text-align: right;
  }

  a {
    color: white;
  }`;

  const styleContainer = document.createElement('style');
  styleContainer.innerHTML = style;
  div.appendChild(styleContainer);

  let ani;

  const RESIZE_REDRAW_TIME = config.resizeRedrawTime;

  const initTartan = () => {
    //
    // Draw pattern
    //

    const
    ANIMATION_TIME = config.animationTime,
    PATTERN_WIDTH = config.patternWidth,
    BASE = config.base,
    COLORS = config.colors;

    function getLine(vert, color, offset) {
      const
        OFF_X = vert ? offset * BASE : BASE / 2,
        OFF_Y = vert ? 0 : offset * BASE;

      return `linear-gradient(
        45deg,
        ${color} 0 ${BASE / 3}px,
        transparent ${BASE / 3}px ${BASE * (2 / 3)}px,
        ${color} ${BASE * (2 / 3)}px ${BASE}px,
        transparent ${BASE + 1}px
      ) ${OFF_X}px ${OFF_Y}px /
      ${BASE}px ${BASE}px repeat-${vert ? 'y' : 'x'}`;
    }

    function getPattern(lines, bg) {
      const WIDTH = (PATTERN_WIDTH - 1) * 2;
      let css = '';
      lines.forEach(l => {
        for (let pos = l[1]; pos < l[1] + l[2]; pos++) {
          css +=
            getLine(false, l[0], pos) + ', ' +
            getLine(true, l[0], pos) + ', ' +
            getLine(false, l[0], WIDTH - pos) + ', ' +
            getLine(true, l[0], WIDTH - pos) + ', ';
        }
      });
      return css + bg;
    }

    //
    // Generate random pattern
    //

    let
    randInt,
    randEl  = arr => arr[randInt(arr.length)];

    function generatePattern(seed) {
      const RNG = [
        0x80000000, 1103515245, 12345,
        seed || Math.floor(Math.random() * 10000)
      ];
      randInt = max => {
        RNG[3] = (RNG[1] * RNG[3] + RNG[2]) % RNG[0];
        return Math.floor(max * RNG[3] / RNG[0]);
      };

      let
        pallette = [],
        lines = [];
      for (let i = 0; i < 6; i++) {
        pallette.push(randEl(COLORS));
      }

      let pos = 4 + randInt(6);
      while (pos < PATTERN_WIDTH) {
        let lineWidth = randInt(4);
        if (pos + lineWidth > PATTERN_WIDTH) {
          lineWidth = PATTERN_WIDTH - pos;
        }
        if (randInt(4) !== 0) {
          lines.push([
            randEl(pallette),
            pos,
            lineWidth
          ]);
        }
        pos += lineWidth;
      }

      return getPattern(lines, randEl(COLORS));
    }


    //
    // Generate pattern with name as seed
    //

    function generateFromName(name) {
      if (name === '') {
        startAnimation()
      } else {
        stopAnimation();
        const SEED = name
          .toLowerCase()
          .replace(/\s/g, '')
          .split('')
          .reduce((sum, l) => sum + l.charCodeAt(), 0);
        DIVS.forEach(d => d.style.background = generatePattern(SEED));
      }
    }

    //
    // Add elements to page
    //

    const
      EL_WIDTH = BASE * PATTERN_WIDTH * 2,
      CONTAINER = document.createElement('div'),
      DIVS = [],
      DIV_COUNT =
          Math.ceil(window.innerWidth / EL_WIDTH) *
          Math.ceil(window.innerHeight / EL_WIDTH);

    CONTAINER.setAttribute("id", "tartanInnerContainer");

    for (let i = 0; i < DIV_COUNT; i++) {
      const DIV = document.createElement('div');
      DIV.setAttribute("class", "tile");
      DIV.style.width = DIV.style.height = EL_WIDTH + 'px';
      DIV.style.background = generatePattern();
      CONTAINER.appendChild(DIV);
      DIVS.push(DIV);
    }
    DIVS.sort(() => Math.random() < 0.5 ? 1 : -1);

    div.appendChild(CONTAINER);
    CONTAINER.style.width = (
      EL_WIDTH * Math.ceil(window.innerWidth / EL_WIDTH)
    ) + 'px';
    CONTAINER.style.height = (
      EL_WIDTH * Math.ceil(window.innerHeight / EL_WIDTH)
    ) + 'px';

    //
    // Animate
    //

    let ani_i = 0;
    function startAnimation() {
      clearInterval(ani);
      ani = setInterval(
        () => {
          DIVS[ani_i].style.background = generatePattern();
          ani_i += 1;
          ani_i %= DIVS.length;
        },
        ANIMATION_TIME
      );
    }

    function stopAnimation() {
      clearInterval(ani);
    }

    startAnimation();
  }

  let debounce;
  const resize = () => {
    if (ani) clearInterval(ani);
    clearTimeout(debounce);
    debounce = setTimeout(initTartan, RESIZE_REDRAW_TIME);
  };
  window.onresize = resize;

  initTartan();
};
