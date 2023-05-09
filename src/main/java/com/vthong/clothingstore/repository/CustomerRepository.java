package com.vthong.clothingstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vthong.clothingstore.entity.Customers;

@Repository
public interface CustomerRepository extends JpaRepository<Customers, Long>{

}
