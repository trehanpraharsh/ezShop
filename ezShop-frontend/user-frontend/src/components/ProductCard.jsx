// import React from "react";
// import { Link } from "react-router-dom";

// function ProductCard({ product }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
//       <img
//         src={product.image}
//         className="w-full h-48 object-contain"
//         alt={product.title}
//       />
//       <div className="p-4">
//         <h3 className="font-semibold text-lg mb-2 truncate">{product.title}</h3>
//         <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
//         <Link
//           to={`/product/${product.id}`}
//           className="bg-primary text-white px-4 py-2 rounded-full inline-block hover:bg-opacity-80 transition-colors"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function ProductCard({ product }) {
  const { addToCart } = useAppContext();

  return (
    <div className="card animate-fade-in">
      <img
        src={product.image}
        className="w-full h-48 object-contain p-4"
        alt={product.title}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{product.title}</h3>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <Link to={`/product/${product.id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
