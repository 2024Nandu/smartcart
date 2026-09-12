import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
    return (
        <nav className="navbar">
            <div className="nav-container">

                <Link to="/" className="logo">
                    🛒 SmartCart
                </Link>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>

                    <Link to="/cart" className="cart-link">
                        🛒 Cart
                        {cartCount > 0 && (
                            <span className="cart-badge">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;