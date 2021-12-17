import React, { FC } from 'react';
import styled from '@emotion/styled';

import { Cell as CellType, CellState, Coords } from '@/helpers/Field';

export interface CellProps {
  /**
   * Cell Status based on Celltype
   */
  children: CellType;
  /**
   * Cell Coordinates
   */
  coords: Coords;
  /**
   * onClick cell handler
   */
  onClick: (coords: Coords) => void;
  /**
   * onContext Menu
   */
  onContextMenu: (coords: Coords) => void;
}

export const Cell: FC<CellProps> = ({ children, coords, ...rest }) => {
  const isActiveCell = [
    CellState.hidden,
    CellState.mark,
    CellState.weakMark,
  ].includes(children);

  const onClick = () => {
    if (isActiveCell) {
      rest.onClick(coords);
    }
  };

  const onContextMenu = (elem: React.MouseEvent<HTMLElement>) => {
    /**
     * Prevent context menu by default
     */
    elem.preventDefault();
    if (isActiveCell) {
      rest.onContextMenu(coords);
    }
  };

  const props = {
    onClick,
    onContextMenu,
  };

  return <ComponentsMap {...props}>{children}</ComponentsMap>;
};

interface ComponentsMapProps {
  children: CellType;
  onClick: (elem: React.MouseEvent<HTMLElement>) => void;
  onContextMenu: (elem: React.MouseEvent<HTMLElement>) => void;
}

const ComponentsMap: FC<ComponentsMapProps> = ({ children, ...rest }) => {
  switch (children) {
    case CellState.empty:
      return <ReveledFrame {...rest} />;
    case CellState.mark:
      return (
        <ClosedFrame {...rest}>
          <Flag />
        </ClosedFrame>
      );
    case CellState.weakMark:
      return (
        <ClosedFrame {...rest}>
          <WeakFlag />
        </ClosedFrame>
      );
    case CellState.bomb:
      return (
        <BombFrame {...rest}>
          <Bomb />
        </BombFrame>
      );
    case CellState.hidden:
      return <ClosedFrame {...rest} />;
    default:
      return <ReveledFrame {...rest}>{children}</ReveledFrame>;
  }
};

const transparent = 'rgba(0,0,0,0)';

const colors: { [key in CellType]: string } = {
  0: transparent,
  1: '#2a48ec',
  2: '#2bb13d',
  3: '#ec6561',
  4: '#233db7',
  5: '#a6070f',
  6: '#e400af',
  7: '#906a02',
  8: '#fa0707',
  9: transparent,
  10: transparent,
  11: transparent,
  12: transparent,
};

const ClosedFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  width: 1.8vw;
  height: 1.8vw;
  background-color: #d1d1d1;
  border: 0.6vh solid transparent;
  border-color: white #9e9e9e #9e9e9e white;
  &:hover {
    filter: brightness(1.1);
  }
`;

const ReveledFrame = styled(ClosedFrame)`
  border-color: #dddddd;
  cursor: default;
  color: ${({ children }) => colors[children as CellType] ?? transparent};
  &:hover {
    filter: brightness(1);
  }
`;

const Bomb = styled.div`
  border-radius: 50%;
  width: 1vw;
  height: 1vw;
  background-color: #333;
`;

const BombFrame = styled(ReveledFrame)`
  background-color: #ec433c;
`;

const Flag = styled.div`
  width: 0px;
  height: 0px;
  color: ${transparent};
  border-top: 2vh solid transparent;
  border-bottom: 2vh solid transparent;
  border-left: 2vh solid #ec433c;
`;

const WeakFlag = styled(Flag)`
  border-left: 2vh solid #f19996;
`;
