import { FIELD_SIZE } from "../../common/constants";
import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";

const topOrLeftEdge = 0;
const bottomOrRightEdge = FIELD_SIZE - 1;

const upstairsNeighbor = (cells: TCreatures, cell: ICreature) => {
  const newY = cell.Y - 1;
  const x = cell.X;
  const y = newY < topOrLeftEdge ? bottomOrRightEdge : newY;

  return cells[`${x},${y}`];
};

const downstairsNeighbor = (cells: TCreatures, cell: ICreature) => {
  const newY = cell.Y + 1;
  const x = cell.X;
  const y = newY > bottomOrRightEdge ? topOrLeftEdge : newY;

  return cells[`${x},${y}`];
};

const neighborOnTheRight = (cells: TCreatures, cell: ICreature) => {
  const newX = cell.X + 1;
  const x = newX > bottomOrRightEdge ? topOrLeftEdge : newX;
  const y = cell.Y;

  return cells[`${x},${y}`];
};

const neighborOnTheLeft = (cells: TCreatures, cell: ICreature) => {
  const newX = cell.X - 1;
  const x = newX < topOrLeftEdge ? bottomOrRightEdge : newX;
  const y = cell.Y;

  return cells[`${x},${y}`];
};

const getUpstairsNeighbors = (cells: TCreatures, cell: ICreature) => {
  const top = upstairsNeighbor(cells, cell);
  const northeast = neighborOnTheRight(cells, top);
  const northwest = neighborOnTheLeft(cells, top);

  return [top, northeast, northwest];
};

const getSideNeighbors = (cells: TCreatures, cell: ICreature) => {
  const left = neighborOnTheLeft(cells, cell);
  const right = neighborOnTheRight(cells, cell);

  return [left, right];
};

const getDownstairsNeighbors = (cells: TCreatures, cell: ICreature) => {
  const bottom = downstairsNeighbor(cells, cell);
  const southeast = neighborOnTheRight(cells, bottom);
  const southwest = neighborOnTheLeft(cells, bottom);

  return [bottom, southeast, southwest];
};

/**
 * A function that returns the giving creature
 */

export const getNeighbors = (cells: TCreatures, cell: ICreature) => {
  return [
    ...getUpstairsNeighbors(cells, cell),
    ...getSideNeighbors(cells, cell),
    ...getDownstairsNeighbors(cells, cell),
  ];
};
