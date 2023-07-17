import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const session = await locals.getSession();
    if (!session) {
        throw error(401, "Unauthorized");
    }

    const { data, error: err } = await locals.supabase
        .from("workouts")
        .select("*")
        .eq("user", session.user.id);

    if (err) {
        throw error(500, err.message);
    }

    return {
        workouts: data ?? []
    };
}) satisfies PageServerLoad;