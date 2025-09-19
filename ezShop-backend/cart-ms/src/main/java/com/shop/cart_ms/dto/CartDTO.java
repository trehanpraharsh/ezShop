package com.shop.cart_ms.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Map;

@Data
@NoArgsConstructor
@ToString
public class CartDTO {

    @NotNull(message = "User ID cannot be null")
    @Positive(message = "User ID must be a positive number")
    private int userID;

    @NotNull(message = " Coupon ID cannot be null")
    @Positive(message = "Coupon ID must be a positive number")
    private int couponID;

    private boolean isActive;

    private Map<Integer, Integer> productsInfo;

    public CartDTO(int userID, int couponID, Map<Integer, Integer> productsInfo) {
        this.userID = userID;
        this.couponID = couponID;
//        this.isActive = isActive;
        this.productsInfo = productsInfo;
    }

    public CartDTO(int userID, int couponID) {
        this.userID = userID;
        this.couponID = couponID;
    }

    public CartDTO(int userID){
        this.userID = userID;
    }


}
