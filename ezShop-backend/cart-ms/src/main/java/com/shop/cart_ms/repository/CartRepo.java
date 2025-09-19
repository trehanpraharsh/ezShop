package com.shop.cart_ms.repository;

import com.shop.cart_ms.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {

    public Cart findByUserID(int userID);

    //do i need to provide the query or jpa takes care of this as well?
    @Query("SELECT c FROM Cart c WHERE c.userID = :userID AND c.isActive = true")
    Cart findActiveCartByUserID(@Param("userID") int userID);

}
