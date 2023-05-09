package com.vthong.clothingstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vthong.clothingstore.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
