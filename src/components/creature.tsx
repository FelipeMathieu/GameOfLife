import { Rect } from "react-konva";
import { CELL_SIZE } from "../common/constants";
import type { ICreature } from "../common/interfaces";
import { memo } from "react";

interface ICreatureComponent {
  onClick: () => void;
  creature: ICreature;
}

const CreatureComponent: React.FC<ICreatureComponent> = ({
  creature,
  onClick,
}) => {
  return (
    <Rect
      key={`${creature.Id}-${creature.Alive}`}
      x={creature.X * CELL_SIZE}
      y={creature.Y * CELL_SIZE}
      width={CELL_SIZE}
      height={CELL_SIZE}
      fill={creature.Alive ? "black" : "white"}
      stroke="gray"
      onClick={onClick}
      onTap={onClick}
    />
  );
};

export default memo(CreatureComponent);
