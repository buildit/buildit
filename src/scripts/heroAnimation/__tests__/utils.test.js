import * as utils from "../utils.js";
let params = {
  width: 1200,
  height: 356,
  ctx: null,
  points: [],
  target: null,
  canvasTop: null,
  animateHeader: true
};

const point1 = {
  x: 73.74925795996039,
  originX: 73.74925795996039,
  y: 47.151927550054076,
  originY: 47.151927550054076,
  closest: [
    {
      x: 73.74925795996039,
      originX: 73.74925795996039,
      y: 47.151927550054076,
      originY: 47.151927550054076,
      closest: [],
      active: 0.4
    },
    {
      x: 83.74925795996039,
      originX: 83.74925795996039,
      y: 57.151927550054076,
      originY: 57.151927550054076,
      closest: [],
      active: 0.4
    },
    {
      x: 93.74925795996039,
      originX: 93.74925795996039,
      y: 67.151927550054076,
      originY: 67.151927550054076,
      closest: [],
      active: 0.4
    }
  ],
  active: 0.4
};

const point2 = {
  x: 83.74925795996039,
  originX: 83.74925795996039,
  y: 57.151927550054076,
  originY: 57.151927550054076,
  closest: [
    {
      x: 83.74925795996039,
      originX: 78.74925795996039,
      y: 57.151927550054076,
      originY: 57.151927550054076,
      closest: [],
      active: 0.4
    }
  ],
  active: 0.4
};

function CtxMock() {
  this.beginPathCounter = 0;
  this.moveToCounter = 0;
  this.lineToCounter = 0;
  this.strokeStyle = null;
  this.strokeCounter = 0;
}

CtxMock.prototype.beginPath = function() {
  this.beginPathCounter += 1;
};

CtxMock.prototype.moveTo = function() {
  this.moveToCounter += 1;
};

CtxMock.prototype.lineTo = function() {
  this.lineToCounter += 1;
};

CtxMock.prototype.stroke = function() {
  this.strokeCounter += 1;
};

describe("calcPointsLimiter function", () => {
  it("should calc a number based on height and width", () => {
    const pointsLimiter = utils.calcPointsLimiter(params.width, params.height);

    expect(pointsLimiter).toEqual(7.12);
  });

  it("should return no less than 6 on smaller screens", () => {
    const smallScreen = { width: 400, height: 356 };

    const pointsLimiter = utils.calcPointsLimiter(
      smallScreen.width,
      smallScreen.height
    );

    expect(pointsLimiter).toBeGreaterThanOrEqual(6);
  });
});

describe("drawLines function", () => {
  it("should call the canvas functions for each point passed in", () => {
    const ctx = new CtxMock();
    const numOfPoints = point1.closest.length;

    expect(ctx.beginPathCounter).toEqual(0);
    expect(ctx.moveToCounter).toEqual(0);
    expect(ctx.lineToCounter).toEqual(0);
    expect(ctx.strokeStyle).toEqual(null);
    expect(ctx.strokeCounter).toEqual(0);

    utils.drawLines(point1, ctx);

    expect(ctx.beginPathCounter).toEqual(numOfPoints);
    expect(ctx.moveToCounter).toEqual(numOfPoints);
    expect(ctx.lineToCounter).toEqual(numOfPoints);
    expect(ctx.strokeStyle).toEqual("rgba(94, 161, 184,0.4)");
    expect(ctx.strokeCounter).toEqual(numOfPoints);
  });
});

describe("getDistance function", () => {
  const distanceTest = 14.14;

  it("should calculate distance between 2 points using hypot as default method", () => {
    const distance = utils.getDistance(point1, point2);

    expect(distance).toEqual(distanceTest);
    expect(global.Math.hypot).toBeDefined();
  });

  it("should calculate distance between 2 points using polyfill if Math.hypot isn't defined", () => {
    const backupHypot = global.Math.hypot;
    delete global.Math.hypot;
    expect(global.Math.hypot).toBeUndefined();

    const distance = utils.getDistance(point1, point2);
    expect(distance).toEqual(distanceTest);

    global.Math.hypot = backupHypot;
  });
});

describe("shiftPoint function", () => {
  it("should call shiftMethod method once", () => {
    const TweenLite = {};
    TweenLite.to = jest.fn();
    const ease = {};
    utils.shiftPoint({}, ease, TweenLite.to);

    expect(TweenLite.to.mock.calls.length).toBe(1);
  });

  describe("getRandomArbitrary function", () => {
    it("should return a number within the min/max range that was passed across", () => {
      const min = 0;
      const max = 10;
      const int = utils.getRandomArbitrary(min, max);

      expect(int).toBeGreaterThanOrEqual(min);
      expect(int).toBeLessThanOrEqual(max);
    });
  });
});
