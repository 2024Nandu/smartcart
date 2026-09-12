import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function ProductDetails({ onAddToCart }) {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {

        try {

            const response = await api.get(`/products/${id}`);

            setProduct(response.data);

        } catch (err) {

            console.error(err);

            setError("Product not found.");

        } finally {

            setLoading(false);

        }
    };


    const getProductImage = () => {

        if (product.category === "Electronics") {

            return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800";

        }

        if (product.category === "Clothing") {

            return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800";

        }

        if (product.category === "Accessories") {

            return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800";

        }

        return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800";
    };


    if (loading) {

        return (
            <div className="status-message">
                Loading product...
            </div>
        );

    }


    if (error) {

        return (
            <div className="error-message">
                {error}
            </div>
        );

    }


    return (

        <div className="product-details-page">

            <div className="product-details">

                {/* PRODUCT IMAGE */}

                <div className="details-image">

                    <img
                        src={getProductImage()}
                        alt={product.name}
                    />

                </div>


                {/* PRODUCT INFORMATION */}

                <div className="details-content">

                    <p className="product-category">
                        {product.category}
                    </p>

                    <h1>
                        {product.name}
                    </h1>

                    <p className="details-price">
                        ₹{product.price.toFixed(2)}
                    </p>

                    <p className="details-description">
                        A quality product available at SmartCart.
                        Add it to your cart and continue shopping.
                    </p>


                    <div className="details-actions">

                        <button
                            className="add-button large"
                            onClick={() => onAddToCart(product)}
                        >
                            🛒 Add to Cart
                        </button>


                        <Link
                            to="/products"
                            className="view-button large"
                        >
                            ← Back to Products
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;