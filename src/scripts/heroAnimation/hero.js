import * as utils from "./utils.js";

let width,
  height,
  ctx,
  points,
  target,
  canvasTop,
  animateHeader = true;

const canvas = document.getElementById("js-canvas-hero");
const container = document.querySelector(".grav-c-hero");

function HeroAnimation() {
  if (typeof canvas.getContext !== "function") {
    console.warn("the thingy bob doesn't support canvas. Bailing out.");
    return;
  }

  if (container !== null) {
    canvasTop = canvas.getBoundingClientRect().top;
    initHeader();
    initAnimation();
    addListeners();
  }
}

function scrollCheck() {
  if (document.body.scrollTop > height) {
    animateHeader = false;
  } else {
    animateHeader = true;
  }
}

const resizeCanvas = utils.debounce(function() {
  initHeader();
  canvasTop = canvas.getBoundingClientRect().top;
}, 150);

function animate() {
  if (animateHeader) {
    ctx.clearRect(0, 0, width, height);
    points.map(point => {
      if (Math.abs(utils.getDistance(target, point)) < 8000) {
        point.active = 0.3;
        point.circle.active = 0.75;
      } else if (Math.abs(utils.getDistance(target, point)) < 40000) {
        point.active = 0.1;
        point.circle.active = 0.3;
      } else if (Math.abs(utils.getDistance(target, point)) < 80000) {
        point.active = 0.04;
        point.circle.active = 0.1;
      } else {
        point.active = 0.04;
        point.circle.active = 0.04;
      }

      utils.drawLines(point, ctx);
      point.circle.draw();
    });
  }

  requestAnimationFrame(animate);
}

function mouseOut() {
  target.x = container.clientHeight * 2;
  target.y = container.clientHeight * 2;
}

function mouseMove(e, target, canvasTop) {
  let posy = 0;
  let posx = (posy = 0);

  posx = e.pageX;
  posy = e.pageY - canvasTop;

  target.x = posx;
  target.y = posy;
}

function addListeners() {
  if (!("ontouchstart" in window)) {
    container.addEventListener("mousemove", function(e){mouseMove(e, target, canvasTop)});
    container.addEventListener("mouseout", mouseOut);
    window.addEventListener("resize", resizeCanvas);
  }

  window.addEventListener("scroll", scrollCheck);
}

function initHeader() {
  points = [];
  width = container.clientWidth;
  height = container.clientHeight;
  canvas.width = width;
  canvas.height = height;
  target = {
    x: width * 2,
    y: height * 2
  };

  ctx = canvas.getContext("2d");
  target = {
    x: width * 2,
    y: height * 2
  };

  const pointsLimiter = utils.calcPointsLimiter(width, height);

  for (var x = 0; x < width; x = x + width / pointsLimiter) {
    for (var y = 0; y < height; y = y + height / pointsLimiter) {
      var px = x + Math.random() * width / pointsLimiter;
      var py = y + Math.random() * height / pointsLimiter;
      var p = {
        x: px,
        originX: px,
        y: py,
        originY: py
      };
      points.push(p);
    }
  }

  // for each point find the 5 closest points
  points.map(p1 => {
    let closest = [];
    points.map(p2 => {
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

  points.map(point => {
    let c = new utils.Circle(point, 2 + Math.random() * 2.5, "rgba(255,255,255,0.3)", ctx);
    point.circle = c;
  });
  initAnimation();
}

function initAnimation() {
  animate();
  points.map(point => {
    utils.shiftPoint(point);
  });
}

export default HeroAnimation;
