import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import "./App.css";

function App() {

    const [cart, setCart] = useState([]);


    // =========================
    // ADD PRODUCT TO CART
    // =========================

    const addToCart = (product) => {

        setCart((currentCart) => {

            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {

                return currentCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };


    // =========================
    // REMOVE PRODUCT FROM CART
    // =========================

    const removeFromCart = (productId) => {

        setCart((currentCart) =>
            currentCart.filter(
                (item) => item.id !== productId
            )
        );
    };


    // =========================
    // UPDATE QUANTITY
    // =========================

    const updateQuantity = (productId, quantity) => {

        if (quantity <= 0) {

            removeFromCart(productId);

            return;
        }

        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: quantity
                    }
                    : item
            )
        );
    };


    // =========================
    // CLEAR CART
    // =========================

    const clearCart = () => {

        setCart([]);

    };


    // =========================
    // CART COUNT
    // =========================

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    return (
        <>
            {/* NAVBAR */}

            <Navbar cartCount={cartCount} />


            <main>

                <Routes>

                    {/* HOME */}

                    <Route
                        path="/"
                        element={
                            <Home
                                onAddToCart={addToCart}
                            />
                        }
                    />


                    {/* PRODUCTS */}

                    <Route
                        path="/products"
                        element={
                            <Products
                                onAddToCart={addToCart}
                            />
                        }
                    />


                    {/* PRODUCT DETAILS */}

                    <Route
                        path="/products/:id"
                        element={
                            <ProductDetails
                                onAddToCart={addToCart}
                            />
                        }
                    />


                    {/* CART */}

                    <Route
                        path="/cart"
                        element={
                            <Cart
                                cart={cart}
                                onRemoveFromCart={removeFromCart}
                                onUpdateQuantity={updateQuantity}
                            />
                        }
                    />


                    {/* CHECKOUT */}

                    <Route
                        path="/checkout"
                        element={
                            <Checkout
                                cart={cart}
                                onClearCart={clearCart}
                            />
                        }
                    />


                    {/* ORDER SUCCESS */}

                    <Route
                        path="/order-success"
                        element={
                            <OrderSuccess />
                        }
                    />

                </Routes>

            </main>


            {/* FOOTER */}

            <footer>

                <p>
                    © 2026 SmartCart.
                    Shop Smart. Shop Better.
                </p>

            </footer>
        </>
    );
}

export default App;