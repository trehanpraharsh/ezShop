package com.shop.offers_ms.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@ToString
public class OfferDTO {

    @NotNull(message = "Offer code cannot be null")
    @NotBlank(message = "Offer code cannot be blank")
    private String offerCode;

    @NotNull(message = "Offer description cannot be null")
    @NotBlank(message = "Offer description cannot be blank")
    private String offerDescription;

    @Min(value = 0, message = "Discount percentage must be at least 0")
    @Max(value = 100, message = "Discount percentage must be at most 100")
    private int offerDiscountPercentage;

    @NotNull(message = "Offer start date cannot be null")
    @Future(message = "Offer start date must be in the future")
    private LocalDate offerStartDate;

    @NotNull(message = "Offer end date cannot be null")
    @Future(message = "Offer end date must be in the future")
    private LocalDate offerEndDate;

    public OfferDTO(String offerCode, String offerDescription, int offerDiscountPercentage, LocalDate offerStartDate,
                 LocalDate offerEndDate) {
        this.offerCode = offerCode;
        this.offerDescription = offerDescription;
        this.offerDiscountPercentage = offerDiscountPercentage;
        this.offerStartDate = offerStartDate;
        this.offerEndDate = offerEndDate;
    }

}
