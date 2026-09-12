import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
    const location = useLocation();

    const order = location.state?.order;

    if (!order) {
        return (
            <div className="order-success-page">
                <div className="success-card">
                    <div className="success-icon">✓</div>
                    <h1>Order Placed Successfully!</h1>
                    <p>Your order has been received.</p>

                    <Link to="/products" className="success-button">
                        Continue Shopping →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="order-success-page">
            <div className="success-card">
                <div className="success-icon">✓</div>

                <p className="section-label">SMARTCART</p>

                <h1>Order Placed Successfully!</h1>

                <p className="success-message">
                    Thank you for shopping with SmartCart.
                    Your order has been successfully placed.
                </p>

                <div className="order-info">
                    <div className="success-row">
                        <span>Order ID</span>
                        <strong>#{order.id}</strong>
                    </div>

                    <div className="success-row">
                        <span>Customer</span>
                        <strong>{order.customerName}</strong>
                    </div>

                    <div className="success-row">
                        <span>Payment</span>
                        <strong>{order.paymentMethod}</strong>
                    </div>

                    <div className="success-row total-row">
                        <span>Total Amount</span>
                        <strong>₹{Number(order.totalAmount).toFixed(2)}</strong>
                    </div>
                </div>

                <div className="success-actions">
                    <Link to="/products" className="success-button">
                        Continue Shopping →
                    </Link>

                    <Link to="/" className="success-secondary-button">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;