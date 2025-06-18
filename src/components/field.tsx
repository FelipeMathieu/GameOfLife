import { Card, Flex } from "antd";
import GameInfo from "./game-info";
import { CELL_SIZE, FIELD_SIZE } from "../common/constants";
import { Group, Layer, Stage } from "react-konva";
import { useEffect, useState } from "react";
import { Creature } from "../common/models";
import { useCreaturesStore, useGameUIStore } from "../core/store";
import type { ICreature } from "../common/interfaces";
import { useGameLoop } from "./hooks/canvas-render";
import KnownForms from "./known-forms";
import Header from "./header";
import FieldRects from "./field-rects";

const Field = () => {
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState(1);

  const animate = useGameLoop();

  const onNextGeneration = (times?: number) => {
    const running = useGameUIStore.getState().running;

    if (!running) {
      animate(performance.now(), times || states);
    }
  };

  useEffect(() => {
    const batchUpdate = useCreaturesStore.getState().batchUpdate;
    const creatures: ICreature[] = [];

    for (let y = 0; y < FIELD_SIZE; y++) {
      for (let x = 0; x < FIELD_SIZE; x++) {
        creatures.push(new Creature(x, y, false));
      }
    }

    batchUpdate(creatures);

    setLoading(false);
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
          <Layer>
            <Group>
              <FieldRects />
            </Group>
          </Layer>
        </Stage>
      </Flex>
    </Card>
  );
};

export default Field;
