import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals}) => {
    const { body } = request;

    console.log('body', body);

    return new Response();
};