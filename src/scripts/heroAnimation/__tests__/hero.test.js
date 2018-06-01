import HeroAnimation from "../hero.js";

let heroParams = {
  width: 850,
  height: 350,
  ctx: null,
  points: [],
  target: null,
  animateHeader: true,
  canvas: null,
  container: null,
  fadeBubble: 80,
  gridSize: 100
};

function canvasGetContext() {
  return {
    fillRect: function() {},
    clearRect: function() {},
    getImageData: function(x, y, w, h) {
      return {
        data: new Array(w * h * 4)
      };
    },
    putImageData: function() {},
    createImageData: function() {
      return [];
    },
    setTransform: function() {},
    drawImage: function() {},
    save: function() {},
    fillText: function() {},
    restore: function() {},
    beginPath: function() {},
    moveTo: function() {},
    lineTo: function() {},
    closePath: function() {},
    stroke: function() {},
    translate: function() {},
    scale: function() {},
    rotate: function() {},
    arc: function() {},
    fill: function() {},
    measureText: function() {
      return { width: 0 };
    },
    transform: function() {},
    rect: function() {},
    clip: function() {}
  };
}

let canvas, container;

describe("HeroAnimation", () => {
  beforeEach(() => {
    canvas = document.createElement("canvas");
    container = document.createElement("div");
  });

  it("should not instantiate and should output a console warning if getContext isn't a function on canvas", () => {
    canvas.getContext = null;

    jest.spyOn(global.console, "warn");

    const hero = new HeroAnimation(canvas, container, heroParams);

    expect(hero).toEqual({});
    expect(global.console.warn).toHaveBeenCalledWith(
      "the thingy bob doesn't support canvas. Bailing out."
    );
  });

  it("should instantiate if getContext is a function", () => {
    canvas.getContext = canvasGetContext;
    heroParams.ctx = canvas.getContext("2d");
    const hero = new HeroAnimation(canvas, container, heroParams);

    expect(canvas).toBe(hero.canvas);
    expect(container).toBe(hero.container);
    expect(heroParams).toBe(hero.params);
  });

  it("should create an array of points within the bounds of the canvas object and grid size offset", () => {
    canvas.getContext = canvasGetContext;
    heroParams.ctx = canvas.getContext("2d");

    Object.defineProperty(container, "clientWidth", {
      value: heroParams.width,
      writable: true
    });

    const hero = new HeroAnimation(canvas, container, heroParams);

    const points = hero.params.points;
    const gridSizeOffset = hero.params.gridSize;

    const firstMaxX = 0;
    const firstMinX = firstMaxX - gridSizeOffset;
    const firstMinY = 0;
    const firstMaxY = gridSizeOffset;
    const lastMinX = hero.params.width - gridSizeOffset;
    const lastMaxX = hero.params.width;
    const lastMinY = 0;
    const lastMaxY = hero.params.height - gridSizeOffset / 2;

    expect(points.length).toBeGreaterThan(0);

    expect(points[0].x).toBeGreaterThanOrEqual(firstMinX);
    expect(points[0].x).toBeLessThanOrEqual(firstMaxX);
    expect(points[0].y).toBeGreaterThanOrEqual(firstMinY);
    expect(points[0].y).toBeLessThanOrEqual(firstMaxY);

    expect(points[points.length - 1].x).toBeGreaterThanOrEqual(lastMinX);
    expect(points[points.length - 1].x).toBeLessThanOrEqual(lastMaxX);
    expect(points[points.length - 1].y).toBeGreaterThanOrEqual(lastMinY);
    expect(points[points.length - 1].y).toBeLessThanOrEqual(lastMaxY);
  });

  it("should contain 5 closest points in params", () => {
    const hero = new HeroAnimation(canvas, container, heroParams);

    expect(hero.params.points[0].closest.length).toEqual(5);
  });
});
