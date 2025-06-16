import type { Rect } from "konva/lib/shapes/Rect";
import type { ICreature } from "../../common/interfaces/index";

export const fillCreature = (
  cell: ICreature,
  rectsRef: React.RefObject<Record<string, Rect>>
) => {
  const rect = rectsRef.current[`${cell.X},${cell.Y}`];

  if (rect) {
    rect.fill(cell.Alive ? "black" : "white");
  }
};
