import type { SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import type { Exercise } from '$lib/types';
import { getDay } from '$lib/utils';
import type { Database } from '$lib/database.types';

export const load = (async ({ locals, url }) => {
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