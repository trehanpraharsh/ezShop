import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function ManageProducts() {
  const { products, deleteProduct, fetchProducts } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    //fetch all products
    fetchProducts();
  }, [location]);

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link to="/seller/create-product" className="btn btn-primary">
          Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.prodID}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={product.prodImage}
              alt={product.prodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 truncate">
                {product.prodName}
              </h2>
              <p className="text-gray-600 mb-2">₹{product.prodPrice}</p>
              <p className="text-sm text-gray-500 mb-4">
                {Array.isArray(product.category) && product.category.length > 0
                  ? product.category.map((cat) => cat).join(", ")
                  : "No categories available"}
              </p>
              <div className="flex justify-between">
                <Link
                  to={`/seller/edit-product/${product.prodID}`}
                  className="btn btn-secondary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product.prodID)}
                  className="btn bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;
