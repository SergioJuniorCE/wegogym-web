import type { Database } from '$lib/database.types';
import type { Exercise } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {

    // Get current day
    const day = new Date().getDay();
    let targetMuscleGroup = '';
    if (day === 1) {
        targetMuscleGroup = 'Chest';
    } else if (day === 2) {
        targetMuscleGroup = "Quads"
    } else if (day === 3) {
        targetMuscleGroup = "Back"
    }

    const categories = [
        "Chest",
        "Quads",
        "Back"
    ]

    let data: Exercise[];

    if (targetMuscleGroup === "Back") {
        data = await getBackExercises({ locals, targetMuscleGroup });
    } else {
        data = await getExercises({ locals, targetMuscleGroup });
    }


    return {
        exercises: data ?? [],
        categories,
        targetMuscleGroup
    };
}) satisfies PageServerLoad;

async function getExercises({ locals, targetMuscleGroup }: { locals: App.Locals, targetMuscleGroup: string }): Promise<Exercise[]> {
    const { data } = await locals.supabase
        .from('exercises')
        .select('*')
        .eq('targetMuscleGroup', targetMuscleGroup)
        .order('id', { ascending: true });
    return data as Exercise[];
}

async function getBackExercises({ locals, targetMuscleGroup }: { locals: App.Locals, targetMuscleGroup: string }): Promise<Exercise[]> {
    const { data } = await locals.supabase
        .from('exercises')
        .select('*')
        .in('targetMuscleGroup', ['Back', 'Lats'])
    return data as Exercise[];
}