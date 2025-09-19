import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function CreateProduct() {
  const { addProduct } = useAppContext();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    prodName: "",
    prodPrice: "",
    prodDesc: "",
    category: "",
    prodImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      // category: value.split(",").map((cat) => cat.trim()), // Split and trim the input
      category: value, // Store category as a string
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure category is always an array
      const formattedCategory = product.category
        .split(",")
        .map((cat) => cat.trim());

      const formattedProduct = {
        ...product,
        category: formattedCategory,
      };

      console.log(formattedProduct);

      await addProduct(formattedProduct);
      navigate("/seller/manage-products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="prodName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="prodName"
            name="prodName"
            value={product.prodName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="prodPrice"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="prodPrice"
            name="prodPrice"
            value={product.prodPrice}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="prodDesc"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="prodDesc"
            name="prodDesc"
            value={product.prodDesc}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="prodImage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            id="prodImage"
            name="prodImage"
            value={product.prodImage}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
