import { create } from "zustand";
import type { ICreature } from "../../common/interfaces";
import { entries, keyBy, keys, values } from "lodash";
import type { TCreatures, TQuadrant, TQuadrantCells } from "../../common/types";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";
import { produce } from "immer";

interface IState {
  cells: TQuadrantCells;
  maxPopulation: number;
  updateMaxPopulation: (value: number) => void;
  updateCreature: (quadrant: TQuadrant, creature: ICreature) => void;
  batchUpdate: (quadrant: TQuadrant, creatures: ICreature[]) => void;
  killAll: () => void;
}

const store = create<IState>((set) => ({
  cells: {},
  quadrantCells: {},
  maxPopulation: 0,
  updateMaxPopulation: (value: number) => set(() => ({ maxPopulation: value })),
  updateCreature: (quadrant: TQuadrant, creature: ICreature) => {
    const [width, height] = quadrant;
    const key = `${width}${height}` as `${number}${number}`;

    return set(
      produce((state: IState) => {
        console.log(
          "** state.cells[key][`${creature.Id}`]",
          key,
          state.cells[key][`${creature.Id}`]
        );
        return (state.cells[key][`${creature.Id}`] = creature);
      })
    );
  },
  batchUpdate: (quadrant: TQuadrant, creatures: ICreature[]) => {
    const [width, height] = quadrant;
    const key = `${width}${height}` as `${number}${number}`;

    return set(
      produce((state: IState) => {
        const current = state.cells[key];
        const updated = keyBy(creatures, (cell) => cell.Id);

        if (JSON.stringify(current) !== JSON.stringify(updated)) {
          state.cells[key] = updated;
        }

        return state;
      })
    );
  },
  killAll: () =>
    set((state) => {
      const newCells = entries(state.cells).reduce((acc, [key, creatures]) => {
        const cells = values(creatures);

        const updatedCreatures = cells.reduce((obj, cell) => {
          if (cell.Alive) cell.Kill();
          obj[cell.Id] = cell;
          return obj;
        }, {} as TCreatures);

        acc[key as `${number}${number}`] = updatedCreatures;

        return acc;
      }, {} as TQuadrantCells);

      return { cells: newCells };
    }),
}));

export const useCreaturesStore = store;

export const useCreatures = (quadrant: TQuadrant) => {
  const key = `${quadrant[0]}${quadrant[1]}` as `${number}${number}`;

  const { batchUpdate: storeBatchUpdate, updateCreature: storeUpdateCreature } =
    store.getState();

  const quadrantCells = store(
    useMemo(() => (state) => state.cells[key], [key])
  );

  const creatures = useMemo(() => values(quadrantCells), [quadrantCells]);

  const batchUpdate = (creatures: ICreature[]) =>
    storeBatchUpdate(quadrant, creatures);

  const updateCreature = (creature: ICreature) =>
    storeUpdateCreature(quadrant, creature);

  return {
    creatures,
    updateCreature,
    batchUpdate,
  };
};

export const usePopulation = () => {
  const cells = store((state) => state.cells);

  const livingCells = useMemo(
    () =>
      keys(cells)
        .map((key) =>
          values(cells[key as `${number}${number}`]).filter(
            (cell) => cell.Alive
          )
        )
        .flat(),
    [cells]
  );
  const population = livingCells.length;
  const maxPopulation = store(useShallow((state) => state.maxPopulation));
  const updateMaxPopulation = store.getState().updateMaxPopulation;
  const killAll = store.getState().killAll;

  return {
    population,
    maxPopulation,
    livingCells,
    updateMaxPopulation,
    killAll,
  };
};
