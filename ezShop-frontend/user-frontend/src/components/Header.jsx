import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link className="text-2xl font-bold text-primary" to="/">
          AmazonClone
        </Link>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Link className="hover:text-primary transition-colors" to="/cart">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
