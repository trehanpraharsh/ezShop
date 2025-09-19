package com.shop.payment_ms.controller;

import com.shop.payment_ms.dto.PaymentDTO;
import com.shop.payment_ms.exception.NoPaymentFoundException;
import com.shop.payment_ms.exception.OrderCreationFailedException;
import com.shop.payment_ms.model.Payment;
import com.shop.payment_ms.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService paymentService;

    //* Used by the user to make payment for his order
    //* setting cart status as inactive and creating a new active cart is taken care of by the createOrder method
    @PostMapping("/{userID}/{cartID}/{totalAmount}")
    public ResponseEntity<Payment> createNewPayment(@RequestBody @Valid PaymentDTO paymentDTO,
                                                    @PathVariable @Valid int userID,
                                                    @PathVariable @Valid int cartID,
                                                    @PathVariable @Valid double totalAmount)
            throws OrderCreationFailedException {
        return new ResponseEntity<>(paymentService.createPayment(paymentDTO, userID, cartID, totalAmount),
                HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return new ResponseEntity<>(paymentService.getAllPayments(), HttpStatus.OK);
    }

    @GetMapping("/{orderID}")
    public ResponseEntity<Payment> getPaymentByOrderId(@PathVariable int orderID) throws NoPaymentFoundException {
        return new ResponseEntity<>(paymentService.getPaymentByOrderId(orderID), HttpStatus.FOUND);
    }

    @PutMapping("/{orderID}/{paymentMethod}")
    public ResponseEntity<Payment> updatePaymentMethod(@PathVariable int orderID, @PathVariable String paymentMethod)
            throws NoPaymentFoundException {
        return new ResponseEntity<>(paymentService.updatePaymentMethod(orderID, paymentMethod), HttpStatus.OK);
    }

}
