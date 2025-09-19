package com.shop.user_ms.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class ContactDetailsDTO {

    @NotNull(message = "Contact name cannot be null")
    @NotBlank(message = "Contact name cannot be blank")
    private String contactName;

    @NotNull(message = "Contact email cannot be null")
    @NotBlank(message = "Contact email cannot be blank")
    @Email(message = "Contact email should be valid")
    private String contactEmail;

    @NotNull(message = "Contact number cannot be null")
    @Positive(message = "Contact number must be a positive number")
    @Pattern(regexp = "^\\d{10}$", message = "Contact number must be a 10 digit number")
    private String contactNumber;

    @NotNull(message = "Contact must have at least one address")
    @NotEmpty(message = "Contact must have at least one address")
    private List<AddressDTO> addresses;

    public ContactDetailsDTO(String contactName, String contactEmail, String contactNumber) {
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.contactNumber = contactNumber;
    }

}
