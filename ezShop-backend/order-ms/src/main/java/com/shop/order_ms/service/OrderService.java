package com.shop.order_ms.service;

import com.shop.order_ms.dto.OrdersDTO;
import com.shop.order_ms.dto.ProductResponseDTO;
import com.shop.order_ms.exception.CartCreationFailedException;
import com.shop.order_ms.exception.OrderNotFoundException;
import com.shop.order_ms.model.Orders;

import java.util.List;

public interface OrderService {

    public Orders createBlankNewOrder(OrdersDTO ordersDTO) throws CartCreationFailedException;

    public Orders updateOrder(OrdersDTO ordersDTO, int orderID) throws OrderNotFoundException;

    public Orders getOrderById(int orderID) throws OrderNotFoundException;

    public List<Orders> getAllOrdersByUserID(int userID) throws OrderNotFoundException;

    public List<ProductResponseDTO> getProductsByCartID(int cartID) throws OrderNotFoundException;

    public Orders.ordStatus getOrderStatus(int orderID) throws OrderNotFoundException;

    public List<Orders> getAllOrders();

//    public Double getTotalAmount(int orderID) throws OrderNotFoundException;

}
