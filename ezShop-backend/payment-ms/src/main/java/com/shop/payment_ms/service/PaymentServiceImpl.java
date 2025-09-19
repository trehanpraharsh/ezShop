package com.shop.payment_ms.service;

import com.shop.payment_ms.dto.OrdersDTO;
import com.shop.payment_ms.dto.PaymentDTO;
import com.shop.payment_ms.exception.NoPaymentFoundException;
import com.shop.payment_ms.exception.OrderCreationFailedException;
import com.shop.payment_ms.model.Payment;
import com.shop.payment_ms.repository.PaymentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;
    private final WebClient.Builder builder;

    @Override
    public Payment createPayment(PaymentDTO paymentDTO, int userID, int cartID, double totalAmount) throws OrderCreationFailedException {
        boolean payStatus = true;
        OrdersDTO ordersDTO = null;
        //Later on I can toggle the value of payStatus based on the payment gateway response
        if(payStatus){
            String orderCreationURL = "http://ORDER-MS/order/";
            try{
                ordersDTO = builder.build()
                        .post()
                        .uri(orderCreationURL)
                        .bodyValue(new OrdersDTO(userID, cartID, totalAmount, "PENDING"))
                        .retrieve()
                        .bodyToMono(OrdersDTO.class)
                        .block();
            } catch (Exception e){
                throw  new OrderCreationFailedException("Order Creation Failed");
            }

        }
        Payment payment = new Payment();
        assert ordersDTO != null;
        payment.setOrderID(ordersDTO.getOrderID());
        payment.setPaymentMethod(paymentDTO.getPaymentMethod());
        payment.setPaymentAmount(totalAmount);
        payment.setPaymentDateAndTime(paymentDTO.getPaymentDateAndTime());
        payment.setPaymentStatus(Payment.payStatus.SUCCESSFUL);
        return paymentRepo.save(payment);

    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    @Override
    public Payment getPaymentByOrderId(int orderID) throws NoPaymentFoundException {
        Payment payment = paymentRepo.getPaymentByOrderID(orderID);
        if(payment != null){
            return payment;
        }
        throw new NoPaymentFoundException("No Payment Found with Order ID : " + orderID);
    }

    @Override
    public Payment updatePaymentMethod(int orderID, String paymentMethod) throws NoPaymentFoundException {
        Payment payment = paymentRepo.getPaymentByOrderID(orderID);
        if(payment != null){
            payment.setPaymentMethod(paymentMethod);
            return paymentRepo.save(payment);
        }
        throw new NoPaymentFoundException("No Payment Found with Order ID : " + orderID);
    }
}
