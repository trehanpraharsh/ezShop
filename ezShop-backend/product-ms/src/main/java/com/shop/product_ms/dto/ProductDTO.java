package com.shop.product_ms.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class ProductDTO {

    @NotNull(message = "Product name cannot be null")
    @NotBlank(message = "Product name cannot be blank")
    private String prodName;

    @NotNull(message = "Product description cannot be null")
    @NotBlank(message = "Product description cannot be blank")
    private String prodDesc;

    @NotNull(message = "Please provide an image for the product")
    @NotBlank(message = "Product image cannot be blank")
    private String prodImage;

    @NotNull(message = "Product price cannot be null")
    @Min(value = 0, message = "Product price must be positive")
    private double prodPrice;

    @NotNull(message = "Product quantity cannot be null")
    @Min(value = 0, message = "Product quantity must be positive")
    private int prodQty;

    @NotNull(message = "Seller ID cannot be null")
    @Positive(message = "Seller ID must be a positive number")
    private int sellerID;

    @NotNull(message = "Product must belong to at least one category")
    @NotEmpty(message = "Product must belong to at least one category")
    private List<CategoryDTO> categories;

    public ProductDTO(String prodName, String prodDesc, String prodImage, double prodPrice, int prodQty, int sellerID) {
        this.prodName = prodName;
        this.prodDesc = prodDesc;
        this.prodImage = prodImage;
        this.prodPrice = prodPrice;
        this.prodQty = prodQty;
        this.sellerID = sellerID;
    }

}
