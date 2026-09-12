import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {

    const getProductImage = () => {

        if (product.category === "Electronics") {
            return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600";
        }

        if (product.category === "Clothing") {
            return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600";
        }

        if (product.category === "Accessories") {
            return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600";
        }

        return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600";
    };

    return (
        <div className="product-card">

            <div className="product-image">

                <img
                    src={getProductImage()}
                    alt={product.name}
                />

            </div>

            <div className="product-info">

                <span className="product-category">
                    {product.category}
                </span>

                <h3>{product.name}</h3>

                <p className="product-price">
                    ₹{product.price.toFixed(2)}
                </p>

                <div className="product-actions">

                    <Link
                        to={`/products/${product.id}`}
                        className="view-button"
                    >
                        View
                    </Link>

                    <button
                        onClick={() => onAddToCart(product)}
                        className="add-button"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;