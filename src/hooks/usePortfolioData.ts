import {
  Boxes,
  Code2,
  Cog,
  Database,
  Github,
  Globe,
  Linkedin,
  LucideIcon,
  Mail,
  Palette,
  Shield,
  Smartphone,
  TestTube,
  Twitter,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  contactInfo as staticContactInfo,
  experiences as staticExperiences,
  personalInfo as staticPersonalInfo,
  projects as staticProjects,
  skills as staticSkills,
  socialLinks as staticSocialLinks,
  stats as staticStats,
  techCategories as staticTechCategories,
} from "../data/portfolio";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

// Database record types
interface DbStat {
  id: string;
  value: string;
  label: string;
  order: number;
}

interface DbExperience {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  order: number;
}

interface DbSkill {
  id: string;
  name: string;
  level: number;
  icon_name: string;
  color_from: string;
  color_to: string;
  order: number;
}

interface DbTechCategory {
  id: string;
  title: string;
  icon_name: string;
  gradient_from: string;
  gradient_to: string;
  technologies: string[];
  order: number;
}

interface DbProject {
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
}

interface DbSocialLink {
  id: string;
  platform: string;
  label: string;
  href: string;
  username: string;
  order: number;
}

// Icon mapping for database values (both capitalized and lowercase)
const iconMap: Record<string, LucideIcon> = {
  Code2,
  Palette,
  Smartphone,
  Zap,
  Database,
  Cog,
  Shield,
  TestTube,
  Boxes,
  Globe,
  Mail,
  Github,
  Linkedin,
  Twitter,
  // Lowercase aliases
  code2: Code2,
  palette: Palette,
  smartphone: Smartphone,
  zap: Zap,
  database: Database,
  cog: Cog,
  shield: Shield,
  testtube: TestTube,
  boxes: Boxes,
  globe: Globe,
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

// Helper to get icon component from string name
const getIcon = (iconName: string) =>
  iconMap[iconName] || iconMap[iconName.toLowerCase()] || Code2;

// Personal Info Hook
export function usePersonalInfo() {
  const [data, setData] = useState(staticPersonalInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const { data: result, error: fetchError } = await supabase
          .from("personal_info")
          .select("*")
          .single();

        if (fetchError) throw fetchError;

        if (result) {
          setData({
            name: result.name,
            fullName: result.full_name,
            title: result.title,
            tagline: result.tagline,
            email: result.email,
            location: result.location || "",
            bio: result.bio,
            extendedBio: result.extended_bio,
          });
        }
      } catch (err: unknown) {
        // Silently fall back to static data on CORS/network errors
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Stats Hook
export function useStats() {
  const [data, setData] = useState(staticStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const { data: result, error: fetchError } = await supabase
          .from("stats")
          .select("*")
          .order("order", { ascending: true });

        if (fetchError) throw fetchError;

        if (result && result.length > 0) {
          setData(
            (result as DbStat[]).map((stat: DbStat, index: number) => ({
              value: stat.value,
              label: stat.label,
              gradient:
                staticStats[index]?.gradient ||
                "from-indigo-900/20 to-purple-900/10",
              border: staticStats[index]?.border || "border-indigo-500/20",
              textColor: staticStats[index]?.textColor || "text-indigo-400",
            })),
          );
        }
      } catch (err: unknown) {
        // Silently fall back to static data on CORS/network errors
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Experiences Hook
export function useExperiences() {
  const [data, setData] = useState(staticExperiences);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const { data: result, error: fetchError } = await supabase
          .from("experiences")
          .select("*")
          .order("order", { ascending: true });

        if (fetchError) throw fetchError;

        if (result && result.length > 0) {
          setData(
            (result as DbExperience[]).map((exp: DbExperience) => ({
              year: exp.year,
              title: exp.title,
              company: exp.company,
              description: exp.description,
            })),
          );
        }
      } catch (err: unknown) {
        // Silently fall back to static data on CORS/network errors
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Skills Hook
export function useSkills() {
  const [data, setData] = useState(staticSkills);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const { data: result, error: fetchError } = await supabase
          .from("skills")
          .select("*")
          .order("order", { ascending: true });

        if (fetchError) throw fetchError;

        if (result && result.length > 0) {
          setData(
            (result as DbSkill[]).map((skill: DbSkill) => ({
              name: skill.name,
              level: skill.level,
              icon: getIcon(skill.icon_name),
              color: `from-${skill.color_from} to-${skill.color_to}`,
            })),
          );
        }
      } catch (err: unknown) {
        // Silently fall back to static data on CORS/network errors
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Tech Categories Hook
export function useTechCategories() {
  const [data, setData] = useState(staticTechCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const { data: result, error: fetchError } = await supabase
          .from("tech_categories")
          .select("*")
          .order("order", { ascending: true });

        if (fetchError) throw fetchError;

        if (result && result.length > 0) {
          setData(
            (result as DbTechCategory[]).map((cat: DbTechCategory) => ({
              title: cat.title,
              icon: getIcon(cat.icon_name),
              gradient: `from-${cat.gradient_from} to-${cat.gradient_to}`,
              techs: cat.technologies || [],
              order: cat.order ?? 0,
            })),
          );
        }
      } catch (err: unknown) {
        // Silently fall back to static data on CORS/network errors
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Projects Hook
export function useProjects() {
  const [data, setData] = useState(staticProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const { data: result, error: fetchError } = await supabase
          .from("projects")
          .select("*")
          .order("order", { ascending: true });

        if (fetchError) throw fetchError;

        if (result && result.length > 0) {
          setData(
            (result as DbProject[]).map((project: DbProject) => ({
              title: project.title,
              category: project.category,
              description: project.description,
              tags: project.tags || [],
              gradient: `from-${project.gradient_from} to-${project.gradient_to}`,
              liveUrl: project.live_url || "#",
              githubUrl: project.github_url || "#",
            })),
          );
        }
      } catch (err: unknown) {
        // Silently fall back to static data on CORS/network errors
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Social Links Hook
export function useSocialLinks() {
  const [data, setData] = useState(staticSocialLinks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const { data: result, error: fetchError } = await supabase
          .from("social_links")
          .select("*")
          .order("order", { ascending: true });

        if (fetchError) throw fetchError;

        if (result && result.length > 0) {
          setData(
            (result as DbSocialLink[]).map((link: DbSocialLink) => ({
              icon: getIcon(link.platform),
              label: link.label,
              href: link.href,
              color: getPlatformColor(link.platform),
              username: link.username,
            })),
          );
        }
      } catch (err: unknown) {
        // Silently fall back to static data on CORS/network errors
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Helper function for platform colors (handles both lowercase and capitalized)
function getPlatformColor(platform: string): string {
  const normalizedPlatform = platform.toLowerCase();
  const colors: Record<string, string> = {
    github: "hover:text-gray-400",
    linkedin: "hover:text-blue-400",
    twitter: "hover:text-sky-400",
    mail: "hover:text-indigo-400",
    email: "hover:text-indigo-400",
  };
  return colors[normalizedPlatform] || "hover:text-indigo-400";
}

// Contact Info Hook (static only for now)
export function useContactInfo() {
  return { data: staticContactInfo, loading: false, error: null };
}

// Combined hook for fetching all portfolio data at once
export function usePortfolioData() {
  const personalInfo = usePersonalInfo();
  const stats = useStats();
  const experiences = useExperiences();
  const skills = useSkills();
  const techCategories = useTechCategories();
  const projects = useProjects();
  const socialLinks = useSocialLinks();
  const contactInfo = useContactInfo();

  const loading =
    personalInfo.loading ||
    stats.loading ||
    experiences.loading ||
    skills.loading ||
    techCategories.loading ||
    projects.loading ||
    socialLinks.loading;

  return {
    personalInfo: personalInfo.data,
    stats: stats.data,
    experiences: experiences.data,
    skills: skills.data,
    techCategories: techCategories.data,
    projects: projects.data,
    socialLinks: socialLinks.data,
    contactInfo: contactInfo.data,
    loading,
  };
}
