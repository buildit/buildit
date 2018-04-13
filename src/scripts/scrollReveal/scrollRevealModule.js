import * as utils from "../utils.js";

const defaults = {
  revealElement: ".js-reveal-element",
  originParams: ["top", "right", "bottom", "left"],
  randomDurationPeriod: [500, 1500],
  randomDistanceLength: [100, 500],
  mobile: false
};

class ScrollRevealModule {
  constructor() {
    window.scrollreveal = ScrollReveal();
  }

  init() {
    document.querySelectorAll(defaults.revealElement).forEach(ele => {
      let options = this.generateOptions(ele.dataset.exclude);
      scrollreveal.reveal(ele, options);
    });
  }

  generateOptions(excludeOrigin) {
    let options = {};

    // duration - animation time period
    options.duration = utils.getRandomIntInclusive(
      defaults.randomDurationPeriod
    );

    // origin - starting point for of animation
    let originOptions = defaults.originParams.filter(
      item => item !== excludeOrigin
    );
    options.origin = originOptions[utils.getRandomInt(originOptions.length)];

    // distance - animation travel span
    options.distance =
      Math.floor(utils.getRandomIntInclusive(defaults.randomDistanceLength)) +
      "px";

    // mobile - include animations on mobile
    options.mobile = defaults.mobile;

    return options;
  }
}

export default ScrollRevealModule;
