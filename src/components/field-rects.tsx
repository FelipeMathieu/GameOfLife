import { useCreatures } from "../core/store";
import { values } from "lodash";
import CreatureRect from "./creature-rect";

const FieldRects = () => {
  const { cells } = useCreatures();

  return (
    <>
      {values(cells).map((cell) => (
        <CreatureRect key={`${cell.Id}-${cell.Alive}`} creature={cell} />
      ))}
    </>
  );
};

export default FieldRects;
