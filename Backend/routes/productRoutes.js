import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(upload.single("image"), createProduct);

router.route("/:id")
  .get(getProductById)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

export default router;