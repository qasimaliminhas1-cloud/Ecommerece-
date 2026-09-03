import { Outlet, NavLink, Link } from "react-router";
import { LayoutDashboard, Package, FolderTree, ShoppingBag, ArrowLeft } from "lucide-react";

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            {/* Admin Sidebar */}
            <aside className="admin-sidebar">
                <div>
                    <Link to="/" className="navbar-logo" style={{ marginBottom: "1.5rem" }}>
                        <ShoppingBag size={24} />
                        <span>AdminHub</span>
                    </Link>

                    <nav className="admin-sidebar-nav">
                        <NavLink
                            to="/admin"
                            end
                            className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
                        >
                            <LayoutDashboard size={20} /> Dashboard
                        </NavLink>

                        <NavLink
                            to="/admin/products"
                            className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
                        >
                            <Package size={20} /> Products
                        </NavLink>

                        <NavLink
                            to="/admin/categories"
                            className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
                        >
                            <FolderTree size={20} /> Categories
                        </NavLink>

                        <NavLink
                            to="/admin/orders"
                            className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
                        >
                            <ShoppingBag size={20} /> Orders
                        </NavLink>
                    </nav>
                </div>

                <div style={{ marginTop: "auto" }}>
                    <Link to="/" className="admin-nav-item">
                        <ArrowLeft size={18} /> Back to Store
                    </Link>
                </div>
            </aside>

            {/* Main Admin Content View */}
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;