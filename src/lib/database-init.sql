-- Portfolio Database Schema
-- Copy and paste this into your Supabase SQL Editor

-- Personal Info Table
CREATE TABLE IF NOT EXISTS personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT,
  bio TEXT NOT NULL,
  extended_bio TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats Table
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  icon_name TEXT NOT NULL,
  color_from TEXT NOT NULL,
  color_to TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tech Categories Table
CREATE TABLE IF NOT EXISTS tech_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  gradient_from TEXT NOT NULL,
  gradient_to TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  gradient_from TEXT NOT NULL,
  gradient_to TEXT NOT NULL,
  live_url TEXT,
  github_url TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  username TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access (for portfolio display)
CREATE POLICY "Allow public read access on personal_info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access on stats" ON stats FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on tech_categories" ON tech_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on social_links" ON social_links FOR SELECT USING (true);

-- Authenticated write access (for admin panel)
CREATE POLICY "Allow authenticated insert on personal_info" ON personal_info FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on personal_info" ON personal_info FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on personal_info" ON personal_info FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on stats" ON stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on stats" ON stats FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on stats" ON stats FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on experiences" ON experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on experiences" ON experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on experiences" ON experiences FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on skills" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on skills" ON skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on tech_categories" ON tech_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on tech_categories" ON tech_categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on tech_categories" ON tech_categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on social_links" ON social_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on social_links" ON social_links FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on social_links" ON social_links FOR DELETE USING (auth.role() = 'authenticated');

-- Contact messages: anyone can insert (submit form), only authenticated can read/update/delete
CREATE POLICY "Allow public insert on contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read on contact_messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on contact_messages" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on contact_messages" ON contact_messages FOR DELETE USING (auth.role() = 'authenticated');

-- Insert initial data from your current portfolio
INSERT INTO personal_info (name, full_name, title, tagline, email, location, bio, extended_bio) VALUES
('Rhod Lenard', 'Rhod Lenard Villanueva', 'Software Developer', 'Crafting digital experiences where design meets innovation', 'villanuevarhodlenard@gmail.com', 'Philippines', 'I''m a passionate developer who believes in pushing the boundaries of web experiences. My work sits at the intersection of design and code, where creativity meets technical precision.', 'With over 5 years of experience, I specialize in creating immersive digital experiences that not only look stunning but perform flawlessly across all devices.');

INSERT INTO stats (value, label, "order") VALUES
('50+', 'Projects Completed', 1),
('5+', 'Years Experience', 2),
('15+', 'Happy Clients', 3);

INSERT INTO experiences (year, title, company, description, "order") VALUES
('2024', 'Senior Full Stack Developer', 'TechCorp Inc.', 'Leading frontend architecture and mentoring junior developers', 1),
('2022', 'Frontend Engineer', 'StartupXYZ', 'Built scalable React applications with modern tooling', 2),
('2020', 'Web Developer', 'Digital Agency', 'Created interactive web experiences for clients', 3),
('2019', 'Junior Developer', 'First Company', 'Started journey in web development', 4);

INSERT INTO skills (name, level, icon_name, color_from, color_to, "order") VALUES
('Frontend Development', 95, 'Code2', 'indigo-500', 'blue-500', 1),
('UI/UX Design', 88, 'Palette', 'purple-500', 'pink-500', 2),
('Responsive Design', 92, 'Smartphone', 'blue-500', 'cyan-500', 3),
('Performance', 90, 'Zap', 'yellow-500', 'orange-500', 4),
('Backend & APIs', 85, 'Database', 'green-500', 'emerald-500', 5),
('DevOps & Cloud', 82, 'Cog', 'orange-500', 'red-500', 6);

INSERT INTO tech_categories (title, icon_name, gradient_from, gradient_to, technologies, "order") VALUES
('Frontend', 'Code2', 'indigo-500', 'blue-500', ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'], 1),
('Backend', 'Database', 'green-500', 'emerald-500', ARRAY['Node.js', 'Express.js'], 2),
('Database', 'Boxes', 'blue-500', 'cyan-500', ARRAY['PostgreSQL', 'Prisma', 'Redis'], 3),
('Authentication & Security', 'Shield', 'yellow-500', 'orange-500', ARRAY['JWT', 'NextAuth.js', 'OAuth2'], 4),
('Testing', 'TestTube', 'pink-500', 'rose-500', ARRAY['Jest', 'React Testing Library', 'Cypress'], 5),
('DevOps & Deployment', 'Cog', 'orange-500', 'red-500', ARRAY['Git', 'GitHub Actions', 'Docker', 'Vercel', 'AWS'], 6);

INSERT INTO projects (title, category, description, tags, gradient_from, gradient_to, live_url, github_url, "order") VALUES
('AI-Powered Analytics Dashboard', 'SaaS Platform', 'Real-time analytics dashboard with AI-driven insights and predictive modeling for enterprise clients.', ARRAY['React', 'TypeScript', 'D3.js', 'Node.js'], 'blue-600', 'cyan-600', '#', '#', 1),
('Metaverse E-Commerce', 'Web3 Application', 'Immersive 3D shopping experience built with Three.js and blockchain integration for NFT collectibles.', ARRAY['Three.js', 'Web3', 'Solidity', 'Next.js'], 'purple-600', 'pink-600', '#', '#', 2),
('Motion Design System', 'Design System', 'Comprehensive component library with advanced animations and accessibility features for modern web apps.', ARRAY['React', 'Motion', 'Storybook', 'Tailwind'], 'indigo-600', 'violet-600', '#', '#', 3),
('Real-time Collaboration Tool', 'Productivity App', 'Collaborative workspace with live cursors, comments, and version control.', ARRAY['WebSockets', 'React', 'Canvas API', 'Redis'], 'emerald-600', 'teal-600', '#', '#', 4);

INSERT INTO social_links (platform, label, href, username, "order") VALUES
('github', 'GitHub', '#', '@rhodlenard', 1),
('linkedin', 'LinkedIn', '#', 'rhodlenard', 2),
('twitter', 'Twitter', '#', '@rhodlenard', 3),
('email', 'Email', 'mailto:villanuevarhodlenard@gmail.com', 'villanuevarhodlenard@gmail.com', 4);
