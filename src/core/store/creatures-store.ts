import { create } from "zustand";
import type { ICreature } from "../../common/interfaces";
import { keyBy, values } from "lodash";
import type { TCreatures } from "../../common/types";
import { subscribeWithSelector } from "zustand/middleware";

interface IState {
  cells: TCreatures;
  updatedCreature: ICreature | null;
  updateCreature: (creature: ICreature) => void;
  updateCreatureNeighbors: (neighbors: ICreature[]) => void;
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
    updateCreatureNeighbors: (neighbors: ICreature[]) =>
      set((state) => ({
        cells: {
          ...state.cells,
          ...keyBy(neighbors, (item) => `${item.X},${item.Y}`),
        },
      })),
  }))
);

export const useCreatures = () => {
  const cells = store((state) => state.cells);
  const cellsSub = (callback: (cells: TCreatures) => void) =>
    store.subscribe((state) => state.cells, callback);
  const updateCreatureNeighbors = store(
    (state) => state.updateCreatureNeighbors
  );

  return { cells, cellsSub, updateCreatureNeighbors };
};

export const usePopulation = () => {
  const { cells } = useCreatures();
  return values(cells).filter((item) => item.Alive).length;
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
