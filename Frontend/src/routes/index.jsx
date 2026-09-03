// src/routes/index.jsx
import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";
import { adminRoutes } from "./adminRoutes";

export const router = createBrowserRouter([publicRoutes, authRoutes, adminRoutes]);