import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';

import { CellState, Coords } from '@/helpers/Field';
import { Cell, checkCellIsActive } from './Cell';

describe('Cell Component Check', () => {
  const coords: Coords = [1, 1];
  for (let cell = CellState.empty; cell <= CellState.weakMark; cell++) {
    it('Check prevent default context menu for every type of cell', () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };

      render(<Cell {...props}>{cell}</Cell>);
      const cellCmp = screen.getByTestId(`${cell}_${coords}`);
      const contextMenuEvent = createEvent.contextMenu(cellCmp);
      fireEvent(cellCmp, contextMenuEvent);
      expect(contextMenuEvent.defaultPrevented).toBe(true);
    });
    it('onClick and onContextMenu handle should be called for active cells', () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };

      render(<Cell {...props}>{cell}</Cell>);
      const cellCmp = screen.getByTestId(`${cell}_${coords}`);

      fireEvent.click(cellCmp);
      fireEvent.contextMenu(cellCmp);
      if (checkCellIsActive(cell)) {
        expect(props.onClick).toBeCalled();
        expect(props.onContextMenu).toBeCalled();
      } else {
        expect(props.onClick).not.toBeCalled();
        expect(props.onContextMenu).not.toBeCalled();
      }
    });
  }
});
