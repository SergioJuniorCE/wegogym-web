import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Database } from '$lib/database.types';

export const load = (async ({ locals }) => {
    const { data, error: err } = await locals.supabase
        .from('exercises')
        .select("*")
        .order('targetMuscleGroup', { ascending: true });

    if (err) {
        console.error(err);
        throw error(500, 'Unable to fetch exercises');
    }

    if (!data) {
        throw error(404, 'Exercises not found');
    }

    return {
        exercises: data as Database["public"]["Tables"]["exercises"]["Row"][],
    };
}) satisfies PageServerLoad;