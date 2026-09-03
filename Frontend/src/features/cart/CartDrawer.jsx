import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="cart-drawer-overlay" onClick={toggleCart}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="cart-drawer-header">
                    <h3>Your Shopping Cart</h3>
                    <button className="close-btn" onClick={toggleCart} aria-label="Close">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="cart-drawer-body">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty-state">
                            <ShoppingCart size={48} strokeWidth={1.5} style={{ marginBottom: "0.5rem" }} />
                            <p>Your cart is currently empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-title">{item.title}</h4>
                                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                                    <div className="cart-item-actions">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus size={12} />
                                        </button>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="cart-drawer-footer">
                        <div className="cart-total-row">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="btn-checkout" onClick={() => alert("Proceeding to Checkout Modal...")}>
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;