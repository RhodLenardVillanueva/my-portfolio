import { AlertCircle, LogOut, User } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ContactMessagesForm } from "../components/admin/ContactMessagesForm";
import { ExperiencesForm } from "../components/admin/ExperiencesForm";
import { PersonalInfoForm } from "../components/admin/PersonalInfoForm";
import { ProjectsForm } from "../components/admin/ProjectsForm";
import { SkillsForm } from "../components/admin/SkillsForm";
import { SocialLinksForm } from "../components/admin/SocialLinksForm";
import { StatsForm } from "../components/admin/StatsForm";
import { TechCategoriesForm } from "../components/admin/TechCategoriesForm";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("messages");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setError(
        "Supabase is not configured. Please check your environment variables.",
      );
      setLoading(false);
      return;
    }
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const tabs = [
    { id: "messages", label: "Messages" },
    { id: "personal", label: "Personal Info" },
    { id: "stats", label: "Stats" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "tech", label: "Technologies" },
    { id: "projects", label: "Projects" },
    { id: "social", label: "Social Links" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Head>
          <title>Admin Login - Portfolio</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
                  Welcome back
                </h1>
                <p className="text-sm text-gray-500">
                  Please enter your credentials to login
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-gray-400"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={authLoading || !isSupabaseConfigured()}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {authLoading ? "Signing in..." : "Sign in"}
                </button>

                {/* Bottom info */}
                <p className="text-xs text-gray-500 text-center pt-2">
                  Use your Supabase credentials to sign in
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Portfolio Admin</h1>
              <p className="text-sm text-gray-400">
                Manage your portfolio content
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="border-b border-gray-800 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-400"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === "messages" && <ContactMessagesForm />}
          {activeTab === "personal" && <PersonalInfoForm />}
          {activeTab === "stats" && <StatsForm />}
          {activeTab === "experience" && <ExperiencesForm />}
          {activeTab === "skills" && <SkillsForm />}
          {activeTab === "tech" && <TechCategoriesForm />}
          {activeTab === "projects" && <ProjectsForm />}
          {activeTab === "social" && <SocialLinksForm />}
        </main>
      </div>
    </>
  );
}
