import { Link } from "react-router-dom";

function Cart({
                  cart,
                  onRemoveFromCart,
                  onUpdateQuantity
              }) {

    // Calculate total price
    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    // Get product image based on category
    const getProductImage = (category) => {

        if (category === "Electronics") {

            return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400";

        }

        if (category === "Clothing") {

            return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400";

        }

        if (category === "Accessories") {

            return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400";

        }

        return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400";
    };


    return (

        <div className="cart-page">


            {/* =========================
                PAGE HEADER
            ========================= */}

            <section className="page-header">

                <p className="section-label">
                    SMARTCART
                </p>

                <h1>
                    Your Cart
                </h1>

                <p>
                    Review your products before checkout.
                </p>

            </section>


            {/* =========================
                EMPTY CART
            ========================= */}

            {cart.length === 0 ? (

                <div className="empty-cart">

                    <div className="empty-icon">
                        🛒
                    </div>

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        Add some products to your cart
                        to get started.
                    </p>


                    <Link
                        to="/products"
                        className="checkout-shop-button"
                    >
                        Continue Shopping
                    </Link>

                </div>

            ) : (


                /* =========================
                   CART CONTENT
                ========================= */

                <div className="cart-container">


                    {/* =========================
                        CART ITEMS
                    ========================= */}

                    <div className="cart-items">

                        {cart.map((item) => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >


                                {/* PRODUCT IMAGE */}

                                <div className="cart-item-image">

                                    <img
                                        src={getProductImage(
                                            item.category
                                        )}
                                        alt={item.name}
                                    />

                                </div>


                                {/* PRODUCT INFORMATION */}

                                <div className="cart-item-info">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        {item.category}
                                    </p>

                                    <strong>
                                        ₹{item.price.toFixed(2)}
                                    </strong>

                                </div>


                                {/* =========================
                                    QUANTITY CONTROL
                                ========================= */}

                                <div className="quantity-control">

                                    <button
                                        onClick={() =>
                                            onUpdateQuantity(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        −
                                    </button>


                                    <span>
                                        {item.quantity}
                                    </span>


                                    <button
                                        onClick={() =>
                                            onUpdateQuantity(
                                                item.id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                {/* =========================
                                    REMOVE BUTTON
                                ========================= */}

                                <button
                                    className="remove-button"
                                    onClick={() =>
                                        onRemoveFromCart(
                                            item.id
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        ))}

                    </div>


                    {/* =========================
                        ORDER SUMMARY
                    ========================= */}

                    <div className="cart-summary">

                        <h2>
                            Order Summary
                        </h2>


                        {/* ITEM COUNT */}

                        <div className="summary-row">

                            <span>
                                Items
                            </span>

                            <span>

                                {cart.reduce(
                                    (sum, item) =>
                                        sum + item.quantity,
                                    0
                                )}

                            </span>

                        </div>


                        {/* TOTAL */}

                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹{total.toFixed(2)}
                            </strong>

                        </div>


                        {/* CHECKOUT */}

                        <Link
                            to="/checkout"
                            className="checkout-button"
                        >
                            Proceed to Checkout →
                        </Link>


                        {/* CONTINUE SHOPPING */}

                        <Link
                            to="/products"
                            className="continue-shopping"
                        >
                            ← Continue Shopping
                        </Link>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Cart;