package com.shop.product_ms.repository;

import com.shop.product_ms.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    public List<Product> findAllBySellerID(int sellerID);

}
