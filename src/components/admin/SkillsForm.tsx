import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2 } from 'lucide-react';

type Skill = {
  id: string;
  name: string;
  level: number;
  icon_name: string;
  color_from: string;
  color_to: string;
  order: number;
};

export function SkillsForm() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order');

    if (data) setSkills(data);
    setLoading(false);
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: `temp-${Date.now()}`,
      name: '',
      level: 80,
      icon_name: 'Code2',
      color_from: 'indigo-500',
      color_to: 'blue-500',
      order: skills.length + 1,
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const deleteSkill = async (id: string) => {
    if (id.startsWith('temp-')) {
      setSkills(skills.filter(s => s.id !== id));
    } else {
      await supabase.from('skills').delete().eq('id', id);
      setSkills(skills.filter(s => s.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    for (const skill of skills) {
      if (skill.id.startsWith('temp-')) {
        await supabase.from('skills').insert({
          name: skill.name,
          level: skill.level,
          icon_name: skill.icon_name,
          color_from: skill.color_from,
          color_to: skill.color_to,
          order: skill.order,
        });
      } else {
        await supabase.from('skills').update({
          name: skill.name,
          level: skill.level,
          icon_name: skill.icon_name,
          color_from: skill.color_from,
          color_to: skill.color_to,
          order: skill.order,
        }).eq('id', skill.id);
      }
    }

    setMessage('Saved successfully!');
    fetchSkills();
    setTimeout(() => setMessage(''), 3000);
    setSaving(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  const iconOptions = ['Code2', 'Palette', 'Smartphone', 'Zap', 'Database', 'Cog', 'Shield', 'TestTube', 'Boxes', 'Globe'];

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Skills</h2>
        <button
          onClick={addSkill}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {skills.map((skill) => (
          <div key={skill.id} className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Frontend Development"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Level (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon
                </label>
                <select
                  value={skill.icon_name}
                  onChange={(e) => updateSkill(skill.id, 'icon_name', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color From
                </label>
                <input
                  type="text"
                  value={skill.color_from}
                  onChange={(e) => updateSkill(skill.id, 'color_from', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color To
                </label>
                <input
                  type="text"
                  value={skill.color_to}
                  onChange={(e) => updateSkill(skill.id, 'color_to', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => deleteSkill(skill.id)}
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
