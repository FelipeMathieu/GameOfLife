import type { Rect } from "konva/lib/shapes/Rect";
import { createContext } from "react";

interface IState {
  rectsRef: React.RefObject<Record<string, Rect>>;
  resetCells: () => void;
}

export const FieldContext = createContext<IState>({
  rectsRef: {
    current: {},
  },
  resetCells: () => {},
});
