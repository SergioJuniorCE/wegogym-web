import type { Database } from "$lib/database.types";
import type { Workout } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export class WorkoutService {
  static async getWorkouts({ supabase }: { supabase: SupabaseClient<Database> }) {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      return null;
    }

    if (!data) {
      return null;
    }

    return data as Workout[];
  }
}