import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import '../styles/globals.css';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Toaster } from 'sonner';
import { isSupabaseConfigured } from '../lib/supabase';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Log environment check (removed in production build)
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Portfolio loaded in development mode');
      console.log('📊 Supabase configured:', isSupabaseConfigured() ? 'Yes (using database)' : 'No (using static data)');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Rhod Lenard Villanueva - Web Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
        <Toaster position="top-right" richColors closeButton />
      </ErrorBoundary>
    </>
  );
}
