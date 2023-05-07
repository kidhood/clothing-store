
package com.vthong.clothingstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vthong.clothingstore.entity.AbtractProduct;
import com.vthong.clothingstore.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long >{
	@Query(nativeQuery = true, value = "Select * from PRODUCTS ")
	List<Product> retrieveALlProducts();
	
	@Query(nativeQuery = true, value = "Select * from PRODUCTS where  PRODUCTID = ?")
	Product retrieveALlProducts(Long productId);
}
