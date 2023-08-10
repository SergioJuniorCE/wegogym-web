import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
    const { email } = await request.json() as { email: string | undefined };

    if (!email) {
        return new Response('Email is required', { status: 400 });
    }

    const { error } = await locals.supabase.auth.signOut();

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return new Response('Logged out', { status: 200 });
};