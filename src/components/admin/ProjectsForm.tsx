import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2, X } from 'lucide-react';

type Project = {
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
};

export function ProjectsForm() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order');

    if (data) setProjects(data);
    setLoading(false);
  };

  const addProject = () => {
    const newProject: Project = {
      id: `temp-${Date.now()}`,
      title: '',
      category: '',
      description: '',
      tags: [],
      gradient_from: 'indigo-600',
      gradient_to: 'purple-600',
      live_url: '',
      github_url: '',
      order: projects.length + 1,
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const addTag = (projectId: string) => {
    setProjects(projects.map(proj => 
      proj.id === projectId 
        ? { ...proj, tags: [...proj.tags, ''] }
        : proj
    ));
  };

  const updateTag = (projectId: string, index: number, value: string) => {
    setProjects(projects.map(proj => 
      proj.id === projectId 
        ? { 
            ...proj, 
            tags: proj.tags.map((tag, i) => i === index ? value : tag)
          }
        : proj
    ));
  };

  const removeTag = (projectId: string, index: number) => {
    setProjects(projects.map(proj => 
      proj.id === projectId 
        ? { 
            ...proj, 
            tags: proj.tags.filter((_, i) => i !== index)
          }
        : proj
    ));
  };

  const deleteProject = async (id: string) => {
    if (id.startsWith('temp-')) {
      setProjects(projects.filter(p => p.id !== id));
    } else {
      await supabase.from('projects').delete().eq('id', id);
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    for (const proj of projects) {
      if (proj.id.startsWith('temp-')) {
        await supabase.from('projects').insert({
          title: proj.title,
          category: proj.category,
          description: proj.description,
          tags: proj.tags,
          gradient_from: proj.gradient_from,
          gradient_to: proj.gradient_to,
          live_url: proj.live_url,
          github_url: proj.github_url,
          order: proj.order,
        });
      } else {
        await supabase.from('projects').update({
          title: proj.title,
          category: proj.category,
          description: proj.description,
          tags: proj.tags,
          gradient_from: proj.gradient_from,
          gradient_to: proj.gradient_to,
          live_url: proj.live_url,
          github_url: proj.github_url,
          order: proj.order,
        }).eq('id', proj.id);
      }
    }

    setMessage('Saved successfully!');
    fetchProjects();
    setTimeout(() => setMessage(''), 3000);
    setSaving(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-6 mb-6">
        {projects.map((proj) => (
          <div key={proj.id} className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="My Awesome Project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={proj.category}
                  onChange={(e) => updateProject(proj.id, 'category', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Web Application"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={proj.description}
                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 resize-none"
                placeholder="Brief description of the project..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Live URL
                </label>
                <input
                  type="text"
                  value={proj.live_url}
                  onChange={(e) => updateProject(proj.id, 'live_url', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub URL
                </label>
                <input
                  type="text"
                  value={proj.github_url}
                  onChange={(e) => updateProject(proj.id, 'github_url', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gradient From
                </label>
                <input
                  type="text"
                  value={proj.gradient_from}
                  onChange={(e) => updateProject(proj.id, 'gradient_from', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gradient To
                </label>
                <input
                  type="text"
                  value={proj.gradient_to}
                  onChange={(e) => updateProject(proj.id, 'gradient_to', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="purple-600"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Tags
                </label>
                <button
                  onClick={() => addTag(proj.id)}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  + Add Tag
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag, index) => (
                  <div key={index} className="flex gap-1 items-center bg-gray-800 rounded-lg px-3 py-1">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => updateTag(proj.id, index, e.target.value)}
                      className="bg-transparent border-none text-white text-sm focus:outline-none w-24"
                      placeholder="React"
                    />
                    <button
                      onClick={() => removeTag(proj.id, index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => deleteProject(proj.id)}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Project
            </button>
          </div>
        ))}
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-xl text-green-400 text-sm">
          {message}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Save className="w-5 h-5" />
        {saving ? 'Saving...' : 'Save All Changes'}
      </button>
    </div>
  );
}
