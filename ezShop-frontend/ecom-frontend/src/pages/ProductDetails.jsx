import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart, user } = useAppContext();
  const [product, setProduct] = useState(null);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // function addToCart(product) {
  //   fetch("http://localhost:4000/cart/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //     body: JSON.stringify({ product }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Add to cart response:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding to cart:", error);
  //     });
  // }

  const [isUserAllowed, setIsUserAllowed] = useState(true);

  useEffect(() => {
    const handleUserLogin = () => {
      if (user == null || user.role === "user") {
        return true;
      } else {
        return false;
      }
    };

    setIsUserAllowed(handleUserLogin());
  }, [user]);

  const handleAddToCart = () => {
    if (user && isUserAllowed) {
      addToCart(product);
    } else {
      setShowLoginPrompt(true);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8081/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-8">
            <img
              className="h-64 w-full object-contain md:w-96"
              src={product.prodImage}
              alt={product.prodName}
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{product.prodName}</h1>
            <p className="text-gray-600 mb-4">{product.prodDesc}</p>
            <p className="text-2xl font-bold text-primary mb-6">
              ₹{product.prodPrice.toFixed(2)}
            </p>
            {isUserAllowed && (
              <button
                className="btn btn-primary text-lg"
                // onClick={() => addToCart(product)}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
            {/* <button
              className="btn btn-primary text-lg"
              // onClick={() => addToCart(product)}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button> */}
          </div>
        </div>

        {/* !---------------------------------------- */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Please Log In</h2>
              <p className="mb-4">
                You need to be logged in to add items to your cart.
              </p>
              <div className="flex justify-end">
                <Link to="/login" className="btn btn-primary mr-2">
                  Log In
                </Link>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
