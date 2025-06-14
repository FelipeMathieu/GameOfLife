import { create } from "zustand";
import type { ICreature } from "../../common/interfaces";
import { keyBy, values } from "lodash";
import type { TCreatures } from "../../common/types";
import { subscribeWithSelector } from "zustand/middleware";

interface IState {
  cells: TCreatures;
  updatedCreature: ICreature | null;
  updateCreature: (creature: ICreature) => void;
  batchUpdate: (creatures: ICreature[]) => void;
  killAll: () => void;
}

const store = create(
  subscribeWithSelector<IState>((set) => ({
    cells: {},
    updatedCreature: null,
    updateCreature: (creature: ICreature) =>
      set((state) => ({
        cells: {
          ...state.cells,
          [`${creature.X},${creature.Y}`]: creature,
        },
        updatedCreature: creature,
      })),
    batchUpdate: (creatures: ICreature[]) =>
      set((state) => ({
        cells: {
          ...state.cells,
          ...keyBy(creatures, (item) => `${item.X},${item.Y}`),
        },
      })),
    killAll: () =>
      set((state) => {
        const deadCreatures = values(state.cells).map((creature) => {
          creature.Kill();
          return creature;
        });

        return {
          cells: {
            ...keyBy(deadCreatures, (item) => `${item.X},${item.Y}`),
          },
          maxPopulation: 0,
        };
      }),
  }))
);

export const useCreaturesStore = store;

export const useCreatures = () => {
  const cells = store((state) => state.cells);
  const cellsSub = (callback: (cells: TCreatures) => void) =>
    store.subscribe((state) => state.cells, callback);
  const batchUpdate = store((state) => state.batchUpdate);
  const killAll = store((state) => state.killAll);

  return { cells, cellsSub, batchUpdate, killAll };
};

export const usePopulation = () => {
  const { cells } = useCreatures();
  const population = values(cells).filter((item) => item.Alive).length;

  return { population };
};

export const useUpdatedCreature = () => {
  const updatedCreature = store((state) => state.updatedCreature);
  const updatedCreatureSub = (callback: (creature: ICreature | null) => void) =>
    store.subscribe((state) => state.updatedCreature, callback, {
      fireImmediately: true,
    });
  const updateCreature = store((state) => state.updateCreature);

  return { updatedCreature, updatedCreatureSub, updateCreature };
};
