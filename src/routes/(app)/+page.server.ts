import type { SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import type { Exercise, UserExercise, Workout } from '$lib/types';
import { getDay } from '$lib/utils';
import type { Database } from '$lib/database.types';
import { WorkoutService } from '$lib/services/Workout.service';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals, url }) => {
    const session = await locals.getSession();

    if (!session) {
        throw error(401, 'Unauthorized');
    }

    const workouts = await WorkoutService.getWorkoutFromUser({
        supabase: locals.supabase,
        userId: session.user.id
    });


    const exercises: Map<Workout, UserExercise[]> = new Map();

    if (workouts) {
        for (const workout of workouts) {
            const { data, error } = await locals.supabase
                .from('user_exercises')
                .select('*')
                .eq('workout', workout.id)
                .order('id', { ascending: true });

            if (error) {
                throw error;
            }

            if (!data) {
                throw error;
            }

            exercises.set(workout, data as UserExercise[]);
        }
    }

    console.log(exercises);

    return {
        workouts
    }
}) satisfies PageServerLoad;



async function fetchExercises({ supabase, targetMuscleGroup }: { supabase: SupabaseClient<Database>, targetMuscleGroup: string }) {
    const { data } = await supabase
        .from('exercises')
        .select('*')
        .eq('targetMuscleGroup', targetMuscleGroup)
        .order('id', { ascending: true });
    return data as Exercise[];
}

async function fetchBack({ supabase }: { supabase: SupabaseClient<Database> }) {
    const { data } = await supabase
        .from('exercises')
        .select('*')
        .in('targetMuscleGroup', ["Back", "Lats", "Upper Back"])
        .order('id', { ascending: true });
    console.log(data);
    return data as Exercise[];
}

async function legacyCode({ locals, url }: {
    locals: App.Locals,
    url: URL
}) {
    const selectedWorkout = url.searchParams.get('workout')

    if (!selectedWorkout) {

    }

    // Get current day
    const day = getDay();

    let targetMuscleGroup = '';
    switch (day) {
        case 1:
            targetMuscleGroup = 'Chest';
            break;
        case 2:
            targetMuscleGroup = 'Quads';
            break;
        case 3:
            targetMuscleGroup = 'Back';
            break;
        default:
            targetMuscleGroup = 'Chest';
            break;
    }
    const categories = [
        "Chest",
        "Quads",
        "Back"
    ]

    let data;

    if (targetMuscleGroup === 'Back') {
        data = await fetchBack({ supabase: locals.supabase });
    } else {
        data = await fetchExercises({ supabase: locals.supabase, targetMuscleGroup });
    }

    return {
        exercises: data ?? [],
        categories,
        targetMuscleGroup
    };
}