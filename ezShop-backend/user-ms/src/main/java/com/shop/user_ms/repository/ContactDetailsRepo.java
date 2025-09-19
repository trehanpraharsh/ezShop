package com.shop.user_ms.repository;

import com.shop.user_ms.model.ContactDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactDetailsRepo extends JpaRepository<ContactDetails, Integer> {
}
