import React from "react";
import { useAppContext } from "../context/AppContext";

function Cart() {
  const { cart, removeFromCart } = useAppContext();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md p-6 mb-4 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-primary font-bold mt-2">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h4 className="text-2xl font-bold mb-4">Total: ${total.toFixed(2)}</h4>
        <button className="w-full bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
