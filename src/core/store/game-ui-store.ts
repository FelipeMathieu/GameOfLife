import { create } from "zustand";
import { useShallow } from "zustand/shallow";

interface IState {
  running: boolean;
  updateRunning: (value: boolean) => void;
}

const store = create<IState>((set) => ({
  running: false,
  updateRunning: (value: boolean) => set(() => ({ running: value })),
}));

export const useRunning = () => {
  const running = store(useShallow((state) => state.running));
  const updateRunning = store((state) => state.updateRunning);

  return { running, updateRunning };
};
