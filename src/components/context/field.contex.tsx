import type { Rect } from "konva/lib/shapes/Rect";
import { useRef, type PropsWithChildren } from "react";
import { FieldContext } from "./context";
import { useCreatures } from "../../core/store";

export const FieldProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { livingCells, batchUpdate } = useCreatures();
  const rectsRef = useRef<Record<string, Rect>>({});

  const resetCells = () => {
    livingCells.forEach((cell) => {
      const rect = rectsRef.current[`${cell.X},${cell.Y}`];

      if (rect) {
        rect.fill("white");
      }

      cell.Kill();
    });

    batchUpdate(livingCells);
  };

  return (
    <FieldContext.Provider value={{ rectsRef, resetCells }}>
      {children}
    </FieldContext.Provider>
  );
};
