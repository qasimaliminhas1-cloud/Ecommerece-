import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ProductModal({ isOpen, onClose, onSave, initialData }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    // Load existing categories from LocalStorage
    const savedCategories = localStorage.getItem("admin_categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories([
        { id: 1, name: "Electronics" },
        { id: 2, name: "Furniture" },
        { id: 3, name: "Footwear" },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ 
        name: "", 
        category: categories.length > 0 ? categories[0].name : "Electronics", 
        price: "", 
        stock: "" 
      });
    }
  }, [initialData, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      category: formData.category || (categories[0]?.name || "Electronics"),
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock, 10) || 0,
    });
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0 }}>{initialData ? "Edit Product" : "Add New Product"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={inputStyle}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}>Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}>Stock</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
            <button type="button" onClick={onClose} style={cancelButtonStyle}>
              Cancel
            </button>
            <button type="submit" style={saveButtonStyle}>
              {initialData ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "450px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const fieldStyle = { marginBottom: "14px" };
const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" };
const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" };
const cancelButtonStyle = { padding: "8px 16px", border: "1px solid #ccc", background: "#fff", borderRadius: "6px", cursor: "pointer" };
const saveButtonStyle = { padding: "8px 16px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };