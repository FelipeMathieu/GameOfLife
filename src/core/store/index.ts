import { create } from "zustand";
import type { ICreature } from "../../common/interfaces";
import { values } from "lodash";

interface IState {
  cells: Record<`${number},${number}`, ICreature>;
}

const store = create<IState>(() => ({
  cells: {},
}));

export const useCreatures = () => store((state) => state.cells);

export const usePopulation = () => {
  const cells = useCreatures();
  return values(cells).filter((item) => item.Alive).length;
};

export const updateCreature = (creature: ICreature) => {
  store.setState((state) => ({
    cells: { ...state.cells, [`${creature.X},${creature.Y}`]: creature },
  }));
};
