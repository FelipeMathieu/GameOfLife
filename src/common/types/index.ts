import type { ICreature } from "../interfaces";

export type TCreatures = Record<string, ICreature>;
export type TQuadrant = [number, number];
export type TQuadrantCells = Record<`${number}${number}`, TCreatures>;
