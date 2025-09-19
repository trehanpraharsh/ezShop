package com.shop.order_ms.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import com.shop.order_ms.model.Orders.ordStatus;

@Data
@NoArgsConstructor
@ToString
public class OrdersDTO {

    @NotNull(message = "User ID cannot be null")
    @Positive(message = "User ID must be a positive number")
    private int userID;

    @NotNull(message = "Cart ID cannot be null")
    @Positive(message = "Cart ID must be a positive number")
    private int cartID;

    @NotNull(message = "Order price cannot be null")
    @Positive(message = "Order price must be a positive number")
    private Double orderPrice;

    @NotNull(message = "Order status cannot be null")
//    @Size(min = 1, message = "Order status must not be empty")
    private ordStatus orderStatus;

    public OrdersDTO(int userID, int cartID, Double orderPrice, ordStatus orderStatus) {
        this.userID = userID;
        this.cartID = cartID;
        this.orderPrice = orderPrice;
        this.orderStatus = orderStatus;
    }

    public OrdersDTO(int userID, int cartID, Double orderPrice) {
        this.userID = userID;
        this.cartID = cartID;
        this.orderPrice = orderPrice;
    }

}
