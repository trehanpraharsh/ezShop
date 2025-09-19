package com.shop.payment_ms.exception;

public class OrderCreationFailedException extends Exception {
    public OrderCreationFailedException(String message) {
        super(message);
    }
}
