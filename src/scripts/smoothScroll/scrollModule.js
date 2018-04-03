import easingOptions from "./easingOptions.js";

const defaultSpeed = 2500;

class Scroll {
  constructor(opts) {
    this.options = {
      class: opts.class,
      animation: opts.animation,
      duration: opts.duration,
    };
    this._time = {};
    this._position = {};
  }

  init() {
    this._setDefaults();
    document.querySelectorAll(this.options.class).forEach(element => {
      if (
        element.href.indexOf(window.location.origin) !== -1 &&
        element.href.indexOf("#") !== -1
      ) {
        this.onScroll(element);
      }
    });
  }

  onScroll(element) {
    element.addEventListener("click", () =>
      window.requestAnimationFrame(() => {
        this._position.start = window.screenY;
        this._position.end = window.scrollY;
        this._position.current = this._position.start;
        this.updateState();
      })
    );
  }

  updateState() {
    const now = new Date();

    this._time.start === null
      ? ((this._time.start = now), (this._time.now = now))
      : (this._time.now = now);

    this._position.current < this._position.end
      ? (this.onChange(),
        window.requestAnimationFrame(() => this.updateState()))
      : this._setDefaults(),
      window.cancelAnimationFrame(this.updateState);
  }

  // See https://github.com/cferdinandi/smooth-scroll/blob/master/dist/js/smooth-scroll.js
  onChange() {
    const elapsedTime = this._time.now - this._time.start;
    let progress = elapsedTime / this.options.duration;
    progress = progress >= 1 ? 1 : progress;

    this._position.current =
      this._position.start +
      this._position.end * this.options.animation(progress);
    window.scrollTo(0, this._position.current);
  }

  _setDefaults() {
    this.options.animation =
      this.options.animation || easingOptions.easeOutCubic;
    this.options.duration = this.options.duration || 2500;

    this._time = { start: null, now: null };
    this._position = { start: 0, end: null, current: null };
  }
}

export default Scroll;
