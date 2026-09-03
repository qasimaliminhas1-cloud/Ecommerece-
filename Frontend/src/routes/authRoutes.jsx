import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const authRoutes = {
    element: <AuthLayout />,
    children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
    ],
};