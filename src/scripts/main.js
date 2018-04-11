/**
 * @param { String || Array<string> } Class
 * @param { string } Animation
 * @param { number } Duration
 * @returns { Object } Handles the scroll to an anchor on the same page
 */

import Scroll from "./smoothScroll/scrollModule.js";
import ScrollReveal from "./scrollReveal/scrollRevealModule.js";
import ToogleSwitch from "./toogleSwitch/toogleSwitch.js";

const scroll = new Scroll({ class: ".grav-c-cta" });
scroll.init();

const scrollReveal = new ScrollReveal();
scrollReveal.init();

const toogleSwitch = new ToogleSwitch("[type=button][aria-pressed]");
toogleSwitch.init();
