import { supabase } from "$lib/supabaseClient";
import type { Exercise, Workout } from "$lib/types";
export class WorkoutService {
  static async getExercise(exerciseId: number) {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', exerciseId)
      .order('id', { ascending: true })
      .single();

    if (error) {
      return null;
    }

    if (!data) {
      return null;
    }

    return data as Exercise;

  }
  static async getWorkoutFromSlug(slug: string) {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('id', slug)
      .order('id', { ascending: true })
      .single();

    if (error) {
      return null;
    }

    if (!data) {
      return null;
    }

    return data as Workout;
  };
  static async getWorkouts() {
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

  static async getWorkoutFromUser(userId: string) {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user', userId)
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