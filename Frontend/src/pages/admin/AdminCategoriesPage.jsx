import React, { useState, useEffect } from "react";
import { Plus, Search, Trash2, FolderPlus } from "lucide-react";

const defaultCategories = [
  { id: 1, name: "Electronics", itemCount: 12 },
  { id: 2, name: "Furniture", itemCount: 8 },
  { id: 3, name: "Footwear", itemCount: 15 },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("admin_categories");
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    localStorage.setItem("admin_categories", JSON.stringify(categories));
  }, [categories]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const categoryObj = {
      id: Date.now(),
      name: newCategory.trim(),
      itemCount: 0,
    };

    setCategories([...categories, categoryObj]);
    setNewCategory("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>Category Management</h1>
        <p style={{ color: "#666", margin: "4px 0 0 0" }}>Organize your store products into custom categories.</p>
      </div>

      <form onSubmit={handleAddCategory} style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="New Category Name..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{
            flex: 1,
            maxWidth: "350px",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          <Plus size={18} /> Add Category
        </button>
      </form>

      <div style={{ position: "relative", marginBottom: "20px", maxWidth: "400px" }}>
        <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 10px 10px 38px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "12px 16px" }}>Category Name</th>
              <th style={{ padding: "12px 16px" }}>Total Items</th>
              <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px 16px", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FolderPlus size={18} style={{ color: "#2563eb" }} />
                    {category.name}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#4b5563" }}>{category.itemCount} items</td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <button
                      onClick={() => handleDelete(category.id)}
                      style={{ border: "none", background: "none", cursor: "pointer", color: "#dc2626" }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ padding: "24px", textAlign: "center", color: "#6b7280" }}>
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}