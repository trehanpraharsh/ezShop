package com.shop.order_ms.service;

import com.shop.order_ms.dto.CartDTO;
import com.shop.order_ms.dto.OrdersDTO;
import com.shop.order_ms.dto.ProductResponseDTO;
import com.shop.order_ms.exception.CartCreationFailedException;
import com.shop.order_ms.exception.OrderNotFoundException;
import com.shop.order_ms.model.Orders;
import com.shop.order_ms.repository.OrderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final WebClient.Builder builder;


    @Override
    public Orders createBlankNewOrder(OrdersDTO ordersDTO) throws CartCreationFailedException {

        Orders orders = new Orders();
        orders.setUserID(ordersDTO.getUserID());
        orders.setCartID(ordersDTO.getCartID());
        orders.setOrderPrice(ordersDTO.getOrderPrice());
        orders.setOrderStatus(ordersDTO.getOrderStatus());

        orderRepo.save(orders);

        String creationOfBlankCartURL = "http://CART-MS/cart/blank";
        CartDTO cart = new CartDTO(ordersDTO.getUserID(), 1);
        try{
            builder.build()
                    .post()
                    .uri(creationOfBlankCartURL)
                    .bodyValue(cart)
                    .retrieve()
                    .bodyToMono(CartDTO.class)
                    .block();

        } catch (Exception e){
            throw new CartCreationFailedException("New Blank Cart Creation Failed", e);
        }

        return orders;
    }

    //* Could be called manually or by some function to update the status of the order
    @Override
    public Orders updateOrder(OrdersDTO ordersDTO, int orderID) throws OrderNotFoundException {
        Orders orders = orderRepo.findById(orderID).orElseThrow(() ->
                new OrderNotFoundException("No Orders found with ID : " + orderID));
        orders.setOrderStatus(ordersDTO.getOrderStatus());
        return orderRepo.save(orders);
    }

    @Override
    public Orders getOrderById(int orderID) throws OrderNotFoundException {
        return orderRepo.findById(orderID).orElseThrow(() ->
                new OrderNotFoundException("No Orders found with ID : " + orderID));
    }

    @Override
    public List<Orders> getAllOrdersByUserID(int userID) throws OrderNotFoundException {
        List<Orders> orders = orderRepo.findAllByUserID(userID);
        if(orders == null){
            throw new OrderNotFoundException("No Orders found with User ID : " + userID);
        }
        return orders;
    }

    @Override
    public List<ProductResponseDTO> getProductsByCartID(int cartID) throws OrderNotFoundException {

        String ProductListURL = "http://CART-MS/cart/products/order/{cartID}";

        List<ProductResponseDTO> productResponseList;

        try{
            productResponseList = builder.build()
                    .post()
                    .uri(ProductListURL, cartID)
                    .retrieve()
                    .bodyToFlux(ProductResponseDTO.class)
                    .collectList()
                    .block();
        }
        catch (Exception e){
            throw new OrderNotFoundException("Failed to get products of the order", e);
        }
        return productResponseList;
    }

    @Override
    public Orders.ordStatus getOrderStatus(int orderID) throws OrderNotFoundException {
        Orders orders = orderRepo.findById(orderID).orElseThrow(() ->
                new OrderNotFoundException("No Orders found with ID : " + orderID));
        return orders.getOrderStatus();
    }

    @Override
    public List<Orders> getAllOrders() {
        return orderRepo.findAll();
    }

//    @Override
//    public Double getTotalAmount(int orderID) throws OrderNotFoundException {
//        Orders orders = orderRepo.findById(orderID).orElseThrow(() ->
//                new OrderNotFoundException("No Orders found with ID : " + orderID));
//        return orders.getOrderPrice();
//    }
}
