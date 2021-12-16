import { CellState, Field } from './Field';
import {
  incrementNeibors,
  getNeigborsItems,
  checkItemInfield,
} from './CellsManipulators';

const { bomb, empty } = CellState;

describe('checkItemInField test', () => {
  describe('simple cases', () => {
    const field: Field = [[empty]];

    it('out of y range', () => {
      expect(checkItemInfield([1, 0], field)).toBe(false);
    });
    it('out of x range', () => {
      expect(checkItemInfield([0, -1], field)).toBe(false);
    });
    it('in x and y range', () => {
      expect(checkItemInfield([0, 0], field)).toBe(true);
    });
  });
});

describe('check neighbors selectors', () => {
  it('with [0,0] coords', () => {
    expect(getNeigborsItems([0, 0])).toStrictEqual({
      top: [-1, 0],
      topRight: [-1, 1],
      right: [0, 1],
      rightBottom: [1, 1],
      bottom: [1, 0],
      bottomLeft: [1, -1],
      left: [0, -1],
      leftTop: [-1, -1],
    });
  });
  it('with [3,3] coords', () => {
    expect(getNeigborsItems([3, 3])).toStrictEqual({
      top: [2, 3],
      topRight: [2, 4],
      right: [3, 4],
      rightBottom: [4, 4],
      bottom: [4, 3],
      bottomLeft: [4, 2],
      left: [3, 2],
      leftTop: [2, 2],
    });
  });
});

describe('Check increment neigbors', () => {
  it('field with only one item', () => {
    expect(incrementNeibors([0, 0], [[bomb]])).toStrictEqual([[bomb]]);
  });
  it('field 2x2 with two mine', () => {
    expect(
      incrementNeibors(
        [0, 0],
        [
          [bomb, empty],
          [empty, bomb],
        ]
      )
    ).toStrictEqual([
      [bomb, 1],
      [1, bomb],
    ]);
  });
  it('field 3x3 with one centered mine', () => {
    expect(
      incrementNeibors(
        [1, 1],
        [
          [empty, empty, empty],
          [empty, bomb, empty],
          [empty, empty, empty],
        ]
      )
    ).toStrictEqual([
      [1, 1, 1],
      [1, bomb, 1],
      [1, 1, 1],
    ]);
  });

  it('field 3x3 with two mines', () => {
    expect(
      incrementNeibors(
        [1, 1],
        [
          [0, 1, bomb],
          [0, bomb, 1],
          [0, 0, 0],
        ]
      )
    ).toStrictEqual([
      [1, 2, bomb],
      [1, bomb, 2],
      [1, 1, 1],
    ]);
  });
});
