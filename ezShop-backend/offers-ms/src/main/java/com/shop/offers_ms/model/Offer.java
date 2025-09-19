package com.shop.offers_ms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Component
@Table(name = "offers")
public class Offer {

    @Id
    @GeneratedValue
    private int offerID;
    private String offerCode;
    private String offerDescription;
    private int offerDiscountPercentage;
    private LocalDate offerStartDate;
    private LocalDate offerEndDate;

    public Offer(String offerCode, String offerDescription, int offerDiscountPercentage, LocalDate offerStartDate,
                 LocalDate offerEndDate) {
        this.offerCode = offerCode;
        this.offerDescription = offerDescription;
        this.offerDiscountPercentage = offerDiscountPercentage;
        this.offerStartDate = offerStartDate;
        this.offerEndDate = offerEndDate;
    }
}
