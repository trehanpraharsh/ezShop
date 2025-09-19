import React from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import LandingSection from "../components/LandingSection";
import { useAppContext } from "../context/AppContext";

function ProductCatalogue() {
  const { filteredProducts, selectedCategory, searchTerm } = useAppContext();

  const displayedProducts = selectedCategory
    ? filteredProducts.filter((product) =>
        product.category.includes(selectedCategory)
      )
    : filteredProducts;

  return (
    <div>
      <LandingSection />
      <div className="container mx-auto px-4 py-8">
        {searchTerm.length === 0 && (
          <div className="mb-8">
            <CategoryFilter />
          </div>
        )}
        <h2 className="text-3xl font-bold mb-8 text-center">
          {selectedCategory
            ? `${
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              }`
            : searchTerm.length > 2
            ? `Search Results for "${searchTerm}"`
            : "Featured Products"}
        </h2>
        {displayedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product, index) => (
              <div
                key={product.prodID}
                className={`animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCatalogue;
