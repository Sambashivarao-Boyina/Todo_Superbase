import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_SUPERBASE_URL!;
const supabaseAnonKey: string = import.meta.env.VITE_SUPERBASE_ANON_KEY!;



const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);


export default supabase;
