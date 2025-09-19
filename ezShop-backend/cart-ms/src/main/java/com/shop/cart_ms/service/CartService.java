package com.shop.cart_ms.service;

import com.shop.cart_ms.dto.CartDTO;
import com.shop.cart_ms.dto.ProductResponseDTO;
import com.shop.cart_ms.exception.CartNotFoundException;
import com.shop.cart_ms.exception.ProductOutOfStockException;
import com.shop.cart_ms.exception.ProductQuantityCheckException;
import com.shop.cart_ms.exception.UserNotFoundException;
import com.shop.cart_ms.model.Cart;

import java.util.List;

public interface CartService {

    public Cart createBlankNewCart(CartDTO cartDTO);

    public Cart addProductToCart(int userID, int productId, int productQuantity)
            throws ProductQuantityCheckException, ProductOutOfStockException;

    public List<Cart> getAllCarts();

    //CartID can be sent from the orders-ms, that will be used here to get the products in the cart
    public List<ProductResponseDTO> getProductsOfOrder(int cartID) throws CartNotFoundException;

    public Cart getDetailsOfCurrentActiveCart(int userID);

    //* Another method will be there which will show the products in the currently active cart of the user
    public List<ProductResponseDTO> getProductsInCurrentActiveCart(int userID) throws CartNotFoundException,
            UserNotFoundException;

    public Cart removeProductFromCart(int userID, int productId, int productQty) throws ProductQuantityCheckException;

    public Double getTotalPriceOfProductsInCart(int userID) throws ProductQuantityCheckException;

    public Cart updateCouponID(int userID, int couponID) throws CartNotFoundException;


}
