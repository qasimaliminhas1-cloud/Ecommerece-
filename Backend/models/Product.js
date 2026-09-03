import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String, default: "/uploads/sample.jpg" }, // Added image field
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);