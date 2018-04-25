import Circle from "../Circle.js";

const point = {
  x: 73.74925795996039,
  originX: 73.74925795996039,
  y: 47.151927550054076,
  originY: 47.151927550054076,
  closest: [],
  active: 0.4
};

const rad = 4.230060109621693;
const color = "rgba(255,255,255,0.3)";

function CtxMock() {
  this.beginPathCounter = 0;
  this.arcCounter = 0;
  this.fillCounter = 0;
  this.fillStyle = null;
}

CtxMock.prototype.beginPath = function() {
  this.beginPathCounter += 1;
};

CtxMock.prototype.arc = function() {
  this.arcCounter += 1;
};

CtxMock.prototype.fill = function() {
  this.fillCounter += 1;
};

describe("Circle functionality", () => {
  const ctx = {};

  it("should instantiate a new object", () => {
    const circle = new Circle();

    expect(typeof circle).toBe("object");
  });

  it("should create a new instance of each object", () => {
    const circle1 = new Circle(point, rad, color, ctx);
    const rad2 = 80;
    const circle2 = new Circle(point, rad2, color, ctx);

    expect(circle1.radius).not.toEqual(circle2.radius);
  });
});

describe("Circle draw method", () => {
  const ctx = {};

  it("should have a draw function", () => {
    const circle = new Circle();

    expect(typeof circle.draw).toBe("function");
  });

  it("should call the draw function and set the fill style", () => {
    const ctx = new CtxMock();
    const circle = new Circle(point, rad, color, ctx);
    circle.draw();
    expect(ctx.fill).not.toEqual(null);
  });

  it("should call the draw function and call the canvas functions", () => {
    const ctx = new CtxMock();
    const circle = new Circle(point, rad, color, ctx);

    expect(ctx.beginPathCounter).toEqual(0);
    expect(ctx.arcCounter).toEqual(0);
    expect(ctx.fillCounter).toEqual(0);

    circle.active = 0.4;
    circle.draw();

    expect(ctx.beginPathCounter).toEqual(1);
    expect(ctx.arcCounter).toEqual(1);
    expect(ctx.fillCounter).toEqual(1);
  });

  it("should NOT call the draw function and call the canvas functions if active is false", () => {
    const ctx = new CtxMock();
    const circle = new Circle(point, rad, color, ctx);

    expect(ctx.beginPathCounter).toEqual(0);
    expect(ctx.arcCounter).toEqual(0);
    expect(ctx.fillCounter).toEqual(0);

    circle.draw();

    expect(ctx.beginPathCounter).toEqual(0);
    expect(ctx.arcCounter).toEqual(0);
    expect(ctx.fillCounter).toEqual(0);
  });
});
