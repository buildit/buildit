/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
const easingOptions = {
  // no easing, no acceleration
  linear(t) {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad(t) {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad(t) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  easeInCubic(t) {
    return t * t * t;
  },
  // decelerating to zero velocity
  easeOutCubic(t) {
    const tMinus = t - 1;
    return tMinus * tMinus * tMinus + 1;
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  easeInQuart(t) {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuart(t) {
    const tMinus = t - 1;
    return 1 - tMinus * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart(t) {
    const tMinus = t - 1;
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * tMinus * t * t * t;
  },
  // accelerating from zero velocity
  easeInQuint(t) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint(t) {
    const tMinus = t - 1;
    return 1 + tMinus * t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint(t) {
    const tMinus = t - 1;
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * tMinus * t * t * t * t;
  },
};

export default easingOptions;
