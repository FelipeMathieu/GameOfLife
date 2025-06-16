import { useEffect } from "react";
import { useCreatures } from "../../core/store";
import type { TCreatures } from "../../common/types";
import { isEmpty, values } from "lodash";
import { fillCreature } from "../../core/helper";
import type { Rect } from "konva/lib/shapes/Rect";

export const useWatchCreatures = (
  rectsRef: React.RefObject<Record<string, Rect>>
) => {
  const { cellsSub, batchUpdate } = useCreatures();

  const watchCreatures = (creatures: TCreatures) => {
    const modifiedCreatures = values(creatures).filter((cell) => cell.Modified);

    if (!isEmpty(modifiedCreatures)) {
      modifiedCreatures.forEach((cell) => {
        fillCreature(cell, rectsRef);
        cell.ResetModify();
      });

      batchUpdate(modifiedCreatures, false);
    }
  };

  const sub = cellsSub(watchCreatures);

  useEffect(() => {
    return () => {
      sub();
    };
  }, [cellsSub]);
};
