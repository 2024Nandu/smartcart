import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Home({ onAddToCart }) {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            const [
                productsResponse,
                categoriesResponse
            ] = await Promise.all([
                api.get("/products"),
                api.get("/categories")
            ]);

            setProducts(productsResponse.data);
            setCategories(categoriesResponse.data);

        } catch (err) {

            console.error(err);
            setError("Unable to load store data.");

        } finally {

            setLoading(false);

        }
    };

    const getCategoryIcon = (category) => {

        if (category === "Electronics") {
            return "💻";
        }

        if (category === "Clothing") {
            return "👕";
        }

        if (category === "Accessories") {
            return "⌚";
        }

        return "🛍️";
    };

    return (
        <div>

            {/* ================= HERO ================= */}

            <section className="hero">

                <div className="hero-content">

                    <p className="hero-small">
                        WELCOME TO SMARTCART
                    </p>

                    <h1>
                        Shop Smart.
                        <br />
                        Shop Better.
                    </h1>

                    <p>
                        Discover quality products at great prices,
                        all in one place.
                    </p>

                    <div className="hero-actions">

                        <Link
                            to="/products"
                            className="hero-button"
                        >
                            Shop Now →
                        </Link>

                        <Link
                            to="/cart"
                            className="hero-secondary-button"
                        >
                            View Cart
                        </Link>

                    </div>

                </div>

                <div className="hero-icon">
                    🛒
                </div>

            </section>


            {/* ================= CATEGORIES ================= */}

            <section className="products-section">

                <div className="section-header">

                    <div>

                        <p className="section-label">
                            SHOP BY CATEGORY
                        </p>

                        <h2>
                            Explore Categories
                        </h2>

                    </div>

                </div>


                <div className="category-grid">

                    {categories.map((category) => (

                        <Link
                            key={category.id}
                            to="/products"
                            className="category-card"
                        >

                            <div className="category-icon">
                                {getCategoryIcon(category.name)}
                            </div>

                            <h3>
                                {category.name}
                            </h3>

                            <span>
                                Explore →
                            </span>

                        </Link>

                    ))}

                </div>

            </section>


            {/* ================= FEATURED PRODUCTS ================= */}

            <section className="products-section">

                <div className="section-header">

                    <div>

                        <p className="section-label">
                            OUR COLLECTION
                        </p>

                        <h2>
                            Featured Products
                        </h2>

                    </div>

                    <Link
                        to="/products"
                        className="see-all"
                    >
                        View All →
                    </Link>

                </div>


                {loading && (
                    <p className="status-message">
                        Loading products...
                    </p>
                )}


                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}


                {!loading && !error && (

                    <div className="product-grid">

                        {products
                            .slice(0, 6)
                            .map((product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={onAddToCart}
                                />

                            ))}

                    </div>

                )}

            </section>


            {/* ================= WHY SMARTCART ================= */}

            <section className="why-section">

                <div className="why-container">

                    <div className="why-heading">

                        <p className="section-label">
                            WHY SMARTCART
                        </p>

                        <h2>
                            Shopping made simple.
                        </h2>

                        <p>
                            We make it easy to discover products,
                            compare prices and manage your cart.
                        </p>

                    </div>


                    <div className="why-grid">

                        <div className="why-card">

                            <div className="why-icon">
                                🚚
                            </div>

                            <h3>
                                Fast Delivery
                            </h3>

                            <p>
                                Get your orders delivered quickly
                                and conveniently.
                            </p>

                        </div>


                        <div className="why-card">

                            <div className="why-icon">
                                🔒
                            </div>

                            <h3>
                                Secure Shopping
                            </h3>

                            <p>
                                Your shopping experience is designed
                                with security in mind.
                            </p>

                        </div>


                        <div className="why-card">

                            <div className="why-icon">
                                ⭐
                            </div>

                            <h3>
                                Quality Products
                            </h3>

                            <p>
                                Discover products selected for
                                everyday shopping.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="home-cta">

                <div>

                    <p className="section-label">
                        READY TO SHOP?
                    </p>

                    <h2>
                        Find something you'll love.
                    </h2>

                    <p>
                        Browse our complete collection today.
                    </p>

                </div>

                <Link
                    to="/products"
                    className="cta-button"
                >
                    Browse Products →
                </Link>

            </section>

        </div>
    );
}

export default Home;