package com.shop.order_ms.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class ProductResponseDTO {

    private int prodID;
    private String prodName;
    private String prodDesc;
    private String prodImage;
    private double prodPrice;
    private int prodQty;
    private int sellerID;

    private List<CategoryResponseDTO> categories;

    public ProductResponseDTO(String prodName, String prodDesc, String prodImage, double prodPrice, int prodQty,
                              int sellerID) {
        this.prodName = prodName;
        this.prodDesc = prodDesc;
        this.prodImage = prodImage;
        this.prodPrice = prodPrice;
        this.prodQty = prodQty;
        this.sellerID = sellerID;
    }

}
