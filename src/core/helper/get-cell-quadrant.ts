import { FIELD_SIZE, CELL_SIZE } from "../../common/constants";
import type { TQuadrant } from "../../common/types";

export const getCellQuadrant = (x: number, y: number): TQuadrant => [
  x * FIELD_SIZE * CELL_SIZE,
  y * FIELD_SIZE * CELL_SIZE,
];
