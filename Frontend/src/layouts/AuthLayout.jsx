import { Outlet, Link } from "react-router";
import { ShoppingBag } from "lucide-react";

const AuthLayout = () => {
    return (
        <div className="auth-page-wrapper">
            <div className="auth-card">
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <Link to="/" className="navbar-logo" style={{ justifyContent: "center" }}>
                        <ShoppingBag size={28} />
                        <span>ShopPulse</span>
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;