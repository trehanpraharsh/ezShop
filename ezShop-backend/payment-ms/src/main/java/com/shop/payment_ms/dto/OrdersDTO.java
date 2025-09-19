package com.shop.payment_ms.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrdersDTO {

    private int orderID;
    //Will be passed from the frontend
    private int userID;
    //Will be passed from the frontend
    private int cartID;
    //Will be calculated from the cart and passed from frontend after coupon code is applied
    private Double orderPrice;

    //By Default, order status is pending - will be changed once payment status is returned
    @Enumerated(EnumType.STRING)
    private ordStatus orderStatus = ordStatus.PENDING;

    public enum ordStatus {
        PENDING,
        FAILED,
        PLACED,
        SHIPPED,
        OUT_FOR_DELIVERY,
        DELIVERED
    }

    public OrdersDTO(int userID, int cartID, Double orderPrice) {
        this.userID = userID;
        this.cartID = cartID;
        this.orderPrice = orderPrice;
    }

    public OrdersDTO(int userID, int cartID, Double orderPrice, String orderStatus) {
        this.userID = userID;
        this.cartID = cartID;
        this.orderPrice = orderPrice;
        this.orderStatus = ordStatus.valueOf(orderStatus);
    }

}
