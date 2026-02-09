import { Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type TechCategory = {
  id: string;
  title: string;
  icon_name: string;
  gradient_from: string;
  gradient_to: string;
  technologies: string[];
  order: number;
};

export function TechCategoriesForm() {
  const [categories, setCategories] = useState<TechCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("tech_categories")
      .select("*")
      .order("order");

    if (data) setCategories(data);
    setLoading(false);
  };

  const addCategory = () => {
    const newCategory: TechCategory = {
      id: `temp-${Date.now()}`,
      title: "",
      icon_name: "Code2",
      gradient_from: "indigo-500",
      gradient_to: "blue-500",
      technologies: [],
      order: categories.length + 1,
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (
    id: string,
    field: keyof TechCategory,
    value: any,
  ) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat,
      ),
    );
  };

  const addTech = (categoryId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, technologies: [...cat.technologies, ""] }
          : cat,
      ),
    );
  };

  const updateTech = (categoryId: string, index: number, value: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              technologies: cat.technologies.map((tech, i) =>
                i === index ? value : tech,
              ),
            }
          : cat,
      ),
    );
  };

  const removeTech = (categoryId: string, index: number) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              technologies: cat.technologies.filter((_, i) => i !== index),
            }
          : cat,
      ),
    );
  };

  const deleteCategory = async (id: string) => {
    if (id.startsWith("temp-")) {
      setCategories(categories.filter((c) => c.id !== id));
    } else {
      await supabase.from("tech_categories").delete().eq("id", id);
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    for (const cat of categories) {
      if (cat.id.startsWith("temp-")) {
        await supabase.from("tech_categories").insert({
          title: cat.title,
          icon_name: cat.icon_name,
          gradient_from: cat.gradient_from,
          gradient_to: cat.gradient_to,
          technologies: cat.technologies,
          order: cat.order,
        });
      } else {
        await supabase
          .from("tech_categories")
          .update({
            title: cat.title,
            icon_name: cat.icon_name,
            gradient_from: cat.gradient_from,
            gradient_to: cat.gradient_to,
            technologies: cat.technologies,
            order: cat.order,
          })
          .eq("id", cat.id);
      }
    }

    setMessage("Saved successfully!");
    fetchCategories();
    setTimeout(() => setMessage(""), 3000);
    setSaving(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  const iconOptions = [
    "Code2",
    "Palette",
    "Smartphone",
    "Zap",
    "Database",
    "Cog",
    "Shield",
    "TestTube",
    "Boxes",
    "Globe",
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Technology Categories</h2>
        <button
          onClick={addCategory}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="space-y-6 mb-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 bg-gray-900 border border-gray-800 rounded-xl"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category Title
                </label>
                <input
                  type="text"
                  value={cat.title}
                  onChange={(e) =>
                    updateCategory(cat.id, "title", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Frontend"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon
                </label>
                <select
                  value={cat.icon_name}
                  onChange={(e) =>
                    updateCategory(cat.id, "icon_name", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gradient From
                </label>
                <input
                  type="text"
                  value={cat.gradient_from}
                  onChange={(e) =>
                    updateCategory(cat.id, "gradient_from", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gradient To
                </label>
                <input
                  type="text"
                  value={cat.gradient_to}
                  onChange={(e) =>
                    updateCategory(cat.id, "gradient_to", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={cat.order}
                onChange={(e) =>
                  updateCategory(cat.id, "order", parseInt(e.target.value) || 0)
                }
                className="w-24 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                min="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Lower numbers appear first (1 = Design, 2 = Frontend, etc.)
              </p>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Technologies
                </label>
                <button
                  onClick={() => addTech(cat.id)}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  + Add Technology
                </button>
              </div>
              <div className="space-y-2">
                {cat.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) =>
                        updateTech(cat.id, index, e.target.value)
                      }
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      placeholder="React"
                    />
                    <button
                      onClick={() => removeTech(cat.id, index)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => deleteCategory(cat.id)}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Category
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
        {saving ? "Saving..." : "Save All Changes"}
      </button>
    </div>
  );
}
