import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
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

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const workout = {
            name: formData.get('name') as string,
            videoId: formData.get('videoId') as string,
            targetMuscleGroup: formData.get('targetMuscleGroup') as string,
            exerciseType: formData.get('exerciseType') as string,
            equipmentRequired: formData.get('equipmentRequired') as string,
            mechanics: formData.get('mechanics') as string,
            forceType: formData.get('forceType') as string,
            experienceLevel: formData.get('experienceLevel') as string,
            secondaryMuscles: formData.get('secondaryMuscles') as string,
        }
        const { data, error } = await locals.supabase
            .from('exercises')
            .insert(exercise);

        if (error) console.log('error :>> ', error);

        return {
            status: 302,
            headers: {
                location: '/exercises',
            },
        };

    }
};