import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Core Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Uploads Folder (Make image URLs publicly accessible)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// API Endpoints
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("API is running successfully...");
});

// Express v5 Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error Log:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});