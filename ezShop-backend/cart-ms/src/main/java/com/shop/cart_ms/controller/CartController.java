package com.shop.cart_ms.controller;

import com.shop.cart_ms.dto.CartDTO;
import com.shop.cart_ms.dto.ProductResponseDTO;
import com.shop.cart_ms.exception.CartNotFoundException;
import com.shop.cart_ms.exception.ProductOutOfStockException;
import com.shop.cart_ms.exception.ProductQuantityCheckException;
import com.shop.cart_ms.exception.UserNotFoundException;
import com.shop.cart_ms.model.Cart;
import com.shop.cart_ms.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;

    @PostMapping("/blank")
    public ResponseEntity<Cart> createBlankNewCart(@RequestBody @Valid CartDTO cartDTO) {
        return new ResponseEntity<>(cartService.createBlankNewCart(cartDTO), HttpStatus.CREATED);
    }

    @PostMapping("/addtoCart/{userID}/{productId}/{productQuantity}")
    public ResponseEntity<Cart> addProductToCart(@PathVariable @Valid int userID,
                                                 @PathVariable @Valid int productId,
                                                 @PathVariable @Valid int productQuantity)
            throws ProductOutOfStockException, ProductQuantityCheckException {
        return new ResponseEntity<>(cartService.addProductToCart(userID, productId, productQuantity), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cart>> getAllCarts() {
        return new ResponseEntity<>(cartService.getAllCarts(), HttpStatus.OK);
    }

    @PostMapping("/products/order/{cartID}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsOfOrder(@PathVariable @Valid int cartID)
            throws CartNotFoundException {
        return new ResponseEntity<>(cartService.getProductsOfOrder(cartID), HttpStatus.OK);
    }

    @PostMapping("/products/{userID}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsInCurrentActiveCart(@PathVariable @Valid int userID)
            throws CartNotFoundException, UserNotFoundException {
        return new ResponseEntity<>(cartService.getProductsInCurrentActiveCart(userID), HttpStatus.OK);
    }

    //* Get active cart details to the user
    @GetMapping("/{userID}")
    public ResponseEntity<Cart> getDetailsOfCurrentActiveCart(@PathVariable @Valid int userID) {
        return new ResponseEntity<>(cartService.getDetailsOfCurrentActiveCart(userID), HttpStatus.OK);
    }

    @DeleteMapping("/removeFromCart/{userID}/{productId}/{productQty}")
    public ResponseEntity<Cart> removeProductFromCart(@PathVariable @Valid int userID,
                                                      @PathVariable @Valid int productId,
                                                      @PathVariable @Valid int productQty)
            throws ProductQuantityCheckException {
        return new ResponseEntity<>(cartService.removeProductFromCart(userID, productId, productQty), HttpStatus.OK);
    }

    @GetMapping("/totalPrice/{userID}")
    public ResponseEntity<Double> getTotalPriceOfProductsInCart(@PathVariable @Valid int userID)
            throws ProductQuantityCheckException {
        return new ResponseEntity<>(cartService.getTotalPriceOfProductsInCart(userID), HttpStatus.OK);
    }

    @PutMapping("/updateCoupon/{userID}/{couponID}")
    public ResponseEntity<Cart> updateCouponID(@PathVariable @Valid int userID,
                                               @PathVariable @Valid int couponID)
            throws CartNotFoundException {
        return new ResponseEntity<>(cartService.updateCouponID(userID, couponID), HttpStatus.OK);
    }


}
