import type { ICreature } from "../interfaces";

export type TId = `${number},${number}`;
export type TCreatures = Record<TId, ICreature>;
