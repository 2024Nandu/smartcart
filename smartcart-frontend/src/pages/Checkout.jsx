import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout({ cart, onClearCart }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        payment: "Cash on Delivery"
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.address ||
            !formData.city ||
            !formData.pincode
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            setError("");
            setIsSubmitting(true);

            const orderData = {
                customerName: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                pincode: formData.pincode,
                paymentMethod: formData.payment,
                totalAmount: total
            };

            const response = await api.post("/orders", orderData);

            console.log("Order created:", response.data);

            onClearCart();

            navigate("/order-success", {
                state: {
                    order: response.data
                }
            });
        } catch (err) {
            console.error("Order creation failed:", err);

            setError(
                err.response?.data?.message ||
                "Unable to place order. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-empty">
                <h2>Your cart is empty</h2>
                <p>Add products before proceeding to checkout.</p>

                <Link
                    to="/products"
                    className="checkout-shop-button"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <section className="page-header">
                <p className="section-label">SMARTCART</p>
                <h1>Checkout</h1>
                <p>Complete your order details below.</p>
            </section>

            <div className="checkout-container">
                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >
                    <h2>Delivery Information</h2>

                    <div className="form-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone *</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address *</label>
                        <textarea
                            name="address"
                            placeholder="House no, street, area"
                            value={formData.address}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>City *</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Enter city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Pincode *</label>
                            <input
                                type="text"
                                name="pincode"
                                placeholder="400001"
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <h2 className="payment-heading">Payment Method</h2>

                    <div className="payment-options">
                        <label className="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="Cash on Delivery"
                                checked={formData.payment === "Cash on Delivery"}
                                onChange={handleChange}
                            />
                            <span>💵 Cash on Delivery</span>
                        </label>

                        <label className="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="UPI"
                                checked={formData.payment === "UPI"}
                                onChange={handleChange}
                            />
                            <span>📱 UPI</span>
                        </label>

                        <label className="payment-option">
                            <input
                                type="radio"
                                name="payment"
                                value="Card"
                                checked={formData.payment === "Card"}
                                onChange={handleChange}
                            />
                            <span>💳 Credit / Debit Card</span>
                        </label>
                    </div>

                    {error && (
                        <p className="checkout-error">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="place-order-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Placing Order..." : "Place Order →"}
                    </button>
                </form>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>

                    <div className="checkout-items">
                        {cart.map((item) => (
                            <div className="checkout-item" key={item.id}>
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>Qty: {item.quantity}</p>
                                </div>

                                <strong>
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </strong>
                            </div>
                        ))}
                    </div>

                    <div className="checkout-total">
                        <span>Total</span>
                        <strong>₹{total.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
