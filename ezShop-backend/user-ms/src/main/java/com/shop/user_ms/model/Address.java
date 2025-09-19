package com.shop.user_ms.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Component
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue
    private int addressID;
    private String addressFlatNoAndName;
    private String addressStreet;
    private String addressCity;
    private String addressState;
    private String addressCountry;
    private String addressPincode;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "contactID")
    private ContactDetails contactDetails;

    public Address(String addressFlatNoAndName, String addressStreet, String addressCity, String addressState, String addressCountry, String addressPincode) {
        this.addressFlatNoAndName = addressFlatNoAndName;
        this.addressStreet = addressStreet;
        this.addressCity = addressCity;
        this.addressState = addressState;
        this.addressCountry = addressCountry;
        this.addressPincode = addressPincode;
    }

}
