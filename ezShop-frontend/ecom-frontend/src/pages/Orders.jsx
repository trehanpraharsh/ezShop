import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Orders() {
  const { orders, fetchOrderDetails } = useAppContext();
  // const [orderStatuses, setOrderStatuses] = useState({});

  // useEffect(() => {
  //   // Simulating API call to fetch order statuses
  //   const fetchOrderStatuses = async () => {
  //     // In a real app, this would be an API call
  //     const fakeStatuses = orders.reduce((acc, order) => {
  //       acc[order.id] = [
  //         "Processing",
  //         "Shipped",
  //         "Out for delivery",
  //         "Delivered",
  //       ][Math.floor(Math.random() * 4)];
  //       return acc;
  //     }, {});
  //     setOrderStatuses(fakeStatuses);
  //   };

  //   fetchOrderStatuses();
  // }, [orders]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders when the component mounts
    fetchOrderDetails();
  }, []);

  const handleItemClick = (prodID) => {
    // Handle item click event here, e.g., show item details
    console.log("Item clicked:", prodID);
    navigate(`/product/${prodID}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderID}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Order #{order.orderID}
                </h2>
                <p className="text-gray-950 font-semibold">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Order Status:
                  {/* <span
                    className={`ml-2 ${
                      orderStatuses[order.orderID] === "Delivered"
                        ? "text-green-600"
                        : orderStatuses[order.orderID] === "Processing"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {orderStatuses[order.orderID]}
                  </span> */}
                  <span
                    className={`ml-2 ${
                      order.orderStatus === "DELIVERED"
                        ? "text-green-600"
                        : order.orderStatus === "PENDING"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {Array.isArray(order.items) &&
                  order.items.map((item) => (
                    <li
                      key={item.prodID}
                      className="py-4 flex hover:shadow-lg cursor-pointer"
                      onClick={() => handleItemClick(item.prodID)}
                    >
                      <img
                        className="h-16 w-16 object-cover rounded"
                        src={item.prodImage}
                        alt={item.prodName}
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium">{item.prodName}</h3>
                        <p className="text-gray-600">
                          Quantity: {item.prodQty}
                        </p>
                        <p className="text-gray-600">
                          ₹{(item.prodPrice * item.prodQty).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-semibold">
                  Total: ₹{order.orderPrice.toFixed(2) || 0}
                </p>
                <p className="text-gray-600">
                  Payment Method:{" "}
                  <span className="text-red-900 font-semibold">
                    {order.paymentMethod}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
