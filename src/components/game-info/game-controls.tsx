import {
  ClearOutlined,
  ForwardOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  StepForwardFilled,
} from "@ant-design/icons";
import { Button, Col, Flex, InputNumber, Row, Typography } from "antd";
import {
  useCreatures,
  useGenerations,
  usePopulation,
  useRunning,
} from "../../core/store";
import { memo, useCallback } from "react";

interface IGameControls {
  states: number;
  setStates: React.Dispatch<React.SetStateAction<number>>;
  onNextGeneration: (times?: number) => void;
}

const GameControls: React.FC<IGameControls> = ({
  onNextGeneration,
  setStates,
  states,
}) => {
  const { killAll } = useCreatures();
  const { population } = usePopulation();
  const { running, updateRunning } = useRunning();
  const { reset } = useGenerations();

  const onPlay = useCallback(() => {
    if (!running) {
      updateRunning(true);
    }
  }, [running]);

  const onPause = () => {
    updateRunning(false);
  };

  const onClear = () => {
    reset();
    killAll();
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Flex align="center" justify="center" gap={10}>
          <Button
            color="danger"
            onClick={onClear}
            variant="filled"
            icon={<ClearOutlined />}
            disabled={running}
          />
          <Button
            color={!running ? "blue" : "default"}
            onClick={onPause}
            variant="filled"
            icon={<PauseOutlined />}
          />
          <Button
            data-testid="play-button"
            onClick={onPlay}
            color={running ? "blue" : "default"}
            variant="filled"
            icon={<PlayCircleOutlined />}
            disabled={population < 1}
          />
          <Button
            onClick={() => {
              onPlay();
              onNextGeneration(1);
            }}
            variant="filled"
            icon={<StepForwardFilled />}
            disabled={running || population < 1}
          />
        </Flex>
      </Col>
      <Col span={24}>
        <Flex align="flex-end" justify="center" gap={8}>
          <Flex vertical align="flex-start">
            <Typography.Text type="secondary">
              Number of generations to advance:
            </Typography.Text>
            <InputNumber
              value={states}
              onChange={(value) => {
                if (value) setStates(value);
              }}
              min={1}
              step={1}
              precision={0}
              disabled={running}
              style={{
                width: "100%",
              }}
            />
          </Flex>
          <Button
            onClick={() => {
              onPlay();
              onNextGeneration();
            }}
            variant="filled"
            icon={<ForwardOutlined />}
            disabled={running || population < 1}
          />
        </Flex>
      </Col>
    </Row>
  );
};

export default memo(GameControls);
