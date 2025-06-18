import { useCreatures } from "../core/store";
import { values } from "lodash";
import CreatureRect from "./creature-rect";

const FieldRects = () => {
  const { cells } = useCreatures();

  return (
    <>
      {values(cells).map((cell) => (
        <CreatureRect
          key={`${cell.X},${cell.Y}-${cell.Alive}`}
          creature={cell}
        />
      ))}
    </>
  );
};

export default memo(FieldRects);
