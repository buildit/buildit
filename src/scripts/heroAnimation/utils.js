export function calcPointsLimiter(width, height) {
  const pointsLimiterMin = 6;
  const pointsLimiter = width * height / 60000;

  return pointsLimiter > pointsLimiterMin ? pointsLimiter : pointsLimiterMin;
}

// Taken from Underscore. TODO: add this as a dependency
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

export function shiftPoint(point, ease, shiftMethod) {
  shiftMethod = shiftMethod || TweenLite.to;
  ease = ease || Circ.easeInOut;

  const duration = 1 + 1 * Math.random();
  const vars = {
    x: point.originX - 0 + Math.random() * 20,
    y: point.originY - 0 + Math.random() * 20,
    ease: ease,
    onComplete: function() {
      shiftPoint(point, ease, shiftMethod);
    }
  };

  shiftMethod(point, duration, vars);
}

export function getDistance(p1, p2) {
  return typeof Math.hypot !== "undefined"
    ? Number(
        Math.hypot(Math.pow(p1.x - p2.x, 2), Math.pow(p1.y - p2.y, 2)).toFixed(
          2
        )
      )
    : Number(
        Math.sqrt(Math.pow(p1.x - p2.x, 4) + Math.pow(p1.y - p2.y, 4)).toFixed(
          2
        )
      );
}

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
