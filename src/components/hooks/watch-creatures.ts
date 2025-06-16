import { useCallback, useEffect } from "react";
import { useCreatures } from "../../core/store";
import type { TCreatures } from "../../common/types";
import { isEmpty, values } from "lodash";
import { fillCreature } from "../../core/helper";
import type { Rect } from "konva/lib/shapes/Rect";
import type { Layer } from "konva/lib/Layer";

export const useWatchCreatures = (
  layerRef: React.RefObject<Layer | null>,
  rectsRef: React.RefObject<Record<string, Rect>>
) => {
  const { cellsSub, batchUpdate } = useCreatures();

  const watchCreatures = useCallback(
    (creatures: TCreatures) => {
      const modifiedCreatures = values(creatures).filter(
        (cell) => cell.Modified
      );

      if (!isEmpty(modifiedCreatures)) {
        modifiedCreatures.forEach((cell) => {
          fillCreature(cell, rectsRef);
          cell.ResetModify();
        });

        layerRef?.current?.batchDraw();
        batchUpdate(modifiedCreatures, false);
      }
    },
    [rectsRef, layerRef, batchUpdate]
  );

  useEffect(() => {
    const unsubscribe = cellsSub(watchCreatures);
    return () => unsubscribe();
  }, [cellsSub, watchCreatures]);
};
