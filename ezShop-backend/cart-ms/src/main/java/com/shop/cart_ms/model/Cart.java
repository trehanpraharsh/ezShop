package com.shop.cart_ms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Component
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue
    private int cartID;

    //Will be passed in the frontend
    private int userID;

    //Will be passed in the frontend(if used)
    private int couponID;

    //default value should be true
    private boolean isActive = true;

    //* Map of (prodID, prodQuantity)
    @ElementCollection
    @CollectionTable(name = "products_info", joinColumns = @JoinColumn(name = "cartID"))
    @MapKeyColumn(name = "prod_id")
    @Column(name = "prod_quantity")
    private Map<Integer, Integer> productsInfo;

    public Cart(int userID, int couponID, boolean isActive, Map<Integer, Integer> productsInfo) {
        this.userID = userID;
        this.couponID = couponID;
        this.isActive = isActive;
        this.productsInfo = productsInfo;
    }

}
