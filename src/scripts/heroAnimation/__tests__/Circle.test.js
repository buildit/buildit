import Circle from "../Circle.js";

describe("heroCircles", () => {
  it("should instantiate a new object", () => {
    const circle = new Circle();

    expect(typeof circle).toBe("object");
  });
});
