import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) {
    return res.status(400).json({ error: "Category name is required" });
  }

  const categoryExists = await Category.findOne({ name: name.trim() });
  if (categoryExists) {
    return res.status(400).json({ error: "Category already exists" });
  }

  const category = await Category.create({ name: name.trim() });
  res.status(201).json(category);
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted successfully", id: req.params.id });
};