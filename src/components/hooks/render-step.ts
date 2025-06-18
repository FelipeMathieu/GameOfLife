import { clone, isEmpty, values } from "lodash";
import type { ICreature } from "../../common/interfaces";
import { useCreaturesStore, useGameUIStore } from "../../core/store";
import { verifyCreatureState } from "../../core/helper/creatures-control";

/**
 * Returns a function that goes over the cells
 */
export const useRenderStep = () => {
  return () => {
    const nextGeneration = useGameUIStore.getState().nextGeneration;
    const batchUpdate = useCreaturesStore.getState().batchUpdate;
    const cells = useCreaturesStore.getState().cells;
    const updatedCells: ICreature[] = [];

    values(cells).forEach((cell) => {
      const clonedCell = clone(cell);
      verifyCreatureState(clonedCell, cells);

      if (clonedCell.Alive !== cell.Alive) {
        updatedCells.push(clonedCell);
      }
    });

    if (!isEmpty(updatedCells)) {
      batchUpdate(updatedCells);
    }

    nextGeneration();
  };
};
