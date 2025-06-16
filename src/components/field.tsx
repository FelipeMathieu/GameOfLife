import { Card, Flex } from "antd";
import GameInfo from "./game-info";
import { CELL_SIZE, FIELD_SIZE } from "../common/constants";
import { Layer, Rect, Stage } from "react-konva";
import { useEffect, useMemo, useRef, useState } from "react";
import { Creature } from "../common/models";
import { useCreatures, useRunning } from "../core/store";
import type { ICreature } from "../common/interfaces";
import { useGameLoop } from "./hooks/canvas-render";
import { values } from "lodash";
import type { Layer as KonvaLayer } from "konva/lib/Layer";
import KnownForms from "./known-forms";
import Header from "./header";

const Field = () => {
  const { cells, batchUpdate, updateCreature } = useCreatures();
  const layerRef = useRef<KonvaLayer | null>(null);
  const { running } = useRunning();
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState(1);

  const animate = useGameLoop(layerRef);

  const onCellClick = (cell: ICreature) => {
    if (!running) {
      if (cell.Alive) cell.Kill();
      else cell.Revive();

      updateCreature(cell);
    }
  };

  const rects = useMemo(() => {
    return values(cells).map((cell) => (
      <Rect
        key={`${cell.X},${cell.Y}`}
        x={cell.X * CELL_SIZE}
        y={cell.Y * CELL_SIZE}
        width={CELL_SIZE}
        height={CELL_SIZE}
        fill={cell.Alive ? "black" : "white"}
        stroke="gray"
        onClick={() => onCellClick(cell)}
        onTap={() => onCellClick(cell)}
      />
    ));
  }, [cells, running]);

  const onNextGeneration = (times?: number) => {
    if (!running) {
      animate(performance.now(), times || states);
    }
  };

  useEffect(() => {
    const creatures: ICreature[] = [];

    for (let y = 0; y < FIELD_SIZE; y++) {
      for (let x = 0; x < FIELD_SIZE; x++) {
        creatures.push(new Creature(x, y, false));
      }
    }

    batchUpdate(creatures);
    setLoading(false);

    layerRef.current?.batchDraw();
  }, [FIELD_SIZE]);

  return (
    <Card loading={loading}>
      <Flex vertical gap={20} align="center" justify="center">
        <Header />

        <GameInfo
          states={states}
          setStates={setStates}
          onNextGeneration={onNextGeneration}
        />

        <KnownForms />

        <Stage width={FIELD_SIZE * CELL_SIZE} height={FIELD_SIZE * CELL_SIZE}>
          <Layer ref={layerRef}>{rects}</Layer>
        </Stage>
      </Flex>
    </Card>
  );
};

export default Field;
