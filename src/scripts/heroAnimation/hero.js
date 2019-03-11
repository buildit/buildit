import * as utils from "./utils.js";
import Circle from "./Circle.js";

import debounce from "lodash-es/debounce";

class HeroAnimation {
  constructor(canvas, container, heroParams) {
    if (typeof canvas.getContext !== "function") {
      console.warn("the thingy bob doesn't support canvas. Bailing out.");
      return;
    }

    this.canvas = canvas;
    this.container = container;
    this.params = heroParams;
    this.resizeCanvas = debounce(this.resizeCanvas, 150);

    this.initHeader();
    this.initAnimation();

    if (!("ontouchstart" in window)) {
      this.container.addEventListener("mousemove", this.mouseMove.bind(this));
      this.container.addEventListener("mouseout", this.mouseOut.bind(this));
      window.addEventListener("resize", this.resizeCanvas.bind(this));
    } else {
      noTouchAnim();
    }

    window.addEventListener("scroll", this.scrollCheck.bind(this));
  }

  initHeader() {
    if (this.container.clientWidth < this.params.gridSize) return;

    this.params.points = [];
    this.params.width = this.container.clientWidth || this.params.width;
    this.params.height = this.container.clientHeight || this.params.height;
    this.canvas.width = this.params.width;
    this.canvas.height = this.params.height;
    this.params.target = {
      x: this.params.width * 2,
      y: this.params.height * 2
    };

    this.params.ctx = this.canvas.getContext("2d");

    const pointsLimiter = utils.calcPointsLimiter(
      this.params.width,
      this.params.height
    );

    for (
      let x = -this.params.gridSize;
      x < this.params.width;
      x = x + this.params.width / pointsLimiter
    ) {
      for (
        let y = 0;
        y < this.params.height;
        y = y + this.params.height / pointsLimiter
      ) {
        const px = utils.getRandomArbitrary(x, x + this.params.gridSize);
        const py = utils.getRandomArbitrary(y, y + this.params.gridSize);

        if (py < this.params.height - this.params.gridSize / 2) {
          const p = {
            x: px,
            originX: px,
            y: py,
            originY: py
          };
          this.params.points.push(p);
        }
      }
    }

    // for each point find the 5 closest points
    this.params.points.map(p1 => {
      let closest = [];
      this.params.points.map(p2 => {
        if (!(p1 == p2)) {
          let placed = false;

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (
                utils.getDistance(p1, p2) < utils.getDistance(p1, closest[k])
              ) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      });

      p1.closest = closest;
    });

    this.params.points.map(point => {
      point.circle = new Circle(
        point,
        2 + Math.random() * 2.5,
        "94, 161, 184",
        this.params.ctx
      );
    });

    this.initAnimation();
  }

  initAnimation() {
    this.animate();
    this.params.points.map(point => {
      utils.shiftPoint(point);
    });
  }

  scrollCheck() {
    if (this.container.getBoundingClientRect().bottom < 0) {
      this.params.animateHeader = false;
    } else {
      this.params.animateHeader = true;
    }
  }

  mouseOut() {
    this.params.target.x = this.container.clientHeight * 2;
    this.params.target.y = this.container.clientHeight * 2;
  }

  mouseMove(e) {
    let posy = 0;
    let posx = (posy = 0);

    posx = e.pageX;
    posy = e.pageY - this.container.offsetTop;

    this.params.target.x = posx;
    this.params.target.y = posy;
  }

  noTouchAnim() {
    let posy = 0;
    let posx = (posy = 0);

    posx = params.container.clientWidth / 1.5;
    posy = params.container.clientHeight / 1.5;

    this.params.target.x = posx;
    this.params.target.y = posy;
  }

  resizeCanvas() {
    this.initHeader(this.canvas, this.container);
  }

  animate() {
    if (this.params.animateHeader) {
      this.params.ctx.clearRect(0, 0, this.params.width, this.params.height);

      this.params.points.map(point => {
        const distance = Math.abs(utils.getDistance(this.params.target, point));

        if (distance <= this.params.fadeBubble) {
          point.active = 0.3;
          point.circle.active = 0.75;
        } else if (distance <= this.params.fadeBubble * 2) {
          point.active = 0.1;
          point.circle.active = 0.3;
        } else if (distance <= this.params.fadeBubble * 3) {
          point.active = 0.04;
          point.circle.active = 0.1;
        } else {
          point.active = 0.04;
          point.circle.active = 0.04;
        }

        utils.drawLines(point, this.params.ctx);
        point.circle.draw();
      });
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

export default HeroAnimation;
