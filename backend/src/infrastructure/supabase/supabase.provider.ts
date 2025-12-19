import { createClient } from '@supabase/supabase-js';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

export const SupabaseProvider = {
    provide: SUPABASE_CLIENT,
    useFactory: () => {
        const supabaseUrl = process.env.SUPABASE_URL || "";
        const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

        return createClient(supabaseUrl, supabaseKey, {
            auth: { persistSession: false }
        });
    },
};