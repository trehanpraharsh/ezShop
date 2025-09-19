package com.shop.order_ms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Component
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue
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

    public Orders(int userID, int cartID, Double orderPrice) {
        this.userID = userID;
        this.cartID = cartID;
        this.orderPrice = orderPrice;
    }

}
