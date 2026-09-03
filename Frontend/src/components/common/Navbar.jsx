// src/components/common/Navbar.jsx
import { NavLink, Link } from "react-router";
import { ShoppingBag, Search, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
    const { totalCount, toggleCart } = useCart();

    return (
        <header className="navbar">
            <div className="navbar-container">
                {/* Brand Logo */}
                <Link to="/" className="navbar-logo">
                    <ShoppingBag size={24} />
                    <span>ShopPulse</span>
                </Link>

                {/* Navigation Links */}
                <nav>
                    <ul className="navbar-links">
                        <li>
                            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Search Bar */}
                <div className="navbar-search">
                    <Search size={18} color="var(--text-muted)" />
                    <input type="text" placeholder="Search products..." />
                </div>

                {/* Auth Buttons & Cart Drawer Toggle */}
                <div className="navbar-actions">
                    <button className="cart-icon-btn" onClick={toggleCart} aria-label="Cart">
                        <ShoppingCart size={22} />
                        {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
                    </button>

                    <Link to="/login" className="btn-auth btn-login">
                        Login
                    </Link>
                    <Link to="/register" className="btn-auth btn-register">
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;