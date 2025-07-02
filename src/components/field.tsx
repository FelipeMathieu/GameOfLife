import { Card, Flex, Spin } from "antd";
import GameInfo from "./game-info/game-info";
import { lazy, Suspense, useState } from "react";
import { useRunning } from "../core/store";
import { useGameLoop } from "./hooks/canvas-render";
import KnownForms from "./known-forms";
import Header from "./header";
import { useCreateCreatures } from "./hooks/create-creatures";

const BoardComponent = lazy(() => import("./board"));

const Field = () => {
  const [states, setStates] = useState(1);
  const { running } = useRunning();

  const animate = useGameLoop();

  const onNextGeneration = (times?: number) => {
    if (!running) {
      animate(performance.now(), times || states);
    }
  };

  const loading = useCreateCreatures();

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

        <Suspense fallback={<Spin spinning size="large" />}>
          <BoardComponent />
        </Suspense>
      </Flex>
    </Card>
  );
};

export default Field;
