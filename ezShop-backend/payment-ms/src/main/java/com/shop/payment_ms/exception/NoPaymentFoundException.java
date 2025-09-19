package com.shop.payment_ms.exception;

public class NoPaymentFoundException extends Exception {
    public NoPaymentFoundException(String message) {
        super(message);
    }
}
