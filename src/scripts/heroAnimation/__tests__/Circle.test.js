import Circle from '../Circle.js';

describe('heroCircles', () => {
  it('should instatiate a new object', () => {
    const circ = new Circle();

    expect(typeof circ).toBe('function');
  });
});