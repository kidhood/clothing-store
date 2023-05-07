package com.vthong.clothingstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vthong.clothingstore.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
