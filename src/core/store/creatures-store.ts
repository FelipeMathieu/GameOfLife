import { create } from "zustand";
import type { ICreature } from "../../common/interfaces";
import { keyBy, values } from "lodash";
import type { TCreatures } from "../../common/types";
import { useShallow } from "zustand/shallow";
import { subscribeWithSelector } from "zustand/middleware";

interface IState {
  cells: TCreatures;
  maxPopulation: number;
  updateMaxPopulation: (value: number) => void;
  updateCreature: (creature: ICreature) => void;
  batchUpdate: (creatures: ICreature[], modifyCreatures?: boolean) => void;
  killAll: () => void;
}

const store = create(
  subscribeWithSelector<IState>((set) => ({
    cells: {},
    updatedCreature: null,
    maxPopulation: 0,
    updateMaxPopulation: (value: number) =>
      set(() => ({ maxPopulation: value })),
    updateCreature: (creature: ICreature) => {
      creature.Modify();

      return set((state) => ({
        cells: {
          ...state.cells,
          [`${creature.X},${creature.Y}`]: creature,
        },
        updatedCreature: creature,
      }));
    },
    batchUpdate: (creatures: ICreature[], modifyCreatures = true) =>
      set((state) => ({
        cells: {
          ...state.cells,
          ...keyBy(
            creatures.map((cell) => {
              if (modifyCreatures) cell.Modify();
              return cell;
            }),
            (item) => `${item.X},${item.Y}`
          ),
        },
      })),
    killAll: () =>
      set((state) => {
        const deadCreatures = values(state.cells).map((creature) => {
          creature.Kill(true);
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
  const cellsSub = (callback: (creatures: TCreatures) => void) =>
    store.subscribe((state) => state.cells, callback, {
      fireImmediately: true,
    });
  const { batchUpdate, updateCreature, killAll } = store.getState();

  return { cells, cellsSub, updateCreature, batchUpdate, killAll };
};

export const usePopulation = () => {
  const cells = store.getState().cells;
  const population = values(cells).filter((item) => item.Alive).length;
  const maxPopulation = store(useShallow((state) => state.maxPopulation));
  const updateMaxPopulation = store.getState().updateMaxPopulation;

  return { population, maxPopulation, updateMaxPopulation };
};
