import { Card, Flex } from "antd";
import GameInfo from "./game-info";
import { CELL_SIZE, FIELD_SIZE } from "../common/constants";
import { Group, Layer, Stage } from "react-konva";
import { useState } from "react";
import { useRunning } from "../core/store";
import { useGameLoop } from "./hooks/canvas-render";
import KnownForms from "./known-forms";
import Header from "./header";
import FieldRects from "./field-rects";
import { useCreateCreatures } from "./hooks/create-creatures";

const Field = () => {
  const [states, setStates] = useState(1);
  const { running } = useRunning();
  const [error, setError] = useState<Error>();

  if (error) {
    throw error;
  }

  const animate = useGameLoop();

  const onNextGeneration = (times?: number) => {
    if (!running) {
      animate(performance.now(), times || states);
    }
  };

  const loading = useCreateCreatures();

  const renderCanvas = () => {
    try {
      return (
        <Stage width={FIELD_SIZE * CELL_SIZE} height={FIELD_SIZE * CELL_SIZE}>
          <Layer>
            <Group>
              <FieldRects />
            </Group>
          </Layer>
        </Stage>
      );
    } catch (canvasError) {
      setError(
        canvasError instanceof Error
          ? canvasError
          : new Error(String(canvasError))
      );
      return null;
    }
  };

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

        {renderCanvas()}
      </Flex>
    </Card>
  );
};

export default Field;
