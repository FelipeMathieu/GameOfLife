import type { Layer } from "konva/lib/Layer";
import type { Rect } from "konva/lib/shapes/Rect";
import { createContext } from "react";

interface IState {
  layerRef: React.RefObject<Layer | null>;
  rectsRef: React.RefObject<Record<string, Rect>>;
  resetCells: () => void;
}

export const FieldContext = createContext<IState>({
  layerRef: {
    current: null,
  },
  rectsRef: {
    current: {},
  },
  resetCells: () => {},
});
