package com.shop.product_ms.repository;

import com.shop.product_ms.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {

    Category findByCatName(String catName);

}
