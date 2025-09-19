import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function ProductCard({ product }) {
  const { addToCart, user } = useAppContext();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
    } else {
      setShowLoginPrompt(true);
    }
  };

  return (
    <div className="card animate-fade-in">
      <img
        src={product.prodImage}
        className="w-full h-48 object-contain p-4"
        alt={product.prodName}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">
          {product.prodName}
        </h3>
        <p className="text-gray-600 mb-4">₹{product.prodPrice.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <Link to={`/product/${product.prodID}`} className="btn btn-secondary">
            View Details
          </Link>
          <button onClick={handleAddToCart} className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
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
  );
}

export default ProductCard;
