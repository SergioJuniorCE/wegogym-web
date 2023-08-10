import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { UserService } from '$lib/services/User.service';

export const load = (async ({ locals }) => {
    const session = await locals.getSession();

    const user = session?.user;

    if (!user) {
        throw redirect(303, '/login');
    }

    const profile = await UserService.getProfile(user);

    return {
        user,
        profile
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();

        const session = await locals.getSession();

        const user = session?.user;

        if (!user) {
            throw redirect(303, '/login');
        }

        const name = formData.get('name') as string;

        if (!name) {
            return {
                status: 400,
                message: 'Name is required'
            }
        }

        const { data, error: err } = await locals.supabase
            .from('profiles')
            .upsert({
                user: user.id,
                name: formData.get('name') as string,
            })
            .eq('user', user.id);

        if (err) {
            console.error(err);
        }
    }
};