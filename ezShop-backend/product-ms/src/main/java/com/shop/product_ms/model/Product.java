package com.shop.product_ms.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Component
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue
    private int prodID;
    private String prodName;
    private String prodDesc;
    private String prodImage;
    private double prodPrice;
    private int prodQty;
    private int sellerID;

    //* Cascade ko Persist aur merge karne pr hi chala not all pr
    //! Cascade ko persist aur merge karne pr hi chala not all pr
    //? Cascade ko persist aur merge karne pr hi chala not all pr
    //todo Cascade ko persist aur merge karne pr hi chala not all pr

    @JsonManagedReference
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "prodID"),
            inverseJoinColumns = @JoinColumn(name = "catID")
    )
    private List<Category> categories;

    public Product(String prodName, String prodDesc, String prodImage, double prodPrice, int prodQty, int sellerID) {
        this.prodName = prodName;
        this.prodDesc = prodDesc;
        this.prodImage = prodImage;
        this.prodPrice = prodPrice;
        this.prodQty = prodQty;
        this.sellerID = sellerID;
    }

}
