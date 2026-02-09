import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2 } from 'lucide-react';

type Experience = {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  order: number;
};

export function ExperiencesForm() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order');

    if (data) setExperiences(data);
    setLoading(false);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `temp-${Date.now()}`,
      year: '',
      title: '',
      company: '',
      description: '',
      order: experiences.length + 1,
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | number) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const deleteExperience = async (id: string) => {
    if (id.startsWith('temp-')) {
      setExperiences(experiences.filter(e => e.id !== id));
    } else {
      await supabase.from('experiences').delete().eq('id', id);
      setExperiences(experiences.filter(e => e.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    for (const exp of experiences) {
      if (exp.id.startsWith('temp-')) {
        await supabase.from('experiences').insert({
          year: exp.year,
          title: exp.title,
          company: exp.company,
          description: exp.description,
          order: exp.order,
        });
      } else {
        await supabase.from('experiences').update({
          year: exp.year,
          title: exp.title,
          company: exp.company,
          description: exp.description,
          order: exp.order,
        }).eq('id', exp.id);
      }
    }

    setMessage('Saved successfully!');
    fetchExperiences();
    setTimeout(() => setMessage(''), 3000);
    setSaving(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Experience Timeline</h2>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  value={exp.year}
                  onChange={(e) => updateExperience(exp.id, 'year', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Company Name"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title
              </label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                placeholder="Senior Developer"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 resize-none"
                placeholder="Brief description of responsibilities"
              />
            </div>
            <button
              onClick={() => deleteExperience(exp.id)}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
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
