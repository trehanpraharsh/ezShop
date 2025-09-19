package com.shop.order_ms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CartDTO {

    private int cartID;

    //Will be passed in the frontend
    private int userID;

    //Will be passed in the frontend(if used)
    private int couponID;

    //default value should be true
    private boolean isActive = true;

    //* Map of (prodID, prodQuantity)
    private Map<Integer, Integer> productsInfo;

    public CartDTO(int userID, int couponID, boolean isActive, Map<Integer, Integer> productsInfo) {
        this.userID = userID;
        this.couponID = couponID;
        this.isActive = isActive;
        this.productsInfo = productsInfo;
    }

    public CartDTO(int userID, int couponID) {
        this.userID = userID;
        this.couponID = couponID;
    }

}
