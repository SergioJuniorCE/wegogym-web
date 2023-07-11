import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const { data, error: err } = await locals.supabase.from("workouts").select("*");

    if (err) {
        throw error(500, err.message);
    }

    return {
        workouts: data ?? []
    };
}) satisfies PageServerLoad;