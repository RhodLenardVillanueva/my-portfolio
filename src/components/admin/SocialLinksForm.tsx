import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2 } from 'lucide-react';

type SocialLink = {
  id: string;
  platform: string;
  label: string;
  href: string;
  username: string;
  order: number;
};

export function SocialLinksForm() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('order');

    if (data) setLinks(data);
    setLoading(false);
  };

  const addLink = () => {
    const newLink: SocialLink = {
      id: `temp-${Date.now()}`,
      platform: '',
      label: '',
      href: '',
      username: '',
      order: links.length + 1,
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, field: keyof SocialLink, value: string | number) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const deleteLink = async (id: string) => {
    if (id.startsWith('temp-')) {
      setLinks(links.filter(l => l.id !== id));
    } else {
      await supabase.from('social_links').delete().eq('id', id);
      setLinks(links.filter(l => l.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    for (const link of links) {
      if (link.id.startsWith('temp-')) {
        await supabase.from('social_links').insert({
          platform: link.platform,
          label: link.label,
          href: link.href,
          username: link.username,
          order: link.order,
        });
      } else {
        await supabase.from('social_links').update({
          platform: link.platform,
          label: link.label,
          href: link.href,
          username: link.username,
          order: link.order,
        }).eq('id', link.id);
      }
    }

    setMessage('Saved successfully!');
    fetchLinks();
    setTimeout(() => setMessage(''), 3000);
    setSaving(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  const platformOptions = ['github', 'linkedin', 'twitter', 'email', 'instagram', 'facebook', 'youtube', 'dribbble', 'behance'];

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Social Links</h2>
        <button
          onClick={addLink}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {links.map((link) => (
          <div key={link.id} className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Platform
                </label>
                <select
                  value={link.platform}
                  onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select platform</option>
                  {platformOptions.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="GitHub"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateLink(link.id, 'href', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username/Handle
                </label>
                <input
                  type="text"
                  value={link.username}
                  onChange={(e) => updateLink(link.id, 'username', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="@username"
                />
              </div>
            </div>

            <button
              onClick={() => deleteLink(link.id)}
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
