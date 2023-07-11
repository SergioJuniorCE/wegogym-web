import { supabase } from '$lib/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const exercise = {
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
        const { data, error } = await supabase
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