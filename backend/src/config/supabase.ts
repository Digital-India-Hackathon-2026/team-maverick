import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Create a reusable Supabase client using the Service Role Key
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

export const verifySupabaseConnection = async (): Promise<boolean> => {
    try {
        // Simple query to verify connection
        const { error } = await supabase.from('users').select('id').limit(1);

        if (error) {
            console.error('Supabase query error:', error.message);
            return false;
        }

        return true;
    } catch (error: any) {
        console.error('Supabase connection error:', error.message);
        return false;
    }
};
