package com.shop.order_ms.controller;

import com.shop.order_ms.dto.OrdersDTO;
import com.shop.order_ms.dto.ProductResponseDTO;
import com.shop.order_ms.exception.CartCreationFailedException;
import com.shop.order_ms.exception.OrderNotFoundException;
import com.shop.order_ms.model.Orders;
import com.shop.order_ms.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;

    //* deduction of quantity is taken care of while adding to cart
    @PostMapping("/")
    public ResponseEntity<Orders> createBlankNewOrder(@RequestBody @Valid OrdersDTO ordersDTO)
            throws CartCreationFailedException {
        return new ResponseEntity<>(orderService.createBlankNewOrder(ordersDTO), HttpStatus.CREATED);
    }

    //* Used by some function or SELLER to update the status of his order
    @PutMapping("/{orderID}")
    public ResponseEntity<Orders> updateOrder(@RequestBody @Valid OrdersDTO ordersDTO, @PathVariable int orderID)
            throws OrderNotFoundException {
        return new ResponseEntity<>(orderService.updateOrder(ordersDTO, orderID), HttpStatus.OK);
    }

    @GetMapping("/{orderID}")
    public ResponseEntity<Orders> getOrderById(@PathVariable int orderID) throws OrderNotFoundException {
        return new ResponseEntity<>(orderService.getOrderById(orderID), HttpStatus.FOUND);
    }

    //* Used by USER to view all his orders
    @GetMapping("/user/{userID}")
    public ResponseEntity<List<Orders>> getAllOrdersByUserID(@PathVariable int userID) throws OrderNotFoundException {
        return new ResponseEntity<>(orderService.getAllOrdersByUserID(userID), HttpStatus.FOUND);
    }

    //* Will be used when USER wants to fetch all the products in his specific order
    @GetMapping("/products/{cartID}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByCartID(@PathVariable int cartID)
            throws OrderNotFoundException {
        return new ResponseEntity<>(orderService.getProductsByCartID(cartID), HttpStatus.OK);
    }

    //* Used by USER to track his order status
    @GetMapping("/status/{orderID}")
    public ResponseEntity<Orders.ordStatus> getOrderStatus(@PathVariable int orderID) throws OrderNotFoundException {
        return new ResponseEntity<>(orderService.getOrderStatus(orderID), HttpStatus.OK);
    }

    //* Might be used by the admin to view all the orders placed on his platform
    @GetMapping("/")
    public ResponseEntity<List<Orders>> getAllOrders() {
        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }

}
