import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        
        {/* SEO */}
        <meta name="description" content="Rhod Lenard Villanueva - Modern Web Developer specializing in React, Next.js, TypeScript, and full-stack development." />
        <meta name="keywords" content="web developer, react developer, nextjs, typescript, full-stack developer, rhod lenard villanueva" />
        <meta name="author" content="Rhod Lenard Villanueva" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rhod Lenard Villanueva - Web Developer" />
        <meta property="og:description" content="Modern Web Developer specializing in React, Next.js, TypeScript, and full-stack development." />
        <meta property="og:site_name" content="Rhod Lenard Portfolio" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rhod Lenard Villanueva - Web Developer" />
        <meta name="twitter:description" content="Modern Web Developer specializing in React, Next.js, TypeScript, and full-stack development." />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        
        {/* Fonts - Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
