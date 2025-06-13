import type { ICreature } from "../../common/interfaces";
import { Creature } from "../../common/models";
import type { TCreatures } from "../../common/types";

interface IOptions {
  onEdge: boolean;
  edge: number;
}

const upstairsNeighbor = (
  cells: TCreatures,
  cell: ICreature,
  options?: IOptions
) => {
  if (options?.onEdge) {
    const { edge } = options;

    return cells[`${cell.X},${edge}`] || new Creature(cell.X, edge);
  }

  return cells[`${cell.X},${cell.Y - 1}`] || new Creature(cell.X, cell.Y - 1);
};

const downstairsNeighbor = (
  cells: TCreatures,
  cell: ICreature,
  options?: IOptions
) => {
  if (options?.onEdge) {
    const { edge } = options;

    return cells[`${cell.X},${edge}`] || new Creature(cell.X, edge);
  }

  return cells[`${cell.X},${cell.Y + 1}`] || new Creature(cell.X, cell.Y + 1);
};

const neighborOnTheRight = (
  cells: TCreatures,
  cell: ICreature,
  options?: IOptions
) => {
  if (options?.onEdge) {
    const { edge } = options;

    return cells[`${edge},${cell.Y}`] || new Creature(edge, cell.Y);
  }
  return cells[`${cell.X + 1},${cell.Y}`] || new Creature(cell.X + 1, cell.Y);
};

const neighborOnTheLeft = (
  cells: TCreatures,
  cell: ICreature,
  options?: IOptions
) => {
  if (options?.onEdge) {
    const { edge } = options;

    return cells[`${edge},${cell.Y}`] || new Creature(edge, cell.Y);
  }

  return cells[`${cell.X - 1},${cell.Y}`] || new Creature(cell.X - 1, cell.Y);
};

export const getNeighbors = (
  cells: TCreatures,
  cell: ICreature,
  fieldSize: number
) => {
  const topOrLeftEdge = 0;
  const bottomOrRightEdge = fieldSize - 1;
  const neighbors = Array<ICreature>();

  const top = upstairsNeighbor(cells, cell, {
    edge: cell.Y === 0 ? bottomOrRightEdge : topOrLeftEdge,
    onEdge: cell.Y === 0 || cell.Y === bottomOrRightEdge,
  });
  const bottom = downstairsNeighbor(cells, cell, {
    edge: cell.Y === 0 ? bottomOrRightEdge : topOrLeftEdge,
    onEdge: cell.Y === 0 || cell.Y === bottomOrRightEdge,
  });
  const left = neighborOnTheLeft(cells, cell, {
    edge: cell.X === 0 ? bottomOrRightEdge : topOrLeftEdge,
    onEdge: cell.X === 0 || cell.X === bottomOrRightEdge,
  });
  const right = neighborOnTheRight(cells, cell, {
    edge: cell.X === 0 ? bottomOrRightEdge : topOrLeftEdge,
    onEdge: cell.X === 0 || cell.X === bottomOrRightEdge,
  });

  const northeast = neighborOnTheRight(cells, top, {
    edge: top.X === 0 ? bottomOrRightEdge : topOrLeftEdge,
    onEdge: top.X === 0 || top.X === bottomOrRightEdge,
  });
  const northwest = neighborOnTheLeft(cells, top, {
    edge: top.X === 0 ? bottomOrRightEdge : topOrLeftEdge,
    onEdge: top.X === 0 || top.X === bottomOrRightEdge,
  });
  const southeast = neighborOnTheRight(cells, bottom, {
    edge: bottom.X === 0 ? bottomOrRightEdge : topOrLeftEdge,
    onEdge: bottom.X === 0 || bottom.X === bottomOrRightEdge,
  });
  const southwest = neighborOnTheLeft(cells, bottom, {
    edge: bottom.X === 0 ? bottomOrRightEdge : topOrLeftEdge,
    onEdge: bottom.X === 0 || bottom.X === bottomOrRightEdge,
  });

  neighbors.push(
    ...[top, bottom, left, right, northeast, northwest, southeast, southwest]
  );

  return neighbors;
};
