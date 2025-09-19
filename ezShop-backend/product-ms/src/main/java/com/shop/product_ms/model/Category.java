package com.shop.product_ms.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue
    private int catID;
    @Column(unique = true)
    private String catName;

    @JsonBackReference
    @ManyToMany(mappedBy = "categories")
    private List<Product> products;

    public Category(String catName) {
        this.catName = catName;
    }
}
