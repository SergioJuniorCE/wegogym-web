import type { Database } from "./database.types";

export type Exercise = Database["public"]["Tables"]["exercises"]["Row"];

export type Routines = {
  [key: string]: Exercise[];
};