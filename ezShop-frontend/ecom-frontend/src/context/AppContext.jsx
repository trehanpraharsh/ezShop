import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  //! Changed cart type from [] to object
  const [cart, setCart] = useState({
    cartID: null,
    userID: null,
    couponID: null,
    products: [],
    active: true,
  });
  const [user, setUser] = useState(null);
  // const [individualOrder, setIndividualOrder] = useState({
  //   orderID: 202,
  //   userID: user.id,
  //   cartID: cart.cartID,
  //   orderPrice: discountedTotal,
  //   orderStatus: "PENDING",
  //   items: [],
  // });
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    //!------
    if (user && user.id) {
      fetchCartDetails();
    }
    //!------
    if (user && user.id) {
      fetchOrderDetails();
    }
  }, [user]);

  //! -----------------------

  const fetchCartDetails = async () => {
    try {
      // Check if user is logged in and user ID is available
      if (!user || !user.id) {
        console.error("User is not logged in or user ID is missing");
        return;
      }

      const cartResponse = await fetch(`http://localhost:8084/cart/${user.id}`);
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
      console.log("cart = ", cart);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  //! -----------------------

  const fetchOrderDetails = async () => {
    try {
      // Check if user is logged in and user ID is available
      if (!user || !user.id) {
        console.error("User is not logged in or user ID is missing");
        return;
      }

      // Fetch the orders for the user
      const orderResponse = await fetch(
        `http://localhost:8085/order/user/${user.id}`
      );
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

      console.log(ordersWithItems);
      // Set the orders state with the fetched data
      ordersWithItems.sort((a, b) => b.orderID - a.orderID);
      setOrders(ordersWithItems);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  //! -----------------------

  //! -----------------------

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/products/", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const data = await response.json();
      const transformedProducts = data.map((product) => ({
        ...product,
        category: product.categories.map((cat) => cat.catName),
      }));
      setProducts(transformedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8081/products/category");
      const data = await response.json();
      // const uniqueCategories = data.map((item) => item.catName);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // const addToCart = (product) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === product.prodID);
  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     }
  //     return [...prevCart, { ...product, quantity: 1 }];
  //   });
  // };

  //! ------------------
  const addToCart = async (product) => {
    try {
      let quantity = 1;

      // Check if the item is already in the cart
      const existingCartItem = cart.products.find(
        (item) => item.prodID === product.prodID
      );

      // If the item is in the cart, increase the quantity value
      if (existingCartItem) {
        quantity = existingCartItem.prodQty + 1;
      }

      // Post the data to the URL with userID, productID, and productQuantity
      const addToCartResponse = await fetch(
        `http://localhost:8084/cart/addtoCart/${user.id}/${product.prodID}/${quantity}`,
        {
          method: "POST",
        }
      );
      const newCartData = await addToCartResponse.json();
      console.log("newCartData = ", newCartData);

      // Process the returned cart object using productsInfo
      const updatedProductsInfo = newCartData.productsInfo;
      const productsResponse = await fetch(
        `http://localhost:8084/cart/products/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductsInfo),
        }
      );
      const updatedProducts = await productsResponse.json();

      // Update the cart state with the new product list
      setCart({ ...cart, products: updatedProducts });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  //!---------------------------------------------------

  // const removeFromCart = (productId) => {
  //   setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  // };

  //! --------------------------------------------------------

  const removeFromCart = async (productId) => {
    try {
      console.log("Received productId:", productId);

      // Check if productId is defined and log it
      if (productId === undefined || productId === null) {
        console.error("productId is undefined or null");
        return;
      }

      // Convert productId to an integer
      const numProductId = Number(productId);
      if (isNaN(numProductId)) {
        console.error("productId is not a valid number");
        return;
      }

      //logic to get the quantity of items to be removed
      let productQuantityBefore;
      cart.products.map((item) => {
        if (item.prodID === numProductId) {
          productQuantityBefore = item.prodQty;
        }
      });
      console.log("productQuantityBefore", productQuantityBefore);

      // Post the data to the URL with userID, productID, and productQuantity
      const removeFromCartResponse = await fetch(
        `http://localhost:8084/cart/removeFromCart/${user.id}/${numProductId}/${productQuantityBefore}`,
        {
          method: "DELETE",
        }
      );
      console.log("prodID = ", productId);
      console.log("removeFromCartResponse = ", removeFromCartResponse);
      const newCartData = await removeFromCartResponse.json();
      console.log("newCartData = ", newCartData);

      // Process the returned cart object using productsInfo
      const updatedProductsInfo = newCartData.productsInfo;
      const productsResponse = await fetch(
        `http://localhost:8084/cart/products/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductsInfo),
        }
      );
      const updatedProducts = await productsResponse.json();

      // Update the cart state with the new product list
      setCart({ ...cart, products: updatedProducts });

      // Hit the API to increase the product quantity
      //   const increaseQuantityResponse = await fetch(
      //     `http://localhost:8081/product/increaseQty/${numProductId}/${productQuantityBefore}`,
      //     {
      //       method: "POST",
      //     }
      //   );
      //   console.log("increaseQuantityResponse = ", increaseQuantityResponse);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  //! --------------------------------------------------------

  const login = async (username, password) => {
    // Simulating API call with dummy credentials
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "user" && password === "user") {
          setUser({
            id: 1,
            username: "user",
            email: "user@example.com",
            role: "user",
            contactNumber: "",
            address: "",
          });
          resolve({ success: true, role: "user" });
        } else if (username === "seller" && password === "seller") {
          setUser({
            id: 5,
            username: "seller",
            email: "seller@example.com",
            role: "seller",
            contactNumber: "",
            address: "",
          });
          resolve({ success: true, role: "seller" });
        } else if (username === "admin" && password === "admin") {
          setUser({
            id: 3,
            username: "admin",
            email: "admin@example.com",
            role: "admin",
            contactNumber: "",
            address: "",
          });
          resolve({ success: true, role: "admin" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    setCart({
      cartID: null,
      userID: null,
      couponID: null,
      products: [],
      active: true,
    });
    setOrders([]);
  };

  const updateUserProfile = (updatedProfile) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedProfile }));
  };

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
    setCart({
      cartID: null,
      userID: null,
      couponID: null,
      products: [],
      active: true,
    }); // Clear the cart after placing an order
  };

  const addProduct = (product) => {
    const addProductFnc = async () => {
      const formattedProduct = {
        prodID: product.prodID,
        prodName: product.prodName,
        prodDesc: product.prodDesc,
        prodImage: product.prodImage,
        prodPrice: product.prodPrice,
        prodQty: 100,
        sellerID: user.id,
        categories: product.category.map((cat) => ({ catName: cat })),
      };
      console.log(formattedProduct);
      const addProductResponse = await fetch(
        "http://localhost:8081/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedProduct),
        }
      );
      const prodJSON = await addProductResponse.json();
      console.log(prodJSON);
      return prodJSON;
    };
    const fetchCall = addProductFnc();
    setProducts((prevProducts) => [
      ...prevProducts,
      // { ...product, prodID: fetchCall.prodID },
      { ...fetchCall },
    ]);
  };

  const updateProduct = (productId, updatedProduct) => {
    const updateProductFnc = async () => {
      const formattedProduct = {
        ...updatedProduct,
        categories: updatedProduct.category.map((cat) => ({ catName: cat })),
      };

      const updateProductResponse = await fetch(
        `http://localhost:8081/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedProduct),
        }
      );
      const prodJSON = await updateProductResponse.json();
      console.log(prodJSON);
      return prodJSON;
    };
    const fetchCall = updateProductFnc();
    console.log(fetchCall);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.prodID === productId ? { ...product, fetchCall } : product
      )
    );
  };

  const deleteProduct = (productId) => {
    const deleteFnc = async () => {
      fetch(`http://localhost:8081/products/${productId}`, {
        method: "DELETE",
      });
    };
    const delResponse = deleteFnc();
    console.log(delResponse);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.prodID !== productId)
    );
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const getOrder = async () => {
      const orderResponse = await fetch(
        `http://localhost:8085/order/${orderId}`
      );
      const orderData = await orderResponse.json();
      console.log(orderData);
      return orderData;
    };
    let orderData = await getOrder();
    orderData = {
      userID: orderData.userID,
      cartID: orderData.cartID,
      orderPrice: orderData.orderPrice,
      orderStatus: newStatus,
    };

    console.log("Order data to be sent:", orderData); // Debugging line

    const updateOrderSts = async () => {
      fetch(`http://localhost:8085/order/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
    };
    const ordResponse = updateOrderSts();
    console.log("ordResponse = ", ordResponse);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderID === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
  };

  const filteredProducts = useMemo(() => {
    if (searchTerm.length > 2) {
      const lowercaseTerm = searchTerm.toLowerCase();
      return products.filter(
        (product) =>
          product.prodName.toLowerCase().includes(lowercaseTerm) ||
          product.category.some((cat) =>
            cat.toLowerCase().includes(lowercaseTerm)
          )
      );
    }
    return products;
  }, [products, searchTerm]);

  return (
    <AppContext.Provider
      value={{
        products,
        filteredProducts,
        categories,
        selectedCategory,
        setSelectedCategory,
        cart,
        setCart,
        user,
        orders,
        addToCart,
        removeFromCart,
        login,
        logout,
        updateUserProfile,
        addOrder,
        searchTerm,
        setSearchTerm,
        discountedTotal,
        setDiscountedTotal,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        payments,
        setPayments,
        fetchOrderDetails,
        fetchProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
