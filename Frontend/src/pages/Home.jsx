import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Fixed import
import { Laptop, Shirt, Watch, Headphones, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

// Fallback dummy data (Jab tak backend API ready na ho)
const STATIC_PRODUCTS = [
  {
    _id: "1",
    title: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    _id: "2",
    title: "Minimalist Smart Watch",
    price: 149.50,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    _id: "3",
    title: "Classic Cotton Denim Jacket",
    price: 89.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80",
  },
  {
    _id: "4",
    title: "Ergonomic Mechanical Keyboard",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
  },
];

const Home = () => {
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(false);

  // Backend Integration Ready Structure
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // Backend API URL (Apni backend route se match karein)
        const response = await axios.get("http://localhost:5000/api/products?featured=true");
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log("Using local static data (Backend disconnected):", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <h1>Designed For You.</h1>
        <p>Explore top-rated products with fast delivery and exclusive season discounts.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
          Shop Products Now <ArrowRight size={18} />
        </Link>
      </section>

      {/* Category Grid Section */}
      <section className="category-section">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
          Shop By Category
        </h2>
        
        <div className="category-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          <Link to="/products?category=Electronics" className="category-card">
            <Laptop size={28} />
            <span>Electronics</span>
          </Link>
          <Link to="/products?category=Fashion" className="category-card">
            <Shirt size={28} />
            <span>Fashion</span>
          </Link>
          <Link to="/products?category=Accessories" className="category-card">
            <Watch size={28} />
            <span>Watches</span>
          </Link>
          <Link to="/products?category=Audio" className="category-card">
            <Headphones size={28} />
            <span>Audio</span>
          </Link>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section style={{ marginTop: "2.5rem" }}>
        <div className="featured-header">
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Featured Products</h2>
          <Link to="/products" style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem" }}>
            View All &rarr;
          </Link>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;