import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products({ onAddToCart }) {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("default");

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
            setError("Unable to load products.");

        } finally {

            setLoading(false);
        }
    };

    // Filter products
    let filteredProducts = products.filter((product) => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Sort products
    if (sortOption === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    } else if (sortOption === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    } else if (sortOption === "name") {

        filteredProducts.sort(
            (a, b) => a.name.localeCompare(b.name)
        );
    }

    return (
        <div className="products-page">

            {/* Page Header */}

            <section className="page-header">

                <p className="section-label">
                    SMARTCART STORE
                </p>

                <h1>All Products</h1>

                <p>
                    Browse our collection and find what you need.
                </p>

            </section>


            <section className="products-section">

                {/* Search + Sort */}

                <div className="products-toolbar">

                    <div className="search-box">

                        <span>🔍</span>

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>


                    <select
                        value={sortOption}
                        onChange={(e) =>
                            setSortOption(e.target.value)
                        }
                        className="sort-select"
                    >

                        <option value="default">
                            Sort Products
                        </option>

                        <option value="price-low">
                            Price: Low to High
                        </option>

                        <option value="price-high">
                            Price: High to Low
                        </option>

                        <option value="name">
                            Name: A-Z
                        </option>

                    </select>

                </div>


                {/* Categories */}

                <div className="category-filter">

                    <button
                        className={
                            selectedCategory === "All"
                                ? "category-button active"
                                : "category-button"
                        }
                        onClick={() =>
                            setSelectedCategory("All")
                        }
                    >
                        All
                    </button>


                    {categories.map((category) => (

                        <button
                            key={category.id}
                            className={
                                selectedCategory === category.name
                                    ? "category-button active"
                                    : "category-button"
                            }
                            onClick={() =>
                                setSelectedCategory(category.name)
                            }
                        >
                            {category.name}
                        </button>

                    ))}

                </div>


                {/* Results */}

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


                {!loading &&
                    !error &&
                    filteredProducts.length === 0 && (

                        <div className="no-results">

                            <div>🔍</div>

                            <h2>
                                No products found
                            </h2>

                            <p>
                                Try another search or category.
                            </p>

                        </div>
                    )
                }


                {!loading && !error && (
                    <>

                        <p className="result-count">
                            {filteredProducts.length} product
                            {filteredProducts.length !== 1
                                ? "s"
                                : ""
                            }
                        </p>

                        <div className="product-grid">

                            {filteredProducts.map((product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={onAddToCart}
                                />

                            ))}

                        </div>

                    </>
                )}

            </section>

        </div>
    );
}

export default Products;