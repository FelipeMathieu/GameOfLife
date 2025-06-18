import type { Rect } from "konva/lib/shapes/Rect";
import { createContext, useContext } from "react";

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

export const useFieldContext = () => {
  const context = useContext(FieldContext);

  if (typeof context === "undefined") {
    throw new Error("useFieldContext should be used within the FieldProvider");
  }

  return context;
};
