import * as utils from "../utils.js";

const defaults = {
  revealElement: ".js-reveal-element",
  originParams: ["top", "right", "bottom", "left"],
  randomDurationPeriod: [500, 1500],
  randomDistanceLength: [100, 500]
};

class ScrollRevealModule {
  constructor() {
    window.scrollreveal = ScrollReveal();
  }

  init() {
    document.querySelectorAll(defaults.revealElement).forEach(ele => {
      let randomOptions = this.generateRandomOptions(ele.dataset.exclude);
      scrollreveal.reveal(ele, randomOptions);
    });
  }

  generateRandomOptions(excludeOrigin) {
    let randomOptions = {};

    randomOptions.duration = utils.getRandomIntInclusive(
      defaults.randomDurationPeriod
    );

    let originOptions = defaults.originParams.filter(
      item => item !== excludeOrigin
    );
    randomOptions.origin =
      originOptions[utils.getRandomInt(originOptions.length)];

    randomOptions.distance =
      Math.floor(utils.getRandomIntInclusive(defaults.randomDistanceLength)) +
      "px";

    return randomOptions;
  }
}

export default ScrollRevealModule;
