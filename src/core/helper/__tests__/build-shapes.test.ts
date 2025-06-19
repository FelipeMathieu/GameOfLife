import { afterEach, describe, expect, it, vi } from "vitest";
import { killAllMockedCells, MOCKED_CELLS } from "./cells.mock";
import { buildBlinker } from "../build-blinker";
import type { ICreature } from "../../../common/interfaces";
import { buildBlock } from "../build-block";
import { buildBoat } from "../build-boat";
import { buildGlider } from "../build-glider";
import { buildLightweightSpaceship } from "../build-lightweight-spaceship";

const CENTER = Math.floor(5 / 2);

const updateCallbackSpy = vi.fn();

describe("Build shape helpers", () => {
  const makeSureAllCreaturesAreLiving = () => {
    const [updatedCreatures] = updateCallbackSpy.mock.calls[0] as [ICreature[]];

    const allAlive = updatedCreatures.every((creature) => creature.Alive);

    expect(allAlive).toBe(true);
  };

  afterEach(() => {
    killAllMockedCells();
  });

  it("should return the blinker cells", () => {
    buildBlinker(MOCKED_CELLS, CENTER, updateCallbackSpy);

    expect(updateCallbackSpy).toHaveBeenCalledTimes(1);
    makeSureAllCreaturesAreLiving();
  });

  it("should return the block cells", () => {
    buildBlock(MOCKED_CELLS, CENTER, updateCallbackSpy);

    expect(updateCallbackSpy).toHaveBeenCalledTimes(1);
    makeSureAllCreaturesAreLiving();
  });

  it("should return the boat cells", () => {
    buildBoat(MOCKED_CELLS, CENTER, updateCallbackSpy);

    expect(updateCallbackSpy).toHaveBeenCalledTimes(1);
    makeSureAllCreaturesAreLiving();
  });

  it("should return the glider cells", () => {
    buildGlider(MOCKED_CELLS, CENTER, updateCallbackSpy);

    expect(updateCallbackSpy).toHaveBeenCalledTimes(1);
    makeSureAllCreaturesAreLiving();
  });

  it("should return the lightweight-spaceship cells", () => {
    buildLightweightSpaceship(MOCKED_CELLS, CENTER, updateCallbackSpy);

    expect(updateCallbackSpy).toHaveBeenCalledTimes(1);
    makeSureAllCreaturesAreLiving();
  });
});
