package com.shop.user_ms.model;

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
@Table(name = "contact_details")
public class ContactDetails {

    @Id
    @GeneratedValue
    private int contactID;
    private String contactName;
    private String contactEmail;
    private String contactNumber;

    @JsonManagedReference
    @OneToMany(mappedBy = "contactDetails", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    public ContactDetails(String contactName, String contactEmail, String contactNumber) {
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.contactNumber = contactNumber;
    }

}
