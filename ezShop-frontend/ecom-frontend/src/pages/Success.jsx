import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Success() {
  const { fetchOrderDetails } = useAppContext();

  const handlePaymentSuccess = () => {
    // Payment successful
    fetchOrderDetails();
    // navigate('/orders');
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <svg
        className="mx-auto h-24 w-24 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h1 className="text-3xl font-bold mt-4 mb-2">Payment Successful!</h1>
      <p className="text-xl mb-8">Thank you for your purchase.</p>
      <Link onClick={handlePaymentSuccess} to="/" className="btn btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
}

export default Success;
