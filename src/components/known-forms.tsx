import { Card, Flex } from "antd";
import { FIELD_SIZE } from "../common/constants";
import { memo, useContext, useEffect, useState } from "react";
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
  fillCreature,
} from "../core/helper";
import { buildLightweightSpaceship } from "../core/helper/build-lightweight-spaceship";
import { FieldContext } from "./context/context";
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
  const { layerRef, rectsRef, resetCells } = useContext(FieldContext);
  const { running } = useRunning();
  const { reset } = useGenerations();
  const { population } = usePopulation();
  const { killAll, cells, batchUpdate } = useCreatures();
  const [selectedForm, setSelectedForm] = useState<TKnownForms>();

  const handleUpdate = (creatures: ICreature[]) => {
    creatures.forEach((cell) => fillCreature(cell, rectsRef));

    batchUpdate(creatures);
    layerRef?.current?.batchDraw();
  };

  useEffect(() => {
    if (population === 0 || running) {
      setSelectedForm(undefined);
    }
  }, [population, running]);

  const buildForm = (form: TKnownForms) => {
    resetCells();

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
      killAll();
      reset();
      buildForm(form);
      setSelectedForm(form);
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
