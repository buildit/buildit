import Scroll from "./smoothScroll/scrollModule.js";
import ScrollReveal from "./scrollReveal/scrollRevealModule.js";
import toogleSwitch from "./toogleSwitch/toogleSwitch.js";

const scroll = new Scroll({ class: ".grav-c-cta" });
const scrollReveal = new ScrollReveal();

scroll.init();
scrollReveal.init();
toogleSwitch();
