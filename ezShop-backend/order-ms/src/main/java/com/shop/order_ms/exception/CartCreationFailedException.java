package com.shop.order_ms.exception;

public class CartCreationFailedException extends Exception {
    public CartCreationFailedException(String message) {
        super(message);
    }

    public CartCreationFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
