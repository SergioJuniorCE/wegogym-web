import { supabase } from "$lib/supabaseClient";
import type { Exercise } from "$lib/types";

export class ExerciseService {
  static async getExercises() {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      return null;
    }

    if (!data) {
      return null;
    }

    return data as Exercise[];
  }
}