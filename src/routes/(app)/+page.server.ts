import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {

    // Get current day
    const day = new Date().getDay();
    let targetMuscleGroup = '';
    if (day === 1) {
        targetMuscleGroup = 'Chest';
    } else if (day === 2) {
        targetMuscleGroup = "Quads"
    }

    const categories = [
        "Chest",
        "Quads",
        "Back"
    ]


    const { data } = await locals.supabase
        .from('exercises')
        .select('*')
        .eq('targetMuscleGroup', targetMuscleGroup)
        .order('id', { ascending: true });
    return {
        exercises: data ?? [],
        categories,
        targetMuscleGroup
    };
}) satisfies PageServerLoad;