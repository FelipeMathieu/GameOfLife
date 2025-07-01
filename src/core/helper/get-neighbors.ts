import { FIELD_SIZE } from "../../common/constants";
import type { ICreature } from "../../common/interfaces";
import type { TCreatures } from "../../common/types";

const topOrLeftEdge = 0;
const bottomOrRightEdge = FIELD_SIZE - 1;

/**
 * Gets the cell directly above the current one,
 * wrapping to the bottom if it's on the top edge.
 */
const upstairsNeighbor = (cells: TCreatures, cell: ICreature) => {
  const newY = cell.Y - 1;
  const x = cell.X;
  const y = newY < topOrLeftEdge ? bottomOrRightEdge : newY;

  return cells[`${x},${y}`];
};

/**
 * Gets the cell directly below the current one,
 * wrapping to the top if it's on the bottom edge.
 */
const downstairsNeighbor = (cells: TCreatures, cell: ICreature) => {
  const newY = cell.Y + 1;
  const x = cell.X;
  const y = newY > bottomOrRightEdge ? topOrLeftEdge : newY;

  return cells[`${x},${y}`];
};

/**
 * Gets the cell directly to the right of the current one,
 * wrapping to the left edge if it's on the right edge.
 */
const neighborOnTheRight = (cells: TCreatures, cell: ICreature) => {
  const newX = cell.X + 1;
  const x = newX > bottomOrRightEdge ? topOrLeftEdge : newX;
  const y = cell.Y;

  return cells[`${x},${y}`];
};

/**
 * Gets the cell directly to the left of the current one,
 * wrapping to the right edge if it's on the left edge.
 */
const neighborOnTheLeft = (cells: TCreatures, cell: ICreature) => {
  const newX = cell.X - 1;
  const x = newX < topOrLeftEdge ? bottomOrRightEdge : newX;
  const y = cell.Y;

  return cells[`${x},${y}`];
};

/**
 * Gets the three neighbors above the current cell: top, top-right, and top-left.
 */
const getUpstairsNeighbors = (cells: TCreatures, cell: ICreature) => {
  const top = upstairsNeighbor(cells, cell);
  const northeast = neighborOnTheRight(cells, top);
  const northwest = neighborOnTheLeft(cells, top);

  return [top, northeast, northwest];
};

/**
 * Gets the two horizontal neighbors: left and right.
 */
const getSideNeighbors = (cells: TCreatures, cell: ICreature) => {
  const left = neighborOnTheLeft(cells, cell);
  const right = neighborOnTheRight(cells, cell);

  return [left, right];
};

/**
 * Gets the three neighbors below the current cell: bottom, bottom-right, and bottom-left.
 */
const getDownstairsNeighbors = (cells: TCreatures, cell: ICreature) => {
  const bottom = downstairsNeighbor(cells, cell);
  const southeast = neighborOnTheRight(cells, bottom);
  const southwest = neighborOnTheLeft(cells, bottom);

  return [bottom, southeast, southwest];
};

/**
 * Returns all 8 neighbors of a given cell, accounting for edge wrapping.
 * Neighbors are ordered: top, top-right, top-left, left, right, bottom, bottom-right, bottom-left.
 */
export const getNeighbors = (cells: TCreatures, cell: ICreature) => {
  return [
    ...getUpstairsNeighbors(cells, cell),
    ...getSideNeighbors(cells, cell),
    ...getDownstairsNeighbors(cells, cell),
  ];
};
