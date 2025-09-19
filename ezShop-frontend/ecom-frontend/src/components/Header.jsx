import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import debounce from "lodash/debounce";

function Header() {
  const { cart, user, logout, setSearchTerm } = useAppContext();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      navigate("/");
    }, 300),
    [setSearchTerm, navigate]
  );

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setLocalSearchTerm(term);
    if (term.length === 0 || term.length > 2) {
      debouncedSearch(term);
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".relative")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-secondary text-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors logo"
            to={
              user
                ? user.role === "seller"
                  ? "/seller/dashboard"
                  : user.role === "admin"
                  ? "/admin/dashboard"
                  : "/"
                : "/"
            }
          >
            EzShop
          </Link>
          <div className="hidden md:flex flex-grow mx-4">
            <div className="relative w-full max-w-xl mx-auto">
              <input
                type="text"
                value={localSearchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-primary"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user && user.role === "user" && (
              <>
                <Link
                  className="hover:text-primary transition-colors"
                  to="/orders"
                >
                  Orders
                </Link>
                <Link
                  className="hover:text-primary transition-colors relative"
                  to="/cart"
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 004 0z"
                    />
                  </svg>
                  {cart.products.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.products.reduce((sum, item) => {
                        return sum + (Number(item.prodQty) || 0);
                      }, 0)}
                    </span>
                  )}
                </Link>
              </>
            )}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {user.username}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/edit-profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Edit Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    {user.role === "seller" && (
                      <>
                        <Link
                          to="/seller/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Seller Dashboard
                        </Link>
                        <Link
                          to="/seller/manage-products"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Manage Products
                        </Link>
                        <Link
                          to="/seller/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Manage Orders
                        </Link>
                        <Link
                          to="/seller/create-product"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Create Product
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </Link>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {showMobileMenu && (
        <div className="md:hidden bg-secondary py-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={localSearchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {user && user.role === "user" && (
                <>
                  <Link
                    className="hover:text-primary transition-colors"
                    to="/orders"
                  >
                    Orders
                  </Link>
                  <Link
                    className="hover:text-primary transition-colors"
                    to="/cart"
                  >
                    Cart (
                    {cart.products.reduce((sum, item) => {
                      return sum + (Number(item.prodQty) || 0);
                    }, 0)}
                    )
                  </Link>
                </>
              )}
              {user && user.role === "seller" && (
                <>
                  <Link
                    className="hover:text-primary transition-colors"
                    to="/seller/dashboard"
                  >
                    Seller Dashboard
                  </Link>
                  <Link
                    className="hover:text-primary transition-colors"
                    to="/seller/manage-products"
                  >
                    Manage Products
                  </Link>
                  <Link
                    className="hover:text-primary transition-colors"
                    to="/seller/orders"
                  >
                    Manage Orders
                  </Link>
                  <Link
                    className="hover:text-primary transition-colors"
                    to="/seller/create-product"
                  >
                    Create Product
                  </Link>
                </>
              )}
              {user && user.role === "admin" && (
                <Link
                  className="hover:text-primary transition-colors"
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              )}
              {user ? (
                <>
                  <Link
                    to="/edit-profile"
                    className="hover:text-primary transition-colors"
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-primary transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-primary transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Logout
            </h2>
            <p className="mb-4 text-gray-600">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
