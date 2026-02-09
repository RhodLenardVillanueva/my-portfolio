import {
  Boxes,
  Code2,
  Cog,
  Database,
  Github,
  Linkedin,
  Mail,
  Palette,
  Shield,
  Smartphone,
  TestTube,
  Twitter,
  Zap,
} from "lucide-react";

export const personalInfo = {
  name: "Rhod Lenard",
  fullName: "Rhod Lenard Villanueva",
  title: "Software Developer",
  tagline: "Crafting digital experiences where design meets innovation",
  email: "villanuevarhodlenard@gmail.com",
  location: "Philippines",
  bio: "I'm a passionate developer who believes in pushing the boundaries of web experiences. My work sits at the intersection of design and code, where creativity meets technical precision.",
  extendedBio:
    "With over 5 years of experience, I specialize in creating immersive digital experiences that not only look stunning but perform flawlessly across all devices.",
};

export const stats = [
  {
    value: "50+",
    label: "Projects Completed",
    gradient: "from-indigo-900/20 to-purple-900/10",
    border: "border-indigo-500/20",
    textColor: "text-indigo-400",
  },
  {
    value: "5+",
    label: "Years Experience",
    gradient: "from-purple-900/20 to-indigo-900/10",
    border: "border-purple-500/20",
    textColor: "text-purple-400",
  },
  {
    value: "15+",
    label: "Happy Clients",
    gradient: "from-indigo-900/20 to-purple-900/10",
    border: "border-indigo-500/20",
    textColor: "text-indigo-400",
  },
];

export const experiences = [
  {
    year: "2024",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    description:
      "Leading frontend architecture and mentoring junior developers",
  },
  {
    year: "2022",
    title: "Frontend Engineer",
    company: "StartupXYZ",
    description: "Built scalable React applications with modern tooling",
  },
  {
    year: "2020",
    title: "Web Developer",
    company: "Digital Agency",
    description: "Created interactive web experiences for clients",
  },
  {
    year: "2019",
    title: "Junior Developer",
    company: "First Company",
    description: "Started journey in web development",
  },
];

export const skills = [
  {
    name: "Frontend Development",
    level: 95,
    icon: Code2,
    color: "from-indigo-500 to-blue-500",
  },
  {
    name: "UI/UX Design",
    level: 88,
    icon: Palette,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Responsive Design",
    level: 92,
    icon: Smartphone,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Performance",
    level: 90,
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Backend & APIs",
    level: 85,
    icon: Database,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "DevOps & Cloud",
    level: 82,
    icon: Cog,
    color: "from-orange-500 to-red-500",
  },
];

export const techCategories = [
  {
    title: "Frontend",
    icon: Code2,
    gradient: "from-indigo-500 to-blue-500",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    order: 1,
  },
  {
    title: "Backend",
    icon: Database,
    gradient: "from-green-500 to-emerald-500",
    techs: ["Node.js", "Express.js"],
    order: 2,
  },
  {
    title: "Database",
    icon: Boxes,
    gradient: "from-blue-500 to-cyan-500",
    techs: ["PostgreSQL", "Prisma", "Redis"],
    order: 3,
  },
  {
    title: "Authentication & Security",
    icon: Shield,
    gradient: "from-yellow-500 to-orange-500",
    techs: ["JWT", "NextAuth.js", "OAuth2"],
    order: 4,
  },
  {
    title: "Testing",
    icon: TestTube,
    gradient: "from-pink-500 to-rose-500",
    techs: ["Jest", "React Testing Library", "Cypress"],
    order: 5,
  },
  {
    title: "DevOps & Deployment",
    icon: Cog,
    gradient: "from-orange-500 to-red-500",
    techs: ["Git", "GitHub Actions", "Docker", "Vercel", "AWS"],
    order: 6,
  },
];

export const projects = [
  {
    title: "AI-Powered Analytics Dashboard",
    category: "SaaS Platform",
    description:
      "Real-time analytics dashboard with AI-driven insights and predictive modeling for enterprise clients.",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    gradient: "from-blue-600 to-cyan-600",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Metaverse E-Commerce",
    category: "Web3 Application",
    description:
      "Immersive 3D shopping experience built with Three.js and blockchain integration for NFT collectibles.",
    tags: ["Three.js", "Web3", "Solidity", "Next.js"],
    gradient: "from-purple-600 to-pink-600",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Motion Design System",
    category: "Design System",
    description:
      "Comprehensive component library with advanced animations and accessibility features for modern web apps.",
    tags: ["React", "Motion", "Storybook", "Tailwind"],
    gradient: "from-indigo-600 to-violet-600",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Real-time Collaboration Tool",
    category: "Productivity App",
    description:
      "Collaborative workspace with live cursors, comments, and version control.",
    tags: ["WebSockets", "React", "Canvas API", "Redis"],
    gradient: "from-emerald-600 to-teal-600",
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "#",
    color: "hover:text-gray-400",
    username: "@rhodlenard",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
    color: "hover:text-blue-400",
    username: "rhodlenard",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "#",
    color: "hover:text-sky-400",
    username: "@rhodlenard",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:villanuevarhodlenard@gmail.com",
    color: "hover:text-indigo-400",
    username: "villanuevarhodlenard@gmail.com",
  },
];

export const contactInfo = {
  heading: "Let's Create Something Amazing",
  description:
    "Have a project in mind? Let's discuss how we can bring your ideas to life with cutting-edge technology and creative design.",
  formPlaceholders: {
    name: "Your Name",
    email: "Your Email",
    message: "Tell me about your project...",
  },
};
