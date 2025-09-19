import React from "react";
import { Link } from "react-router-dom";

function LandingSection() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 logo">
              Welcome to EzShop
            </h1>
            <p className="text-xl mb-6">
              Discover amazing products at unbeatable prices!
            </p>
            <Link
              to="/"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              // src="/placeholder.svg?height=300&width=400"
              src="https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?q=80&w=2123&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{ width: "700px", height: "300px" }}
              alt="Shopping illustration"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          {/* <div className="md:w-1/2 flex justify-center">
            <svg
              className="w-full max-w-md h-auto"
              viewBox="0 0 646 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M538.942 328.524C541.313 323.782 540.182 317.952 535.44 315.581L486.376 288.158C481.634 285.787 475.804 286.918 473.433 291.66C471.062 296.402 472.193 302.232 476.935 304.603L520.415 329.041L495.977 372.521C493.606 377.263 494.737 383.093 499.479 385.464C504.221 387.835 510.051 386.704 512.422 381.962L538.942 328.524Z"
                fill="white"
              />
              <path
                d="M341.545 453.506C338.205 457.824 338.975 463.874 343.293 467.214L386.851 501.732C391.169 505.072 397.219 504.302 400.559 499.984C403.899 495.666 403.129 489.616 398.811 486.276L360.069 455.741L390.604 417C393.944 412.682 393.174 406.632 388.856 403.292C384.538 399.952 378.488 400.722 375.148 405.04L341.545 453.506Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M245.698 196.083C245.698 174.897 262.93 157.665 284.116 157.665H362.204C383.39 157.665 400.621 174.897 400.621 196.083V274.17C400.621 295.356 383.39 312.588 362.204 312.588H284.116C262.93 312.588 245.698 295.356 245.698 274.17V196.083ZM284.116 180.913C275.725 180.913 268.947 187.692 268.947 196.083V274.17C268.947 282.561 275.725 289.34 284.116 289.34H362.204C370.595 289.34 377.373 282.561 377.373 274.17V196.083C377.373 187.692 370.595 180.913 362.204 180.913H284.116Z"
                fill="white"
              />
              <path
                d="M323.16 219.332C336.46 219.332 347.242 208.55 347.242 195.249C347.242 181.949 336.46 171.167 323.16 171.167C309.859 171.167 299.077 181.949 299.077 195.249C299.077 208.55 309.859 219.332 323.16 219.332Z"
                fill="white"
              />
              <path
                d="M268.947 258.416L291.779 235.584C294.894 232.469 299.942 232.469 303.057 235.584L323.16 255.687L359.263 219.584C362.378 216.469 367.426 216.469 370.541 219.584L377.373 226.416V274.17C377.373 282.561 370.595 289.34 362.204 289.34H284.116C275.725 289.34 268.947 282.561 268.947 274.17V258.416Z"
                fill="white"
              />
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default LandingSection;
