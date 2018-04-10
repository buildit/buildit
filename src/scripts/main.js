/**
 * @param { String || Array<string> } Class
 * @param { string } Animation
 * @param { number } Duration
 * @returns { Object } Handles the scroll to an anchor on the same page
 */

import Scroll from "./smoothScroll/scrollModule.js";
const scroll = new Scroll({ class: ".grav-c-cta" });
scroll.init();

import ScrollReveal from "./scrollReveal/scrollRevealModule.js";
const scrollReveal = new ScrollReveal();
scrollReveal.init();
