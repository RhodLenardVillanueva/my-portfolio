import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2 } from 'lucide-react';

type Stat = {
  id: string;
  value: string;
  label: string;
  order: number;
};

export function StatsForm() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('order');

    if (data) setStats(data);
    setLoading(false);
  };

  const addStat = () => {
    const newStat: Stat = {
      id: `temp-${Date.now()}`,
      value: '',
      label: '',
      order: stats.length + 1,
    };
    setStats([...stats, newStat]);
  };

  const updateStat = (id: string, field: keyof Stat, value: string | number) => {
    setStats(stats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };

  const deleteStat = async (id: string) => {
    if (id.startsWith('temp-')) {
      setStats(stats.filter(s => s.id !== id));
    } else {
      await supabase.from('stats').delete().eq('id', id);
      setStats(stats.filter(s => s.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    for (const stat of stats) {
      if (stat.id.startsWith('temp-')) {
        await supabase.from('stats').insert({
          value: stat.value,
          label: stat.label,
          order: stat.order,
        });
      } else {
        await supabase.from('stats').update({
          value: stat.value,
          label: stat.label,
          order: stat.order,
        }).eq('id', stat.id);
      }
    }

    setMessage('Saved successfully!');
    fetchStats();
    setTimeout(() => setMessage(''), 3000);
    setSaving(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Stats</h2>
        <button
          onClick={addStat}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Stat
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.id} className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Value (e.g., "50+")
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <button
              onClick={() => deleteStat(stat.id)}
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
