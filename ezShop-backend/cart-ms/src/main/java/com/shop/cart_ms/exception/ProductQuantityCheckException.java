package com.shop.cart_ms.exception;

public class ProductQuantityCheckException extends Exception {
    public ProductQuantityCheckException(String message) {
        super(message);
    }

    public ProductQuantityCheckException(String message, Throwable cause) {
        super(message, cause);
    }
}
