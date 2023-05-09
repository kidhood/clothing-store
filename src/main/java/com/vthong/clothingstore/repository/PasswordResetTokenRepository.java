package com.vthong.clothingstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vthong.clothingstore.entity.PasswordResetToken;

public interface PasswordResetTokenRepository extends
	JpaRepository<PasswordResetToken, Long>{

	PasswordResetToken findByToken(String token);

}
