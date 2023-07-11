import type { PageServerLoad } from './$types';
import { supabase } from "$lib/supabaseClient";

export const load = (async () => {
    const { data } = await supabase
        .from('exercises')
        .select('*')
        .order('id', { ascending: true });
    return {
        exercises: data ?? []
    };
}) satisfies PageServerLoad;