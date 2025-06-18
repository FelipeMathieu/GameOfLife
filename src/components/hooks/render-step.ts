import { clone, isEmpty, values } from "lodash";
import type { ICreature } from "../../common/interfaces";
import {
  useCreatures,
  useCreaturesStore,
  useGenerations,
} from "../../core/store";
import { verifyCreatureState } from "../../core/helper/creatures-control";
import type { TQuadrant } from "../../common/types";
import { useCallback } from "react";

/**
 * Returns a function that goes over the Creatures and updates them for rendering
 */
export const useRenderStep = (quadrant: TQuadrant) => {
  const [width, height] = quadrant;
  const { batchUpdate } = useCreatures(quadrant);
  const { nextGeneration } = useGenerations();

  return useCallback(() => {
    const creatures = useCreaturesStore.getState().cells[`${width}${height}`];
    const updatedCells: ICreature[] = [];

    values(creatures).forEach((cell) => {
      const clonedCell = clone(cell);
      verifyCreatureState(clonedCell, creatures);

      if (clonedCell.Alive !== cell.Alive) {
        updatedCells.push(clonedCell);
      }
    });

    if (!isEmpty(updatedCells)) {
      batchUpdate(updatedCells);
    }

    nextGeneration();
  }, [quadrant]);
};
