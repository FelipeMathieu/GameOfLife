import { StyledCard } from "./styled/card.style";
import { useFieldControl } from "./hooks/field-control";
import { Flex } from "antd";
import GameInfo from "./game-info";
import { CELL_SIZE, FIELD_SIZE } from "../common/constants";

const Field = () => {
  const canvasRef = useFieldControl();

  return (
    <StyledCard>
      <Flex vertical gap={10} align="center">
        <GameInfo />
        <canvas
          ref={canvasRef}
          width={FIELD_SIZE * CELL_SIZE}
          height={FIELD_SIZE * CELL_SIZE}
          style={{
            width: `${FIELD_SIZE * CELL_SIZE}px`,
            height: `${FIELD_SIZE * CELL_SIZE}px`,
            margin: "0",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            display: "block",
            imageRendering: "pixelated",
          }}
        />
      </Flex>
    </StyledCard>
  );
};

export default Field;
