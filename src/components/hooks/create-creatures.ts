import { useEffect, useState } from "react";
import type { ICreature } from "../../common/interfaces";
import { FIELD_SIZE, SCENE_HEIGHT, SCENE_WIDTH } from "../../common/constants";
import { Creature } from "../../common/models";
import { useCreaturesStore } from "../../core/store/creatures-store";
import { getCellQuadrant } from "../../core/helper";

export const useCreateCreatures = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const batchUpdate = useCreaturesStore.getState().batchUpdate;

    const fillQuadrantCreatures = (width: number, height: number) => {
      const creatures: ICreature[] = [];
      const quadrant = getCellQuadrant(width, height);

      for (let y = 0; y < FIELD_SIZE; y++) {
        for (let x = 0; x < FIELD_SIZE; x++) {
          creatures.push(new Creature(x, y, false));
        }
      }

      batchUpdate(quadrant, creatures);
    };

    for (let height = 0; height < SCENE_HEIGHT; height++) {
      for (let width = 0; width < SCENE_WIDTH; width++) {
        fillQuadrantCreatures(width, height);
      }
    }

    setLoading(false);
  }, [FIELD_SIZE, SCENE_HEIGHT, SCENE_WIDTH]);

  return loading;
};
