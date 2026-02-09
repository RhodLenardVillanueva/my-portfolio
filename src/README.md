# Rhod Lenard's Portfolio

A modern, futuristic portfolio website with scroll-driven animations and an admin panel for content management.

## 🌟 Features

- ✨ Scroll-triggered animations with Motion (Framer Motion)
- 🎨 Dark mode design with neon gradients
- 📱 Fully responsive
- 🔐 Secure admin panel for content management
- 💾 Supabase backend for data persistence
- 🚀 Built with Next.js, React, TypeScript, and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works!)
- Git installed

### Setup Instructions

Quick overview:

1. Create Supabase project
2. Run the SQL from `/lib/database-init.sql`
3. Copy `.env.example` to `.env.local` and add your Supabase credentials
4. Install dependencies: `npm install`
5. Run locally: `npm run dev`
6. Deploy to Vercel

## 🔧 Tech Stack

**Frontend:**

- React
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI

**Animation:**

- Motion (Framer Motion)
- GSAP
- Three.js
- WebGL

**Backend:**

- Node.js
- Supabase (PostgreSQL)
- Authentication with Supabase Auth

**DevOps:**

- Vercel (recommended for deployment)
- Git

## 📁 Project Structure

```
/
├── components/
│   ├── admin/           # Admin panel forms
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   └── ContactSection.tsx
├── data/
│   └── portfolio.ts     # Static data (fallback)
├── lib/
│   ├── supabase.ts      # Supabase client
│   └── database-init.sql # Database schema
├── pages/
│   ├── admin.tsx        # Admin dashboard
│   ├── index.tsx        # Home page
│   └── api/             # API routes
└── hooks/
    └── usePortfolioData.ts # Data fetching hooks
```

## 🎨 Admin Panel

Access the admin panel at `/admin` to manage:

- Personal information
- Stats & achievements
- Work experience timeline
- Skills & proficiency levels
- Technology categories
- Portfolio projects
- Social media links

## 📝 License

© 2026 Rhod Lenard Villanueva. All rights reserved.

## 📧 Contact

Email: villanuevarhodlenard@gmail.com

---

**Made with ❤️ and lots of coffee**
