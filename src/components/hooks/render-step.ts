import { clone, isEmpty, values } from "lodash";
import type { ICreature } from "../../common/interfaces";
import {
  useCreatures,
  useCreaturesStore,
  useGenerations,
} from "../../core/store";
import { verifyCreatureState } from "../../core/helper/creatures-control";
import { useContext } from "react";
import { FieldContext } from "../context/context";
import { fillCreature } from "../../core/helper";

export const useRenderStep = () => {
  const { rectsRef } = useContext(FieldContext);
  const { batchUpdate } = useCreatures();
  const { nextGeneration } = useGenerations();

  return () => {
    const creatures = useCreaturesStore.getState().cells;
    const updatedCells: ICreature[] = [];

    values(creatures).forEach((cell) => {
      const clonedCell = clone(cell);
      verifyCreatureState(clonedCell, creatures);

      if (clonedCell.Alive !== cell.Alive) {
        fillCreature(clonedCell, rectsRef);
        updatedCells.push(clonedCell);
      }
    });

    if (!isEmpty(updatedCells)) {
      batchUpdate(updatedCells);
    }

    nextGeneration();
  };
};
