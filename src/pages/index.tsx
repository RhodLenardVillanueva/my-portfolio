import Head from "next/head";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { HeroSection } from "../components/HeroSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Rhod Lenard Villanueva - Web Developer Portfolio</title>
        <meta
          name="description"
          content="Experienced web developer specializing in React, Next.js, TypeScript, Tailwind CSS, and full-stack development. View my projects and get in touch."
        />
        <meta
          property="og:title"
          content="Rhod Lenard Villanueva - Web Developer Portfolio"
        />
        <meta property="og:url" content="https://yoursite.com" />
        <link rel="canonical" href="https://yoursite.com" />
      </Head>
      <ErrorBoundary>
        <div className="bg-black text-white min-h-screen overflow-x-hidden">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </ErrorBoundary>
    </>
  );
}
