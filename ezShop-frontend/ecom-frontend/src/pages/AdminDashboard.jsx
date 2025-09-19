import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function AdminDashboard() {
  const { products, deleteProduct } = useAppContext();
  const [activeTab, setActiveTab] = useState("products");
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch all orders and their payment dates
    const fetchOrdersAndPayments = async () => {
      const ordersResponse = await fetch("http://localhost:8085/order/");
      const ordersData = await ordersResponse.json();

      const ordersWithDates = await Promise.all(
        ordersData.map(async (order) => {
          const paymentResponse = await fetch(
            `http://localhost:8086/payment/${order.orderID}`
          );
          const paymentData = await paymentResponse.json();
          return {
            ...order,
            date: paymentData.paymentDateAndTime, // Use paymentDateTime as order date
          };
        })
      );

      setOrders(ordersWithDates);
    };

    fetchOrdersAndPayments();
  }, []);

  useEffect(() => {
    // Fetch all payments
    const fetchPayments = async () => {
      const paymentsResponse = await fetch("http://localhost:8086/payment/");
      const paymentsData = await paymentsResponse.json();
      setPayments(paymentsData);
    };

    fetchPayments();
  }, []);

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === "products"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === "orders"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("payments")}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === "payments"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Payments
        </button>
      </div>

      {activeTab === "products" && (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden p-6">
          <h2 className="text-2xl font-semibold mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.prodID}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              >
                <img
                  src={product.prodImage}
                  alt={product.prodName}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold mb-2 truncate">
                    {product.prodName}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    ₹{product.prodPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {Array.isArray(product.category) &&
                    product.category.length > 0
                      ? product.category.map((cat) => cat).join(", ")
                      : "No categories available"}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      to={`/product/${product.prodID}`}
                      state={{ isAdminView: true }}
                      className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/80 transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.prodID)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <h2 className="text-2xl font-semibold p-6">All Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.orderID}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.orderID}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(order.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ₹{order.orderPrice.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.orderStatus}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === "payments" && (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <h2 className="text-2xl font-semibold p-6">All Payments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment.paymentID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.paymentID}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.orderID}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{payment.paymentAmount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDateTime(payment.paymentDateAndTime)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.paymentStatus}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-2 px-4 border-b text-center">
                      No payments available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
