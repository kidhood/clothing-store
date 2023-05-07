package com.vthong.clothingstore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vthong.clothingstore.entity.Product;
import com.vthong.clothingstore.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	
	public List<Product> retrieveAllProduct(){
		return productRepository.retrieveALlProducts();
	}
	
	public Product retrieveProductById(Long productId){
		return productRepository.retrieveALlProducts(productId);
	}
	
}
