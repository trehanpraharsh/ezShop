import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductCatalogue from "./pages/ProductCatalogue";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import EditProfile from "./pages/EditProfile";
import SellerDashboard from "./pages/SellerDashboard";
import ManageProducts from "./pages/ManageProducts";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import AdminDashboard from "./pages/AdminDashboard";
import { AppProvider } from "./context/AppContext";
import "./index.css";
import RecentOrders from "./pages/RecentOrders";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<ProductCatalogue />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/success" element={<Success />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/orders" element={<RecentOrders />} />
              <Route
                path="/seller/manage-products"
                element={<ManageProducts />}
              />
              <Route
                path="/seller/create-product"
                element={<CreateProduct />}
              />
              <Route
                path="/seller/edit-product/:id"
                element={<EditProduct />}
              />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <footer className="bg-secondary text-white py-4 text-center">
            <p>
              &copy; 2025 <span className="logo">EzShop.</span> All rights
              reserved.
            </p>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
