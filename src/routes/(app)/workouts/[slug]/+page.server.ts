import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { WorkoutService } from '$lib/services/Workout.service';

export const load = (async ({ locals, params }) => {
    const session = await locals.getSession();

    if (!session) {
        throw error(401, 'Unauthorized');
    }

    const { slug } = params;

    const workout = await WorkoutService.getWorkoutFromSlug(slug);

    if (!workout) {
        throw error(404, 'Not found');
    }

    return {
        workout
    };
}) satisfies PageServerLoad;