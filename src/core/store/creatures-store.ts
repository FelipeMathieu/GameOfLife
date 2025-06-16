import { create } from "zustand";
import type { ICreature } from "../../common/interfaces";
import { keyBy, values } from "lodash";
import type { TCreatures } from "../../common/types";
import { useShallow } from "zustand/shallow";

interface IState {
  cells: TCreatures;
  maxPopulation: number;
  updateMaxPopulation: (value: number) => void;
  updateCreature: (creature: ICreature) => void;
  batchUpdate: (creatures: ICreature[]) => void;
  killAll: () => void;
}

const store = create<IState>((set) => ({
  cells: {},
  updatedCreature: null,
  maxPopulation: 0,
  updateMaxPopulation: (value: number) => set(() => ({ maxPopulation: value })),
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
}));

export const useCreaturesStore = store;

export const useCreatures = () => {
  const cells = store((state) => state.cells);
  const { batchUpdate, updateCreature, killAll } = store.getState();

  return { cells, updateCreature, batchUpdate, killAll };
};

export const usePopulation = () => {
  const cells = store.getState().cells;
  const population = values(cells).filter((item) => item.Alive).length;
  const maxPopulation = store(useShallow((state) => state.maxPopulation));
  const updateMaxPopulation = store.getState().updateMaxPopulation;

  return { population, maxPopulation, updateMaxPopulation };
};
