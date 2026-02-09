import React, { createContext, useContext, ReactNode } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { FullPageLoader } from '../components/LoadingSpinner';

// Types match the static data structure
interface PersonalInfo {
  name: string;
  fullName: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  bio: string;
  extendedBio: string;
}

interface Stat {
  value: string;
  label: string;
  gradient: string;
  border: string;
  textColor: string;
}

interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
}

interface Skill {
  name: string;
  level: number;
  icon: any;
  color: string;
}

interface TechCategory {
  title: string;
  icon: any;
  gradient: string;
  techs: string[];
}

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  liveUrl: string;
  githubUrl: string;
}

interface SocialLink {
  icon: any;
  label: string;
  href: string;
  color: string;
  username: string;
}

interface ContactInfo {
  heading: string;
  description: string;
  formPlaceholders: {
    name: string;
    email: string;
    message: string;
  };
}

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  stats: Stat[];
  experiences: Experience[];
  skills: Skill[];
  techCategories: TechCategory[];
  projects: Project[];
  socialLinks: SocialLink[];
  contactInfo: ContactInfo;
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

interface PortfolioProviderProps {
  children: ReactNode;
  showLoader?: boolean;
}

export function PortfolioProvider({ children, showLoader = true }: PortfolioProviderProps) {
  const data = usePortfolioData();

  // Show loading state while fetching data
  if (showLoader && data.loading) {
    return <FullPageLoader />;
  }

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Custom hook to use portfolio data
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

// Individual hooks for specific data - these work both inside and outside provider
export { 
  usePersonalInfo, 
  useStats, 
  useExperiences, 
  useSkills, 
  useTechCategories, 
  useProjects, 
  useSocialLinks,
  useContactInfo 
} from '../hooks/usePortfolioData';
