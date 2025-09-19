package com.shop.payment_ms.dto;

import com.shop.payment_ms.model.Payment;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
public class PaymentDTO {

    @NotNull(message = "Order ID cannot be null")
    @Positive(message = "Order ID must be a positive number")
    private int orderID;

    @NotNull(message = "Payment method cannot be null")
    private String paymentMethod;

    @NotNull(message = "Payment amount cannot be null")
    @Positive(message = "Payment amount must be a positive number")
    private double paymentAmount;

    @NotNull(message = "Payment date and time cannot be null")
    private LocalDateTime paymentDateAndTime;

    @NotNull(message = "Payment status cannot be null")
    private Payment.payStatus paymentStatus;

    public PaymentDTO(int orderID, String paymentMethod, double paymentAmount, LocalDateTime paymentDateAndTime, Payment.payStatus paymentStatus) {
        this.orderID = orderID;
        this.paymentMethod = paymentMethod;
        this.paymentAmount = paymentAmount;
        this.paymentDateAndTime = paymentDateAndTime;
        this.paymentStatus = paymentStatus;
    }

    public PaymentDTO(String paymentMethod, double paymentAmount, LocalDateTime paymentDateAndTime, Payment.payStatus paymentStatus) {
        this.paymentMethod = paymentMethod;
        this.paymentAmount = paymentAmount;
        this.paymentDateAndTime = paymentDateAndTime;
        this.paymentStatus = paymentStatus;
    }

    public PaymentDTO(String paymentMethod, LocalDateTime paymentDateAndTime, Payment.payStatus paymentStatus) {
        this.paymentMethod = paymentMethod;
        this.paymentDateAndTime = paymentDateAndTime;
        this.paymentStatus = paymentStatus;
    }

}
