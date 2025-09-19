package com.shop.cart_ms.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class CategoryResponseDTO {

    private int catID;
    private String catName;
//    private List<ProductResponseDTO> products;

    public CategoryResponseDTO(String catName) {
        this.catName = catName;
    }

}
