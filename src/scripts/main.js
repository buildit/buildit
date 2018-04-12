import Scroll from "./smoothScroll/scrollModule.js";
import ScrollReveal from "./scrollReveal/scrollRevealModule.js";

const scroll = new Scroll({ class: ".grav-c-cta" });
const scrollReveal = new ScrollReveal();

scroll.init();
scrollReveal.init();
