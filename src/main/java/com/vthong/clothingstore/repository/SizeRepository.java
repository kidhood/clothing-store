package com.vthong.clothingstore.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vthong.clothingstore.entity.Size;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long>{

}
