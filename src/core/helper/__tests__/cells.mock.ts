import { values } from "lodash";
import { Creature } from "../../../common/models";
import type { TCreatures } from "../../../common/types";

export const MOCKED_CELLS: TCreatures = {
  [`${0},${0}`]: new Creature(0, 0, false),
  [`${0},${1}`]: new Creature(0, 1, false),
  [`${0},${2}`]: new Creature(0, 2, false),
  [`${0},${3}`]: new Creature(0, 3, false),
  [`${0},${4}`]: new Creature(0, 4, false),
  [`${0},${5}`]: new Creature(0, 5, false),
  [`${1},${0}`]: new Creature(1, 0, false),
  [`${1},${1}`]: new Creature(1, 1, false),
  [`${1},${2}`]: new Creature(1, 2, false),
  [`${1},${3}`]: new Creature(1, 3, false),
  [`${1},${4}`]: new Creature(1, 4, false),
  [`${1},${5}`]: new Creature(1, 5, false),
  [`${2},${0}`]: new Creature(2, 0, false),
  [`${2},${1}`]: new Creature(2, 1, false),
  [`${2},${2}`]: new Creature(2, 2, false),
  [`${2},${3}`]: new Creature(2, 3, false),
  [`${2},${4}`]: new Creature(2, 4, false),
  [`${2},${5}`]: new Creature(2, 5, false),
  [`${3},${0}`]: new Creature(3, 0, false),
  [`${3},${1}`]: new Creature(3, 1, false),
  [`${3},${2}`]: new Creature(3, 2, false),
  [`${3},${3}`]: new Creature(3, 3, false),
  [`${3},${4}`]: new Creature(3, 4, false),
  [`${3},${5}`]: new Creature(3, 5, false),
  [`${4},${0}`]: new Creature(4, 0, false),
  [`${4},${1}`]: new Creature(4, 1, false),
  [`${4},${2}`]: new Creature(4, 2, false),
  [`${4},${3}`]: new Creature(4, 3, false),
  [`${4},${4}`]: new Creature(4, 4, false),
  [`${4},${5}`]: new Creature(4, 5, false),
  [`${5},${0}`]: new Creature(5, 0, false),
  [`${5},${1}`]: new Creature(5, 1, false),
  [`${5},${2}`]: new Creature(5, 2, false),
  [`${5},${3}`]: new Creature(5, 3, false),
  [`${5},${4}`]: new Creature(5, 4, false),
  [`${5},${5}`]: new Creature(5, 5, false),
};

export const killAllMockedCells = () =>
  values(MOCKED_CELLS).forEach((cell) => cell.Kill());
