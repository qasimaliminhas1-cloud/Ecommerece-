import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CartDrawer from "../features/cart/CartDrawer";

const MainLayout = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
            <CartDrawer />
        </div>
    );
};

export default MainLayout;