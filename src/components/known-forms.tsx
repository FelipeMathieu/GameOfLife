import { Card, Flex } from "antd";
import { FIELD_SIZE } from "../common/constants";
import { memo, useEffect, useState } from "react";
import {
  useCreatures,
  useGenerations,
  usePopulation,
  useRunning,
} from "../core/store";
import {
  buildBlinker,
  buildBlock,
  buildBoat,
  buildGlider,
  buildToad,
} from "../core/helper";
import { buildLightweightSpaceship } from "../core/helper/build-lightweight-spaceship";
import type { ICreature } from "../common/interfaces";

const images = {
  block: new URL("../assets/block.png", import.meta.url).href,
  boat: new URL("../assets/boat.png", import.meta.url).href,
  blinker: new URL("../assets/blinker.png", import.meta.url).href,
  toad: new URL("../assets/toad.png", import.meta.url).href,
  glider: new URL("../assets/glider.png", import.meta.url).href,
  "lightweight-spaceship": new URL(
    "../assets/lightweight-spaceship.png",
    import.meta.url
  ).href,
};

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
  const { reset } = useGenerations();
  const { population } = usePopulation();
  const { cells, batchUpdate, killAll } = useCreatures();
  const [selectedForm, setSelectedForm] = useState<TKnownForms>();

  const handleUpdate = (creatures: ICreature[]) => {
    batchUpdate(creatures);
  };

  useEffect(() => {
    if (population === 0 || running) {
      setSelectedForm(undefined);
    }
  }, [population, running]);

  const buildForm = (form: TKnownForms) => {
    switch (form) {
      case "boat": {
        buildBoat(cells, CENTER, handleUpdate);
        break;
      }
      case "blinker": {
        buildBlinker(cells, CENTER, handleUpdate);
        break;
      }
      case "toad": {
        buildToad(cells, CENTER, handleUpdate);
        break;
      }
      case "glider": {
        buildGlider(cells, CENTER, handleUpdate);
        break;
      }
      case "lightweight-spaceship": {
        buildLightweightSpaceship(cells, CENTER, handleUpdate);
        break;
      }
      default: {
        buildBlock(cells, CENTER, handleUpdate);
        break;
      }
    }
  };

  const onClick = (form: TKnownForms) => {
    if (!running) {
      reset();
      killAll();
      setSelectedForm(form);
      buildForm(form);
    }
  };

  return (
    <Flex
      style={{ width: "100%" }}
      align="center"
      justify="center"
      gap={10}
      wrap
    >
      <Card
        style={{ padding: 0, background: color(selectedForm === "block") }}
        hoverable={!running}
        onClick={() => onClick("block")}
      >
        <Flex justify="center" align="center">
          <img alt="block" src={images.block} />
        </Flex>
      </Card>

      <Card
        style={{ padding: 0, background: color(selectedForm === "boat") }}
        hoverable={!running}
        onClick={() => onClick("boat")}
      >
        <Flex justify="center" align="center">
          <img alt="boat" src={images.boat} />
        </Flex>
      </Card>

      <Card
        style={{ padding: 0, background: color(selectedForm === "blinker") }}
        hoverable={!running}
        onClick={() => onClick("blinker")}
      >
        <Flex justify="center" align="center">
          <img alt="blinker" src={images.blinker} />
        </Flex>
      </Card>

      <Card
        style={{ padding: 0, background: color(selectedForm === "toad") }}
        hoverable={!running}
        onClick={() => onClick("toad")}
      >
        <Flex justify="center" align="center">
          <img alt="toad" src={images.toad} />
        </Flex>
      </Card>

      <Card
        style={{ padding: 0, background: color(selectedForm === "glider") }}
        hoverable={!running}
        onClick={() => onClick("glider")}
      >
        <Flex justify="center" align="center">
          <img alt="glider" src={images.glider} />
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
          <img
            alt="lightweight-spaceship"
            src={images["lightweight-spaceship"]}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default memo(KnownForms);
