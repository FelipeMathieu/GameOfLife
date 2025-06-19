import { Group, Layer, Stage } from "react-konva";
import { CELL_SIZE, FIELD_SIZE } from "../common/constants";
import FieldRects from "./field-rects";
import { useState } from "react";

const Board = () => {
  const [error, setError] = useState<Error>();

  if (error) {
    throw error;
  }

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

export default Board;
