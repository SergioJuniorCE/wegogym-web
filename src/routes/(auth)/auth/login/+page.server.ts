import { supabase } from '$lib/supabaseClient';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { UserService } from '$lib/services/User.service';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());

        const { data, error: err } = await locals.supabase.auth.signInWithPassword({
            email: body.email as string,
            password: body.password as string,
        });

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    error: 'Invalid email or password'
                })
            }
            return fail(500, {
                error: 'Internal server error'
            })
        }

        if (!data) {
            return fail(500, {
                error: 'Internal server error'
            })
        }

        const hasProfile = await UserService.hasProfile(data.user);

        if (!hasProfile) {
            throw redirect(303, '/profile');
        }

        throw redirect(303, '/');

    }
};

