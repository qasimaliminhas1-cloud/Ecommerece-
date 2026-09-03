// src/pages/Products.jsx
import { useState } from "react";
import { ShoppingCart, Filter, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductDetailModal from "../features/products/ProductDetailModal";

const ALL_PRODUCTS = [
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
  {
    id: 5,
    title: "Leather Crossbody Bag",
    price: 75.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
  },
  {
    id: 6,
    title: "Studio Monitor Headphones",
    price: 249.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80",
  },
];

const CATEGORIES = ["All", "Electronics", "Fashion", "Accessories"];

const Products = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(300);
  const [activeProduct, setActiveProduct] = useState(null);

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>Explore All Products</h2>
        <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>
          Showing {filteredProducts.length} items
        </span>
      </div>

      <div className="products-page-layout">
        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-group">
            <h3 className="filter-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Filter size={18} /> Filters
            </h3>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Categories</h4>
            <ul className="category-list">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Max Price</h4>
            <div className="price-range-container">
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
              <div className="price-labels">
                <span>$50</span>
                <span>${maxPrice}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main>
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your current filter criteria.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-card-img"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveProduct(product)}
                  />
                  <div className="product-card-content">
                    <span className="product-category">{product.category}</span>
                    <h3
                      className="product-title"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveProduct(product)}
                    >
                      {product.title}
                    </h3>
                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          className="btn-add-cart"
                          style={{ background: "var(--background)", color: "var(--text-main)", border: "1px solid var(--border)" }}
                          onClick={() => setActiveProduct(product)}
                          title="Quick View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-add-cart"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart size={16} />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Product Quick View Modal */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </div>
  );
};

export default Products;