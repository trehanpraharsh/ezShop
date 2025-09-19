package com.shop.cart_ms.service;

import com.shop.cart_ms.dto.CartDTO;
import com.shop.cart_ms.dto.ProductResponseDTO;
import com.shop.cart_ms.exception.CartNotFoundException;
import com.shop.cart_ms.exception.ProductOutOfStockException;
import com.shop.cart_ms.exception.ProductQuantityCheckException;
import com.shop.cart_ms.exception.UserNotFoundException;
import com.shop.cart_ms.model.Cart;
import com.shop.cart_ms.repository.CartRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final WebClient.Builder builder;
    private final CartRepo cartRepo;


//    public CartServiceImpl(WebClient.Builder builder, CartRepo cartRepo) {
//        this.builder = builder;
//        this.cartRepo = cartRepo;
//    }

    @Override
    public Cart createBlankNewCart(CartDTO cartDTO) {

        Cart existingCartIfAny = cartRepo.findActiveCartByUserID(cartDTO.getUserID());
        if(existingCartIfAny != null){
            existingCartIfAny.setActive(false);
            cartRepo.save(existingCartIfAny);
        }

        Cart cart = new Cart();
        cart.setUserID(cartDTO.getUserID());
        cart.setCouponID(-1);
        cart.setActive(true);

        Map<Integer, Integer> productsInfo = new HashMap<>();
        cart.setProductsInfo(productsInfo);

        return cartRepo.save(cart);
    }

    //map.put(productId, quantity)
    @Override
    public Cart addProductToCart(int userID, int productId, int productQuantity)
            throws ProductQuantityCheckException, ProductOutOfStockException {

        String ProductQuantityCheckURL = "http://PRODUCT-MS/products/checkQuantity/{prodID}/{prodQty}";

        Boolean isProductAvailable;
        try {
            isProductAvailable = builder.build()
                    .post()
                    .uri(ProductQuantityCheckURL, productId, productQuantity)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block();
        } catch (Exception e) {
            throw new ProductQuantityCheckException("Failed to check product quantity availability", e);
        }

        if(Boolean.FALSE.equals(isProductAvailable)){
            throw new ProductOutOfStockException("Product with ID: " + productId +
                    " is not available in the required quantity");
        }

        Cart cart = cartRepo.findActiveCartByUserID(userID);
        if(cart.isActive()){
            Map<Integer, Integer> productsInfo = cart.getProductsInfo();
            if(productsInfo.containsKey(productId)){
                //application logic to check if the product is already in the cart and add the quantity
//         productsInfo.put(productId, productsInfo.get(productId) + quantity); - might be a better way to do this
                productsInfo.put(productId, productQuantity);
            }else{
                productsInfo.put(productId, productQuantity);
            }
            cart.setProductsInfo(productsInfo);
        }
        //if there is no active cart then create a new blank one and add the product
        else{
            CartDTO cartDTO = new CartDTO(userID, 0);
            cart = createBlankNewCart(cartDTO);
            Map<Integer, Integer> productsInfo = cart.getProductsInfo();
            productsInfo.put(productId, productQuantity);
            cart.setProductsInfo(productsInfo);
        }
        return cartRepo.save(cart);
    }

    @Override
    public List<Cart> getAllCarts() {
        return cartRepo.findAll();
    }

    

    //* Used by the Order-Ms when user wishes to see the products in the cart
    // The cartID will be sent from Orders component
    @Override
    public List<ProductResponseDTO> getProductsOfOrder(int cartID) throws CartNotFoundException {
        Cart cart = cartRepo.findById(cartID).orElseThrow(() ->
                new CartNotFoundException("Cart not found with ID: " + cartID));

        Map<Integer, Integer> productsInfo = cart.getProductsInfo();

        String getProductsOfTheOrderURL = "http://PRODUCT-MS/products/checkAndSendProductsToOrder";

        List<ProductResponseDTO> products;
        try {
            products = builder.build()
                    .post()
                    .uri(getProductsOfTheOrderURL)
                    .bodyValue(productsInfo)
                    .retrieve()
                    .bodyToFlux(ProductResponseDTO.class)
                    .collectList()
                    .block();
        } catch (Exception e) {
            throw new CartNotFoundException("Failed to get products of the order", e);
        }

        return products;
    }

    @Override
    public Cart getDetailsOfCurrentActiveCart(int userID) {
        return cartRepo.findActiveCartByUserID(userID);
    }

    @Override
    public List<ProductResponseDTO> getProductsInCurrentActiveCart(int userID) throws CartNotFoundException,
            UserNotFoundException {

        Cart currentActiveCart = cartRepo.findActiveCartByUserID(userID);

        if(currentActiveCart == null){
            throw new UserNotFoundException("No user found with ID: " + userID);
        }

        Map<Integer, Integer> productsInfo = currentActiveCart.getProductsInfo();

        String getProductsOfTheCartURL = "http://PRODUCT-MS/products/checkAndSendProductsToOrder";

        List<ProductResponseDTO> products;
        try {
            products = builder.build()
                    .post()
                    .uri(getProductsOfTheCartURL)
                    .bodyValue(productsInfo)
                    .retrieve()
                    .bodyToFlux(ProductResponseDTO.class)
                    .collectList()
                    .block();
        } catch (Exception e) {
            throw new CartNotFoundException("Failed to get products of the order", e);
        }

        return products;

    }

    @Override
    public Cart removeProductFromCart(int userID, int productId, int productQty) throws ProductQuantityCheckException {
        Cart cart = cartRepo.findActiveCartByUserID(userID);
        Map<Integer, Integer> productsInfo = cart.getProductsInfo();
        if(productsInfo.containsKey(productId)){
            productsInfo.remove(productId);
            cart.setProductsInfo(productsInfo);
        }

        String increaseProductQtyURL = "http://PRODUCT-MS/products/increaseQty/{prodID}/{prodQty}";
        //increase the product quantity in the product table
        try{
            builder.build()
                    .post()
                    .uri(increaseProductQtyURL, productId, productQty)
                    .retrieve()
                    .bodyToMono(ProductResponseDTO.class)
                    .block();
        } catch (Exception e){
            throw new ProductQuantityCheckException("Failed to increase product quantity", e);
        }

        return cartRepo.save(cart);
    }

    @Override
    public Double getTotalPriceOfProductsInCart(int userID) throws ProductQuantityCheckException {
        Cart cart = cartRepo.findActiveCartByUserID(userID);
        Map<Integer, Integer> productsInfo = cart.getProductsInfo();

        String getTotalPriceOfProductsInCartURL = "http://PRODUCT-MS/products/totalPrice";

        Double totalPrice = -1.0;
        try {
            totalPrice = builder.build()
                    .post()
                    .uri(getTotalPriceOfProductsInCartURL)
                    .bodyValue(productsInfo)
                    .retrieve()
                    .bodyToMono(Double.class)
                    .block();
        } catch (Exception e) {
            throw new ProductQuantityCheckException("Failed to get total price of products in the cart", e);
        }

        return totalPrice;
    }

    @Override
    public Cart updateCouponID(int userID, int couponID) throws CartNotFoundException {
        Cart cart = cartRepo.findActiveCartByUserID(userID);
        if(cart != null){
            cart.setCouponID(couponID);
            return cartRepo.save(cart);
        }
        throw new CartNotFoundException("No active cart found for user with ID: " + userID);
    }


}
