import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const { name, category, price, stock } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  const imagePath = req.file ? `/${req.file.path.replace(/\\/g, "/")}` : "";

  const product = await Product.create({
    name,
    category: category || "General",
    price: Number(price),
    stock: Number(stock) || 0,
    image: imagePath,
  });

  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const updateData = { ...req.body };

  if (req.file) {
    updateData.image = `/${req.file.path.replace(/\\/g, "/")}`;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ message: "Product deleted successfully", id: req.params.id });
};