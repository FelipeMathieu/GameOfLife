import { create } from "zustand";
import type { ICreature } from "../../common/interfaces";
import { keyBy, values } from "lodash";
import type { TCreatures } from "../../common/types";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";

interface IState {
  cells: TCreatures;
  maxPopulation: number;
  updateMaxPopulation: (value: number) => void;
  updateCreature: (creature: ICreature) => void;
  batchUpdate: (creatures: ICreature[]) => void;
}

const store = create<IState>((set) => ({
  cells: {},
  maxPopulation: 0,
  updateMaxPopulation: (value: number) => set(() => ({ maxPopulation: value })),
  updateCreature: (creature: ICreature) => {
    return set((state) => ({
      cells: {
        ...state.cells,
        [`${creature.X},${creature.Y}`]: creature,
      },
    }));
  },
  batchUpdate: (creatures: ICreature[]) =>
    set((state) => ({
      cells: {
        ...state.cells,
        ...keyBy(creatures, (item) => `${item.X},${item.Y}`),
      },
    })),
}));

export const useCreaturesStore = store;

export const useCreatures = () => {
  const cells = store((state) => state.cells);

  const livingCells = useMemo(
    () => values(cells).filter((cell) => cell.Alive),
    [cells]
  );

  const { batchUpdate, updateCreature } = store.getState();

  const killAll = () => {
    livingCells.forEach((cell) => cell.Kill());

    batchUpdate(livingCells);
  };

  return {
    cells,
    updateCreature,
    batchUpdate,
    livingCells,
    killAll,
  };
};

export const usePopulation = () => {
  const { livingCells } = useCreatures();
  const population = livingCells.length;
  const maxPopulation = store(useShallow((state) => state.maxPopulation));
  const updateMaxPopulation = store.getState().updateMaxPopulation;

  return { population, maxPopulation, updateMaxPopulation };
};
