import * as utils from "./utils.js";
import Circle from "./Circle.js";

let params = {
  width: 0,
  height: 0,
  ctx: null,
  points: [],
  target: null,
  canvasTop: null,
  animateHeader: true
};

function HeroAnimation(canvas, container) {
  if (typeof canvas.getContext !== "function") {
    console.warn("the thingy bob doesn't support canvas. Bailing out.");
    return;
  }

  if (container !== null) {
    params.canvasTop = canvas.getBoundingClientRect().top;
    initHeader();
    initAnimation();
    addListeners();
  }
}

function scrollCheck() {
  if (document.body.scrollTop > params.height) {
    params.animateHeader = false;
  } else {
    params.animateHeader = true;
  }
}

const resizeCanvas = utils.debounce(function() {
  initHeader();
  params.canvasTop = canvas.getBoundingClientRect().top;
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
  params.target.x = container.clientHeight * 2;
  params.target.y = container.clientHeight * 2;
}

function mouseMove(event, target, canvasTop) {
  let posy = 0;
  let posx = (posy = 0);

  posx = event.pageX;
  posy = event.pageY - canvasTop;

  target.x = posx;
  target.y = posy;
}

function addListeners() {
  if (!("ontouchstart" in window)) {
    container.addEventListener("mousemove", function(e) {
      mouseMove(e, params.target, params.canvasTop);
    });
    container.addEventListener("mouseout", mouseOut);
    window.addEventListener("resize", resizeCanvas);
  }

  window.addEventListener("scroll", scrollCheck);
}

function initHeader() {
  params.points = [];
  params.width = container.clientWidth;
  params.height = container.clientHeight;
  canvas.width = params.width;
  canvas.height = params.height;
  params.target = {
    x: params.width * 2,
    y: params.height * 2
  };

  params.ctx = canvas.getContext("2d");

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
