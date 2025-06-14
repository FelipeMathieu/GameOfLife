import { Card, Flex } from "antd";
import { FIELD_SIZE } from "../common/constants";
import { memo, useEffect, useState } from "react";
import { useCreatures, usePopulation, useRunning } from "../core/store";
import {
  buildBlinker,
  buildBlock,
  buildBoat,
  buildGlider,
  buildToad,
} from "../core/helper";
import { buildLightweightSpaceship } from "../core/helper/build-lightweight-spaceship";

const CENTER = Math.floor(FIELD_SIZE / 2);

const SELECTED = "#e6f4ff";
type TKnownForms =
  | "block"
  | "boat"
  | "blinker"
  | "toad"
  | "glider"
  | "lightweight-spaceship";

const color = (isSelected: boolean) => (isSelected ? SELECTED : "white");

const KnownForms = () => {
  const { running } = useRunning();
  const { population } = usePopulation();
  const { killAll, cells, batchUpdate } = useCreatures();
  const [selectedForm, setSelectedForm] = useState<TKnownForms>();

  useEffect(() => {
    if (population === 0 || running) {
      setSelectedForm(undefined);
    }
  }, [population, running]);

  const buildForm = (form: TKnownForms) => {
    switch (form) {
      case "boat": {
        buildBoat(cells, CENTER, batchUpdate);
        break;
      }
      case "blinker": {
        buildBlinker(cells, CENTER, batchUpdate);
        break;
      }
      case "toad": {
        buildToad(cells, CENTER, batchUpdate);
        break;
      }
      case "glider": {
        buildGlider(cells, CENTER, batchUpdate);
        break;
      }
      case "lightweight-spaceship": {
        buildLightweightSpaceship(cells, CENTER, batchUpdate);
        break;
      }
      default: {
        buildBlock(cells, CENTER, batchUpdate);
        break;
      }
    }
  };

  const onClick = (form: TKnownForms) => {
    killAll();

    buildForm(form);

    setSelectedForm(form);
  };

  return (
    <Flex style={{ width: "100%" }} align="center" gap={10} wrap>
      <Card
        style={{ padding: 0, background: color(selectedForm === "block") }}
        hoverable={!running}
        onClick={() => onClick("block")}
      >
        <Flex justify="center" align="center">
          <img alt="block" src="/src/assets/block.png" />
        </Flex>
      </Card>

      <Card
        style={{ padding: 0, background: color(selectedForm === "boat") }}
        hoverable={!running}
        onClick={() => onClick("boat")}
      >
        <Flex justify="center" align="center">
          <img alt="block" src="/src/assets/boat.png" />
        </Flex>
      </Card>

      <Card
        style={{ padding: 0, background: color(selectedForm === "blinker") }}
        hoverable={!running}
        onClick={() => onClick("blinker")}
      >
        <Flex justify="center" align="center">
          <img alt="block" src="/src/assets/blinker.png" />
        </Flex>
      </Card>

      <Card
        style={{ padding: 0, background: color(selectedForm === "toad") }}
        hoverable={!running}
        onClick={() => onClick("toad")}
      >
        <Flex justify="center" align="center">
          <img alt="block" src="/src/assets/toad.png" />
        </Flex>
      </Card>

      <Card
        style={{ padding: 0, background: color(selectedForm === "glider") }}
        hoverable={!running}
        onClick={() => onClick("glider")}
      >
        <Flex justify="center" align="center">
          <img alt="block" src="/src/assets/glider.png" />
        </Flex>
      </Card>

      <Card
        style={{
          padding: 0,
          background: color(selectedForm === "lightweight-spaceship"),
        }}
        hoverable={!running}
        onClick={() => onClick("lightweight-spaceship")}
      >
        <Flex justify="center" align="center">
          <img alt="block" src="/src/assets/lightweight-spaceship.png" />
        </Flex>
      </Card>
    </Flex>
  );
};

export default memo(KnownForms);
