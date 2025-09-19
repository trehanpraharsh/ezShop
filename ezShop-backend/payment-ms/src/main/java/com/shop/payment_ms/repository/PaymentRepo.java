package com.shop.payment_ms.repository;

import com.shop.payment_ms.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Integer> {

    public Payment getPaymentByOrderID(int orderID);

}
