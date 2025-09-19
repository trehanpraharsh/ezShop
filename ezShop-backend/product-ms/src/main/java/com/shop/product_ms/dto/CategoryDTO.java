package com.shop.product_ms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class CategoryDTO {

    @NotNull(message = "Category name cannot be null")
    @NotBlank(message = "Category name cannot be blank")
    private String catName;
    private List<ProductDTO> products;

    public CategoryDTO(String catName) {
        this.catName = catName;
    }

}
