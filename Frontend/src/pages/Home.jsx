import { Link } from "react-router";
import { Laptop, Shirt, Watch, Headphones, ArrowRight } from "lucide-react";
import ProductCard from "../components/ProductCard";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    title: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 2,
    title: "Minimalist Smart Watch",
    price: 149.50,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    id: 3,
    title: "Classic Cotton Denim Jacket",
    price: 89.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80",
  },
  {
    id: 4,
    title: "Ergonomic Mechanical Keyboard",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
  },
];

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Banner Container */}
      <section className="hero-section">
        <h1>Designed For You.</h1>
        <p>Explore top-rated products with fast delivery and exclusive season discounts.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
          Shop Products Now <ArrowRight size={18} />
        </Link>
      </section>

      {/* Category Section with Grid */}
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

        <div className="products-grid">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;