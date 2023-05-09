package com.vthong.clothingstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vthong.clothingstore.entity.VerificationToken;

@Repository
public interface VeriFicationTokenRepository extends
		JpaRepository<VerificationToken, Long>{

	VerificationToken findByToken(String token);

}
