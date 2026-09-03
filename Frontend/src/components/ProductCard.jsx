import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <img
                src={product.image}
                alt={product.title}
                className="product-card-img"
            />
            <div className="product-card-content">
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {product.category}
                </span>
                <h3 className="product-title">{product.title}</h3>
                <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button
                        className="btn-add-cart"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingBag size={16} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;