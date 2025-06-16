import { clone, isEmpty, values } from "lodash";
import type { ICreature } from "../../common/interfaces";
import {
  useCreatures,
  useCreaturesStore,
  useGenerations,
} from "../../core/store";
import { verifyCreatureState } from "../../core/helper/creatures-control";
import type { Layer as KonvaLayer } from "konva/lib/Layer";

export const useRenderStep = (layerRef: React.RefObject<KonvaLayer | null>) => {
  const { batchUpdate } = useCreatures();
  const { nextGeneration } = useGenerations();

  return () => {
    const creatures = useCreaturesStore.getState().cells;
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
      layerRef.current?.batchDraw();
    }

    nextGeneration();
  };
};
