export function calcPointsLimiter(width, height) {
  const pointsLimiterMin = 6;
  const pointsLimiter = (width * height) / 60000;

  return pointsLimiter > pointsLimiterMin ? pointsLimiter : pointsLimiterMin;
}

export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function drawLines(p, ctx) {
  if (!p.active) return;
  p.closest.map(c => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(c.x, c.y);
    ctx.strokeStyle = "rgba(94, 161, 184," + p.active + ")";
    ctx.stroke();
  });
}

export function shiftPoint(point) {

  let tween = TweenLite.to(point, 1 + 1 * Math.random(), {
    x: point.originX - 0 + Math.random() * 20,
    y: point.originY - 0 + Math.random() * 20,
    ease: Circ.easeInOut,
    onComplete: function() {
      shiftPoint(point);
    }
  });
}

export function Circle(pos, rad, color, ctx) {
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

export function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}