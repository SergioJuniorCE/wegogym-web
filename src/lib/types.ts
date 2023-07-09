export type Exercise = {
  name: string;
  sets: number;
  reps: number;
  help: string;
};

export type Routines = {
  [key: string]: Exercise[];
};