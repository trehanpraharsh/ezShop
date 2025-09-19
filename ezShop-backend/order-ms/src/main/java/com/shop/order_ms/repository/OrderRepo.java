package com.shop.order_ms.repository;

import com.shop.order_ms.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Orders, Integer> {

    public Orders findByUserID(int userID);

    public List<Orders> findAllByUserID(int userID);

}
