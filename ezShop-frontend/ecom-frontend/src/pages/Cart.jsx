import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Cart() {
  const {
    cart,
    setCart,
    removeFromCart,
    user,
    payments,
    setPayments,
    setDiscountedTotal,
  } = useAppContext();
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountedTot, setDiscountedTot] = useState(0);
  const navigate = useNavigate();

  //!---------------------------------
  //to handle cases where the cart or products might be null or undefined
  if (!cart || !cart.products) {
    return <div>Loading...</div>;
  }

  //! -----------------------
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const cartResponse = await fetch(
          `http://localhost:8084/cart/${user.id}`
        );
        const cartData = await cartResponse.json();
        console.log("cartData = ", cartData);

        // Process the cart data using productsInfo
        const productsResponse = await fetch(
          `http://localhost:8084/cart/products/${user.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cartData.productsInfo),
          }
        );
        const products = await productsResponse.json();
        setCart({
          cartID: cartData.cartID,
          userID: cartData.userID,
          couponID: cartData.couponID,
          products: products,
          active: cartData.active,
        });
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };

    fetchCartDetails();
    console.log(cart);
  }, [setCart, user]);
  //! -----------------------

  // Function to remove an item from the cart
  const handleRemoveFromCart = (productId) => {
    console.log("Removing product with ID:", productId);
    removeFromCart(productId);
  };

  const total = cart.products.reduce(
    (sum, item) => sum + item.prodPrice * item.prodQty,
    0
  );

  useEffect(() => {
    // Simulating API call to fetch coupons
    const fetchCoupons = async () => {
      // In a real app, this would be an API call
      // const fakeCoupons = [
      //   { id: 1, code: "SUMMER10", discount: 10 },
      //   { id: 2, code: "FALL20", discount: 20 },
      //   { id: 3, code: "WINTER30", discount: 30 },
      // ];
      const response = await fetch("http://localhost:8083/offers/");
      const data = await response.json();
      setCoupons(data);
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    if (selectedCoupon) {
      const discountAmount =
        (total * selectedCoupon.offerDiscountPercentage) / 100;
      setDiscountedTot(total - discountAmount);
    } else {
      setDiscountedTot(total);
    }
  }, [selectedCoupon, total]);

  const handleCouponSelect = (coupon) => {
    console.log(coupon);
    console.log(cart);
    setSelectedCoupon(coupon);
    const updateCoupon = async () => {
      const response = await fetch(
        `http://localhost:8084/cart/updateCoupon/${user.id}/${coupon.offerID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCart({ ...cart, couponID: data.couponID });
      console.log(cart);
    };
    updateCoupon();
  };

  const handleCheckout = () => {
    console.log(cart);
    const paymentBody = {
      orderID: 999,
      paymentMethod: "UPI",
      paymentAmount: discountedTot,
      paymentDateAndTime: new Date().toISOString(),
      paymentStatus: "SUCCESSFUL",
    };
    setDiscountedTotal(discountedTot);
    const createPayments = async () => {
      const response = await fetch(
        `http://localhost:8086/payment/${user.id}/${cart.cartID}/${discountedTot}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentBody),
        }
      );
      const data = await response.json();
      setPayments(data);
      //change payments data type from array to object and maybe name it currentPayment
    };
    createPayments();
    console.log(payments);
    navigate("/payment");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.products.length === 0 ? (
        <div className="text-center text-gray-500 animate-fade-in">
          <p className="text-2xl mb-4">Your cart is empty</p>
          <p>Add some products to your cart and they will appear here</p>
        </div>
      ) : (
        <>
          {cart.products.map((item, index) => (
            <div
              key={item.prodID}
              className="bg-white rounded-lg shadow-md p-6 mb-4 flex justify-between items-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center">
                <img
                  src={item.prodImage}
                  alt={item.prodName}
                  className="w-16 h-16 object-contain mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.prodName}</h3>
                  <p className="text-gray-600">Quantity: {item.prodQty}</p>
                  <p className="text-primary font-bold mt-2">
                    ₹{(item.prodPrice * item.prodQty).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.prodID)}
                className="text-red-500 hover:text-red-700 transition-colors"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
          <div
            className="bg-white rounded-lg shadow-md p-6 mt-8 animate-slide-up"
            style={{ animationDelay: `${cart.length * 0.1}s` }}
          >
            <h4 className="text-xl font-bold mb-4">Apply Coupon</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {coupons.map((coupon) => (
                <button
                  key={coupon.offerID}
                  onClick={() => handleCouponSelect(coupon)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCoupon && selectedCoupon.offerID === coupon.offerID
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {coupon.offerCode} ({coupon.offerDiscountPercentage}% off)
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Subtotal:</span>
              <span className="text-lg font-semibold">₹{total.toFixed(2)}</span>
            </div>
            {selectedCoupon && (
              <div className="flex justify-between items-center mb-4 text-green-600">
                <span className="text-lg">
                  Discount ({selectedCoupon.offerDiscountPercentage}% off):
                </span>
                <span className="text-lg font-semibold">
                  -₹{(total - discountedTot).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold">
                ₹{discountedTot.toFixed(2)}
              </span>
            </div>
            <button
              className="btn btn-primary w-full text-lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
