import * as utils from './utils.js';

let width,
  height,
  ctx,
  points,
  target,
  canvasTop,
  animateHeader = true,
  timer = null;
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

function resetTimer() {
  window.clearTimeout(timer);
  timer = null;
  timer = window.setTimeout(initHeader, 60000);
}

function scrollCheck() {
  if (document.body.scrollTop > height) {
    animateHeader = false;
  } else {
    animateHeader = true;
  }
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const resizeCanvas = debounce(function() {
  initHeader();
  canvasTop = canvas.getBoundingClientRect().top;
}, 150);

function drawLines(p) {
  if (!p.active) return;
  for (var i in p.closest) {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.closest[i].x, p.closest[i].y);
    ctx.strokeStyle = "rgba(94, 161, 184," + p.active + ")";
    ctx.stroke();
  }
}

function Circle(pos, rad, color) {
  var _this = this;

  // constructor
  (function() {
    _this.pos = pos || null;
    _this.radius = rad || null;
    _this.color = color || null;
  })();

  this.draw = function() {
    if (!_this.active) return;
    ctx.beginPath();
    ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(94, 161, 184," + _this.active + ")";
    ctx.fill();
  };
}

function animate() {
  if (animateHeader) {
    ctx.clearRect(0, 0, width, height);
    for (var i in points) {
      // detect points in range
      if (Math.abs(getDistance(target, points[i])) < 8000) {
        points[i].active = 0.3;
        points[i].circle.active = 0.75;
      } else if (Math.abs(getDistance(target, points[i])) < 40000) {
        points[i].active = 0.1;
        points[i].circle.active = 0.3;
      } else if (Math.abs(getDistance(target, points[i])) < 80000) {
        points[i].active = 0.04;
        points[i].circle.active = 0.1;
      } else {
        points[i].active = 0.04;
        points[i].circle.active = 0.04;
      }

      drawLines(points[i]);
      points[i].circle.draw();
    }
  }
  requestAnimationFrame(animate);
}

function shiftPoint(p) {
  TweenLite.to(p, 1 + 1 * Math.random(), {
    x: p.originX - 0 + Math.random() * 20,
    y: p.originY - 0 + Math.random() * 20,
    ease: Circ.easeInOut,
    onComplete: function() {
      shiftPoint(p);
    }
  });
}

function mouseMove(e) {
  let posy = 0;
  let posx = (posy = 0);

  posx = e.pageX;
  posy = e.pageY - canvasTop;

  target.x = posx;
  target.y = posy;
}

function mouseEnter() {
  initAnimation();
}

function mouseOut() {
  target.x = container.clientHeight * 2;
  target.y = container.clientHeight * 2;
  resetTimer();
}

function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

function addListeners() {
  let timer = null;

  if (!("ontouchstart" in window)) {
    container.addEventListener("mousemove", mouseMove);
    container.addEventListener("mouseout", mouseOut);
    container.addEventListener("mouseenter", mouseEnter);
    window.addEventListener("resize", resizeCanvas);
  }

  window.addEventListener("scroll", scrollCheck);

  resetTimer();
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
  points.map((p1) => {
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
            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
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
   let c = new Circle(
      point,
      2 + Math.random() * 2.5,
      "rgba(255,255,255,0.3)"
    );
    point.circle = c;
  })
  initAnimation();
}

function initAnimation() {
  animate();

  points.map(point => {
    shiftPoint(point);
  })
}

export default HeroAnimation;
