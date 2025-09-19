import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const { cart, addOrder, discountedTotal, payments } = useAppContext();
  const navigate = useNavigate();

  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [upiIdError, setUpiIdError] = useState("");

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 12) {
      setCardNumber(value);
      setCardNumberError(
        value.length === 12 ? "" : "Card number must be 12 digits"
      );
    } else {
      setCardNumberError("Card number must be numeric and 12 digits long");
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    setExpiryDate(value);
    if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      setExpiryDateError("");
    } else {
      setExpiryDateError("Expiry date must be in MM/YY format");
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    setCvv(value);
    if (/^\d{3}$/.test(value)) {
      setCvvError("");
    } else {
      setCvvError("CVV must be a 3-digit number");
    }
  };

  const handleUpiIdChange = (e) => {
    const value = e.target.value;
    setUpiId(value);
    if (!value.includes("@upi")) {
      setUpiIdError('UPI ID must contain "@upi"');
    } else {
      setUpiIdError("");
    }
  };

  // const total = cart.products.reduce(
  //   (sum, item) => sum + item.prodPrice * item.prodQty,
  //   0
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payments : ", payments);
    const orderDetails = async () => {
      const orderResponse = await fetch(
        `http://localhost:8085/order/${payments.orderID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const orderData = await orderResponse.json();
      return orderData;
    };
    const orderInfo = orderDetails();
    console.log(orderInfo);
    const order = {
      //not sure this is working or not ...orderinfo
      ...orderInfo,
      orderID: payments.orderID,
      items: cart.products,
      // total: discountedTotal,
      date: payments.paymentDateAndTime.substring(0, 10),
      paymentMethod: payments.paymentMethod,
    };
    console.log(order);
    addOrder(order);
    const updatePaymentMethod = async () => {
      const updatePaymentResponse = await fetch(
        `http://localhost:8086/payment/${payments.orderID}/${paymentMethod}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const paymentData = await updatePaymentResponse.json();
      return paymentData;
    };
    const updatedPaymentDetails = updatePaymentMethod();
    console.log("updatedPaymentDetails = ", updatedPaymentDetails);
    navigate("/success");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {cart.products.map((item) => (
              <div
                key={item.prodID}
                className="flex justify-between items-center"
              >
                <span>
                  {item.prodName} (x{item.prodQty})
                </span>
                <span>₹{(item.prodPrice * item.prodQty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>₹{discountedTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "CARD"}
                    onChange={() => setPaymentMethod("CARD")}
                  />
                  <span className="ml-2">Card</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === "UPI"}
                    onChange={() => setPaymentMethod("UPI")}
                  />
                  <span className="ml-2">UPI</span>
                </label>
              </div>
            </div>
            {paymentMethod === "CARD" ? (
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="cardNumber"
                  >
                    Card Number
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                  {cardNumberError && (
                    <p className="text-red-500 text-xs mt-1">
                      {cardNumberError}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="cardName"
                  >
                    Name on Card
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    id="cardName"
                    type="text"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="expiryDate"
                    >
                      Expiry Date
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      id="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      required
                    />
                    {expiryDateError && (
                      <p className="text-red-500 text-xs mt-1">
                        {expiryDateError}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="cvv"
                    >
                      CVV
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      required
                    />
                    {cvvError && (
                      <p className="text-red-500 text-xs mt-1">{cvvError}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="upiId"
                >
                  UPI ID
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  id="upiId"
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={handleUpiIdChange}
                  required
                />
                {upiIdError && (
                  <p className="text-red-500 text-xs mt-1">{upiIdError}</p>
                )}
              </div>
            )}
            <button
              type="submit"
              className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 transition-colors"
            >
              Pay ₹{discountedTotal.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
