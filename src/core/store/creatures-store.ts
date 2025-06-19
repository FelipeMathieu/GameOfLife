import { create } from "zustand";
import type { ICreature } from "../../common/interfaces";
import { clone, keyBy, values } from "lodash";
import type { TCreatures } from "../../common/types";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";
import { subscribeWithSelector } from "zustand/middleware";

interface IState {
  cells: TCreatures;
  maxPopulation: number;
  updateMaxPopulation: (value: number) => void;
  updateCreature: (creature: ICreature) => void;
  batchUpdate: (creatures: ICreature[]) => void;
}

const store = create(
  subscribeWithSelector<IState>((set) => ({
    cells: {},
    maxPopulation: 0,
    updateMaxPopulation: (value: number) =>
      set(() => ({ maxPopulation: value })),
    updateCreature: (creature: ICreature) =>
      set((state) => ({
        cells: {
          ...state.cells,
          [`${creature.Id}`]: clone(creature),
        },
      })),
    batchUpdate: (creatures: ICreature[]) =>
      set((state) => ({
        cells: {
          ...state.cells,
          ...keyBy(creatures, (item) => `${item.Id}`),
        },
      })),
  }))
);

export const useCreaturesStore = store;

export const useCreatures = () => {
  const cells = store((state) => state.cells);
  const cellsSub = (callback: (creatures: TCreatures) => void) =>
    store.subscribe((state) => state.cells, callback, {
      fireImmediately: true,
    });

  const livingCells = useMemo(
    () => values(cells).filter((cell) => cell.Alive),
    [cells]
  );

  const { batchUpdate, updateCreature, updateMaxPopulation } = store.getState();

  const killAll = () => {
    livingCells.forEach((cell) => cell.Kill());

    batchUpdate(livingCells);
    updateMaxPopulation(0);
  };

  return {
    cells,
    updateCreature,
    batchUpdate,
    livingCells,
    killAll,
    cellsSub,
  };
};

export const usePopulation = () => {
  const { livingCells } = useCreatures();
  const population = livingCells.length;
  const maxPopulation = store(useShallow((state) => state.maxPopulation));
  const updateMaxPopulation = store.getState().updateMaxPopulation;

  return { population, maxPopulation, updateMaxPopulation };
};
