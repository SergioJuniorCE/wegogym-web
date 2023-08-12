import type { Database } from "./database.types";


export type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Workout = Database["public"]["Tables"]["workouts"]["Row"];
export type UserExercise = Database["public"]["Tables"]["user_exercises"]["Row"];

export type Routines = {
  [key: string]: Exercise[];
};