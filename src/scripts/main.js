import Scroll from "./smoothScroll/scrollModule.js";

/**
 * Scroll takes as argument an object that allows the following properties:
 * 1. Class: String or an array of strings that contains the DOM element's
 * selectors that will use the smooth scroll.
 * 2. Animation: String that indicates the name of the animation that will
 * take effect. If you don't specify any the default option is easeOutCubic.
 * 3. Duration: Number that indicates the duration of the animation in
 * milisecons. The default value is 2500.
 */
const scroll = new Scroll({ class: ".grav-c-cta" });
scroll.init();
