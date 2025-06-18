import { useEffect, useState } from "react";
import { FIELD_SIZE } from "../../common/constants";
import type { ICreature } from "../../common/interfaces";
import { Creature } from "../../common/models";
import { useCreaturesStore } from "../../core/store";

export const useCreateCreatures = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const batchUpdate = useCreaturesStore.getState().batchUpdate;
    const creatures: ICreature[] = [];

    for (let y = 0; y < FIELD_SIZE; y++) {
      for (let x = 0; x < FIELD_SIZE; x++) {
        creatures.push(new Creature(x, y, false));
      }
    }

    batchUpdate(creatures);

    setLoading(false);
  }, [FIELD_SIZE]);

  return loading;
};
