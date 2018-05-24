export function calcPointsLimiter(width, height) {
  const pointsLimiterMin = 6;
  const pointsLimiter = width * height / 60000;

  return pointsLimiter > pointsLimiterMin ? pointsLimiter : pointsLimiterMin;
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
  Math.hypot =
    Math.hypot ||
    // Polyfill taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot#Polyfill
    function() {
      var y = 0,
        i = arguments.length;
      while (i--) y += arguments[i] * arguments[i];
      return Math.sqrt(y);
    };

  return parseFloat(Math.hypot(p1.x - p2.x, p1.y - p2.y).toFixed(2));
}

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
