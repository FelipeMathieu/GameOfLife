import { clone, isEmpty, values } from "lodash";
import type { ICreature } from "../../common/interfaces";
import { useCreaturesStore, useGameUIStore } from "../../core/store";
import { verifyCreatureState } from "../../core/helper/creatures-control";

/**
 * Returns a function that processes one simulation step (generation) of the game.
 * It calculates the next state of each creature and applies updates in batch.
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
