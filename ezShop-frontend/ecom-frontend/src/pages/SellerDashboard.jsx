import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function SellerDashboard() {
  const { products, updateOrderStatus, user } = useAppContext();
  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);

  const [orders, setOrders] = useState([]);

  const fetchOrderDetailsForSeller = async () => {
    try {
      // Check if user is logged in and user ID is available
      if (!user || !user.id) {
        console.error("User is not logged in or user ID is missing");
        return;
      }

      // Fetch the orders for the user
      const orderResponse = await fetch(`http://localhost:8085/order/`);
      const orderDataList = await orderResponse.json();
      console.log("orderDataList = ", orderDataList);

      // Iterate over each order and fetch the products for each cartID
      const ordersWithItems = await Promise.all(
        orderDataList.map(async (order) => {
          const productsResponse = await fetch(
            `http://localhost:8085/order/products/${order.cartID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const products = await productsResponse.json();
          console.log(products);

          const paymentResponse = await fetch(
            `http://localhost:8086/payment/${order.orderID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const paymentsData = await paymentResponse.json();
          console.log(paymentsData);

          return {
            ...order,
            items: products || [],
            date: paymentsData.paymentDateAndTime.substring(0, 10),
            paymentMethod: paymentsData.paymentMethod,
          };
        })
      );

      console.log("ordersWithItems", ordersWithItems);
      // Set the orders state with the fetched data
      ordersWithItems.sort((a, b) => b.orderID - a.orderID);
      const filteredOrders = ordersWithItems.filter((order) =>
        order.items.some((item) => item.sellerID === user.id)
      );
      console.log("filteredOrders", filteredOrders);
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  //! --------------------------------------------
  useEffect(() => {
    fetchOrderDetailsForSeller();
  }, []);
  //! --------------------------------------------

  useEffect(() => {
    // In a real app, filter products and orders based on the seller's ID
    console.log(orders);
    setSellerProducts(products);
    setSellerOrders(orders);
  }, [products, orders]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-2xl font-semibold p-4 bg-gray-50">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellerOrders.slice(0, 5).map((order) => (
                  <tr key={order.orderID}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.orderID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{order.orderPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.orderStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order.orderID, e.target.value)
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      >
                        {/* PENDING, FAILED, PLACED, SHIPPED, OUT_FOR_DELIVERY,
                        DELIVERED */}
                        <option value="PENDING">PENDING</option>
                        <option value="FAILED">FAILED</option>
                        <option value="PLACED">PLACED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="OUT_FOR_DELIVERY">
                          OUT FOR DELIVERY
                        </option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4">
            <Link to="/seller/orders" className="text-primary hover:underline">
              View all orders
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-2xl font-semibold p-4 bg-gray-50">
            Product Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {sellerProducts.slice(0, 4).map((product) => (
              <div key={product.prodID} className="border rounded-lg p-4">
                <img
                  src={product.prodImage}
                  alt={product.prodName}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h3 className="font-semibold truncate">{product.prodName}</h3>
                <p className="text-sm text-gray-600">
                  ₹{product.prodPrice.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4">
            <Link
              to="/seller/manage-products"
              className="text-primary hover:underline"
            >
              Manage products
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/seller/create-product" className="btn btn-primary">
          Create New Product
        </Link>
      </div>
    </div>
  );
}

export default SellerDashboard;
