import React from "react";
import { useAppContext } from "../context/AppContext";
import App from "../App";

function CategoryFilter() {
  const { categories, selectedCategory, setSelectedCategory } = useAppContext();

  return (
    <div className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`btn ${
                selectedCategory === null ? "btn-primary" : "btn-secondary"
              }`}
            >
              All
            </button>
          </li>
          {/* {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`btn ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))} */}

          {/* !------ */}
          {categories.map((category) => (
            <li key={category.catID}>
              <button
                onClick={() => setSelectedCategory(category.catName)}
                className={`btn ${
                  selectedCategory === category.catName
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {category.catName.charAt(0).toUpperCase() +
                  category.catName.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryFilter;
