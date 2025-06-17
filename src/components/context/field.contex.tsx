import type { Layer } from "konva/lib/Layer";
import type { Rect } from "konva/lib/shapes/Rect";
import { useRef, type PropsWithChildren } from "react";
import { FieldContext } from "./context";
import { useCreatures } from "../../core/store";
import { keys } from "lodash";

export const FieldProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { cells } = useCreatures();
  const layerRef = useRef<Layer | null>(null);
  const rectsRef = useRef<Record<string, Rect>>({});

  const resetCells = () => {
    keys(cells).forEach((key) => {
      const rect = rectsRef.current[key];

      if (rect) {
        rect.fill("white");
      }
    });

    layerRef?.current?.batchDraw();
  };

  return (
    <FieldContext.Provider value={{ layerRef, rectsRef, resetCells }}>
      {children}
    </FieldContext.Provider>
  );
};
