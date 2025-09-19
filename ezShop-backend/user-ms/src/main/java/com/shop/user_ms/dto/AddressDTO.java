package com.shop.user_ms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class AddressDTO {

    @NotNull(message = "Flat number and name cannot be null")
    @NotBlank(message = "Flat number and name cannot be blank")
    private String addressFlatNoAndName;

    @NotNull(message = "Street cannot be null")
    @NotBlank(message = "Street cannot be blank")
    private String addressStreet;

    @NotNull(message = "City cannot be null")
    @NotBlank(message = "City cannot be blank")
    private String addressCity;

    @NotNull(message = "State cannot be null")
    @NotBlank(message = "State cannot be blank")
    private String addressState;

    @NotNull(message = "Country cannot be null")
    @NotBlank(message = "Country cannot be blank")
    private String addressCountry;

    @NotNull(message = "Pincode cannot be null")
    @Positive(message = "Pincode must be a positive number")
    @Pattern(regexp = "^\\d{6}$", message = "Pincode must be a six-digit number")
    private String addressPincode;

    public AddressDTO(String addressFlatNoAndName, String addressStreet, String addressCity, String addressState, String addressCountry, String addressPincode) {
        this.addressFlatNoAndName = addressFlatNoAndName;
        this.addressStreet = addressStreet;
        this.addressCity = addressCity;
        this.addressState = addressState;
        this.addressCountry = addressCountry;
        this.addressPincode = addressPincode;
    }

}
