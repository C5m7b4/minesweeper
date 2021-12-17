import { Cell, CellState, Field } from './Field';
import {
  incrementNeibors,
  getNeigborsItems,
  checkItemInfield,
  openCell,
} from './CellsManipulators';

const { bomb: b, empty: e, hidden: h } = CellState;

describe('checkItemInField test', () => {
  describe('simple cases', () => {
    const field: Field = [[e]];

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
    expect(incrementNeibors([0, 0], [[b]])).toStrictEqual([[b]]);
  });
  it('field 2x2 with two mine', () => {
    expect(
      incrementNeibors(
        [0, 0],
        [
          [b, e],
          [e, b],
        ]
      )
    ).toStrictEqual([
      [b, 1],
      [1, b],
    ]);
  });
  it('field 3x3 with one centered mine', () => {
    expect(
      incrementNeibors(
        [1, 1],
        [
          [e, e, e],
          [e, b, e],
          [e, e, e],
        ]
      )
    ).toStrictEqual([
      [1, 1, 1],
      [1, b, 1],
      [1, 1, 1],
    ]);
  });

  it('field 3x3 with two mines', () => {
    expect(
      incrementNeibors(
        [1, 1],
        [
          [0, 1, b],
          [0, b, 1],
          [0, 0, 0],
        ]
      )
    ).toStrictEqual([
      [1, 2, b],
      [1, b, 2],
      [1, 1, 1],
    ]);
  });
});

describe('open cell action', () => {
  describe('simple cases', () => {
    it('open cell with the bomb', () => {
      expect(() =>
        openCell(
          [1, 1],
          [
            [h, h],
            [h, h],
          ],
          [
            [1, 1],
            [1, b],
          ]
        )
      ).toThrow('Game Over');
    });

    it('open cell with state=1', () => {
      const playerField = openCell(
        [1, 1],
        [
          [h, h, h],
          [h, h, h],
          [h, h, h],
        ],
        [
          [1, 1, 0],
          [9, 1, 0],
          [1, 1, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [h, h, h],
        [h, 1, h],
        [h, h, h],
      ]);
    });

    it('open cell with state=3', () => {
      const playerField = openCell(
        [1, 1],
        [
          [h, h, h],
          [h, h, h],
          [h, h, h],
        ],
        [
          [9, 2, 0],
          [9, 3, 0],
          [9, 2, 0],
        ]
      );
      expect(playerField).toStrictEqual([
        [h, h, h],
        [h, 3, h],
        [h, h, h],
      ]);
    });
  });
});

describe('Open empty cell', () => {
  it('open empty cell. simple 3x3 case', () => {
    const playerField = openCell(
      [1, 2],
      [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ],
      [
        [1, 1, 0],
        [9, 1, 0],
        [1, 1, 0],
      ]
    );

    expect(playerField).toStrictEqual([
      [h, 1, 0],
      [h, 1, 0],
      [h, 1, 0],
    ]);
  });

  it('open empty cell. simple 5x5 case', () => {
    const playerField = openCell(
      [2, 2],
      [
        [h, h, h, h, h],
        [h, h, h, h, h],
        [h, h, h, h, h],
        [h, h, h, h, h],
        [h, h, h, h, h],
      ],
      [
        [9, 9, 1, 1, 2],
        [9, 3, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 0, 1, 9],
        [2, 1, 0, 1, 0],
      ]
    );

    expect(playerField).toStrictEqual([
      [h, h, 1, 1, 2],
      [h, 3, 1, 0, 0],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 1, h],
      [2, 1, 0, 1, h],
    ]);
  });
});
