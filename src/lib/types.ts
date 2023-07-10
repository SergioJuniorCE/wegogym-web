export type Exercise = {
  name: string;
  sets: number;
  reps: number | string;
  video: string;
};

export type Routines = {
  [key: string]: Exercise[];
};