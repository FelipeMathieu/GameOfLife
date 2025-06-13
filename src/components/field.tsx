import { StyledCard } from "./styled/card.style";
import { useFieldControl } from "./hooks/field-control";
import { Flex } from "antd";
import GameInfo from "./game-info";

const INITIAL_CELL_SIZE = 30;

interface IField {
  size: number;
}

const Field: React.FC<IField> = ({ size }) => {
  const { canvasRef } = useFieldControl(size);

  return (
    <StyledCard>
      <Flex vertical gap={10} align="center">
        <GameInfo />
        <canvas
          ref={canvasRef}
          width={size * INITIAL_CELL_SIZE}
          height={size * INITIAL_CELL_SIZE}
          style={{
            margin: "0",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        />
      </Flex>
    </StyledCard>
  );
};

export default Field;
