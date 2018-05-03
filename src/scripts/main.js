import Scroll from "./smoothScroll/scrollModule.js";
import ScrollReveal from "./scrollReveal/scrollRevealModule.js";
import toogleSwitch from "./toogleSwitch/toogleSwitch.js";
import HeroAnimation from "./heroAnimation/hero.js";

const scroll = new Scroll({ class: ".grav-c-cta" });
const scrollReveal = new ScrollReveal();
const canvas = document.getElementById("js-canvas-hero");
const container = document.querySelector(".grav-c-hero");

if (canvas && container) {
  const heroAnimation = new HeroAnimation(canvas, container);
}

scroll.init();
scrollReveal.init();
toogleSwitch();
