import { add, mul } from './MathFunctions';

describe('Check Math Function', () => {
  it('check add function', () => {
    expect(add(2, 2)).toEqual(4);
  });
  it('check multipley function', () => {
    expect(mul(2, 3)).toBe(6);
  });
});
