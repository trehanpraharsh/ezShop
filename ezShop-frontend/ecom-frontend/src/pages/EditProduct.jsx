import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useAppContext();
  const [product, setProduct] = useState({
    prodName: "",
    prodPrice: "",
    prodDesc: "",
    category: [],
    prodImage: "",
  });

  useEffect(() => {
    const productToEdit = products.find((p) => p.prodID === parseInt(id));
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      navigate("/seller/manage-products");
    }
  }, [id, products, navigate]);

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
        prodPrice: parseFloat(product.prodPrice),
      };

      await updateProduct(id, formattedProduct);
      navigate("/seller/manage-products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
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
          <div>
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
          <div>
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
          <div className="col-span-1 md:col-span-2">
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
              rows="4"
              required
            ></textarea>
          </div>
          <div className="col-span-1 md:col-span-2">
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
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/seller/manage-products")}
            className="btn btn-secondary mr-4"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
