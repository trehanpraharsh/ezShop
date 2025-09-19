package com.shop.payment_ms.service;

import com.shop.payment_ms.dto.PaymentDTO;
import com.shop.payment_ms.exception.NoPaymentFoundException;
import com.shop.payment_ms.exception.OrderCreationFailedException;
import com.shop.payment_ms.model.Payment;

import java.util.List;

public interface PaymentService {

    public Payment createPayment(PaymentDTO paymentDTO, int userID, int cartID, double totalAmount) throws OrderCreationFailedException;

    public List<Payment> getAllPayments();

    public Payment getPaymentByOrderId(int orderID) throws NoPaymentFoundException;

    public Payment updatePaymentMethod(int orderID, String paymentMethod) throws NoPaymentFoundException;
}
