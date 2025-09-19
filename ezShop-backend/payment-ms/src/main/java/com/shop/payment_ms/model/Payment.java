package com.shop.payment_ms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Component
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue
    private int paymentID;
    private int orderID;
    private String paymentMethod;
    private double paymentAmount;
    private LocalDateTime paymentDateAndTime;

    @Enumerated(EnumType.STRING)
    private payStatus paymentStatus = payStatus.SUCCESSFUL;

    public enum payStatus{
        SUCCESSFUL,
        FAILED
    }

    public Payment(int orderID, String paymentMethod, double paymentAmount, LocalDateTime paymentDateAndTime) {
        this.orderID = orderID;
        this.paymentMethod = paymentMethod;
        this.paymentAmount = paymentAmount;
        this.paymentDateAndTime = paymentDateAndTime;
    }

}
