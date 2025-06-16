import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { FPS } from "../../common/constants";

interface IState {
  running: boolean;
  generations: number;
  fps: number;
  updateFps: (value: number) => void;
  updateRunning: (value: boolean) => void;
  nextGeneration: () => void;
  reset: () => void;
}

const store = create<IState>((set) => ({
  running: false,
  generations: 0,
  fps: FPS,
  updateFps: (value: number) => set(() => ({ fps: value })),
  updateRunning: (value: boolean) => set(() => ({ running: value })),
  nextGeneration: () =>
    set((state) => ({ generations: state.generations + 1 })),
  reset: () => set(() => ({ generations: 0 })),
}));

export const useGameUIStore = store;

export const useRunning = () => {
  const running = store(useShallow((state) => state.running));
  const fps = store(useShallow((state) => state.fps));
  const { updateRunning, updateFps } = store.getState();

  return { running, fps, updateRunning, updateFps };
};

export const useGenerations = () => {
  const generations = store(useShallow((state) => state.generations));
  const nextGeneration = store((state) => state.nextGeneration);
  const reset = store((state) => state.reset);

  return { generations, nextGeneration, reset };
};
