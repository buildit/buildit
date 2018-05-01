import * as utils from "./utils.js";
import Circle from "./Circle.js";

let params = {
  width: 0,
  height: 0,
  ctx: null,
  points: [],
  target: null,
  canvasTop: null,
  animateHeader: true,
  canvas: null,
  container: null
};

function HeroAnimation(canvas, container) {
  if (typeof canvas.getContext !== "function") {
    console.warn("the thingy bob doesn't support canvas. Bailing out.");
    return;
  }

  if (container !== null) {
    params.canvas = canvas;
    params.container = container;
    params.canvasTop = params.canvas.getBoundingClientRect().top;

    initHeader();
    initAnimation();
    addListeners();
  }
}

function scrollCheck() {
  if (params.container.getBoundingClientRect().bottom < 0) {
    params.animateHeader = false;
  } else {
    params.animateHeader = true;
  }
}

const resizeCanvas = utils.debounce(function() {
  initHeader(params.canvas, params.container);
  params.canvasTop = params.canvas.getBoundingClientRect().top;
}, 150);

function animate() {
  if (params.animateHeader) {
    params.ctx.clearRect(0, 0, params.width, params.height);
    params.points.map(point => {
      if (Math.abs(utils.getDistance(params.target, point)) < 8000) {
        point.active = 0.3;
        point.circle.active = 0.75;
      } else if (Math.abs(utils.getDistance(params.target, point)) < 40000) {
        point.active = 0.1;
        point.circle.active = 0.3;
      } else if (Math.abs(utils.getDistance(params.target, point)) < 80000) {
        point.active = 0.04;
        point.circle.active = 0.1;
      } else {
        point.active = 0.04;
        point.circle.active = 0.04;
      }

      utils.drawLines(point, params.ctx);
      point.circle.draw();
    });
  }

  requestAnimationFrame(animate);
}

function mouseOut() {
  params.target.x = params.container.clientHeight * 2;
  params.target.y = params.container.clientHeight * 2;
}

function mouseMove(e) {
  let posy = 0;
  let posx = (posy = 0);

  posx = e.pageX;
  posy = e.pageY - this.offsetTop;

  params.target.x = posx;
  params.target.y = posy;
}

function noTouchAnim() {
  let posy = 0;
  let posx = (posy = 0);

  posx = params.container.clientWidth / 2;
  posy = params.container.clientHeight / 2;

  params.target.x = posx;
  params.target.y = posy;
}

function addListeners() {
  if (!("ontouchstart" in window)) {
    params.container.addEventListener("mousemove", mouseMove);
    params.container.addEventListener("mouseout", mouseOut);
    window.addEventListener("resize", resizeCanvas);
  } else {
    noTouchAnim();
  }

  window.addEventListener("scroll", scrollCheck);
}

function initHeader() {
  params.points = [];
  params.width = params.container.clientWidth;
  params.height = params.container.clientHeight;
  params.canvas.width = params.width;
  params.canvas.height = params.height;
  params.target = {
    x: params.width * 2,
    y: params.height * 2
  };

  params.ctx = params.canvas.getContext("2d");

  const pointsLimiter = utils.calcPointsLimiter(params.width, params.height);

  for (var x = 0; x < params.width; x = x + params.width / pointsLimiter) {
    for (var y = 0; y < params.height; y = y + params.height / pointsLimiter) {
      var px = x + Math.random() * params.width / pointsLimiter;
      var py = y + Math.random() * params.height / pointsLimiter;
      var p = {
        x: px,
        originX: px,
        y: py,
        originY: py
      };

      params.points.push(p);
    }
  }

  // for each point find the 5 closest points
  params.points.map(p1 => {
    let closest = [];
    params.points.map(p2 => {
      if (!(p1 == p2)) {
        var placed = false;

        for (var k = 0; k < 5; k++) {
          if (!placed) {
            if (closest[k] == undefined) {
              closest[k] = p2;
              placed = true;
            }
          }
        }

        for (var k = 0; k < 5; k++) {
          if (!placed) {
            if (utils.getDistance(p1, p2) < utils.getDistance(p1, closest[k])) {
              closest[k] = p2;
              placed = true;
            }
          }
        }
      }
    });

    p1.closest = closest;
  });

  params.points.map(point => {
    point.circle = new Circle(
      point,
      2 + Math.random() * 2.5,
      "rgba(94, 161, 184, 0.3)",
      params.ctx
    );
  });

  initAnimation();
}

function initAnimation() {
  animate();
  params.points.map(point => {
    utils.shiftPoint(point);
  });
}

export default HeroAnimation;
