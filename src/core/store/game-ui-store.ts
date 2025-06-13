import { create } from "zustand";
import { useShallow } from "zustand/shallow";

interface IState {
  running: boolean;
  generations: number;
  updateRunning: (value: boolean) => void;
  nextGeneration: () => void;
  reset: () => void;
}

const store = create<IState>((set) => ({
  running: false,
  generations: 0,
  updateRunning: (value: boolean) => set(() => ({ running: value })),
  nextGeneration: () =>
    set((state) => ({ generations: state.generations + 1 })),
  reset: () => set(() => ({ generations: 0 })),
}));

export const useRunning = () => {
  const running = store(useShallow((state) => state.running));
  const updateRunning = store((state) => state.updateRunning);

  return { running, updateRunning };
};

export const useGenerations = () => {
  const generations = store(useShallow((state) => state.generations));
  const nextGeneration = store((state) => state.nextGeneration);
  const reset = store((state) => state.reset);

  return { generations, nextGeneration, reset };
};
