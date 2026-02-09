import { createClient } from '@supabase/supabase-js';

// Environment variables - Next.js automatically replaces NEXT_PUBLIC_ vars at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Only log once on client if not configured
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.info('ℹ️ Supabase not configured - using static portfolio data');
}

// Create Supabase client with error handling
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder', 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'portfolio-app',
    },
  },
});

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

export type Database = {
  personal_info: {
    id: string;
    name: string;
    full_name: string;
    title: string;
    tagline: string;
    email: string;
    location: string;
    bio: string;
    extended_bio: string;
    created_at: string;
    updated_at: string;
  };
  stats: {
    id: string;
    value: string;
    label: string;
    order: number;
    created_at: string;
  };
  experiences: {
    id: string;
    year: string;
    title: string;
    company: string;
    description: string;
    order: number;
    created_at: string;
  };
  skills: {
    id: string;
    name: string;
    level: number;
    icon_name: string;
    color_from: string;
    color_to: string;
    order: number;
    created_at: string;
  };
  tech_categories: {
    id: string;
    title: string;
    icon_name: string;
    gradient_from: string;
    gradient_to: string;
    technologies: string[];
    order: number;
    created_at: string;
  };
  projects: {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    gradient_from: string;
    gradient_to: string;
    live_url: string;
    github_url: string;
    order: number;
    created_at: string;
  };
  social_links: {
    id: string;
    platform: string;
    label: string;
    href: string;
    username: string;
    order: number;
    created_at: string;
  };
};