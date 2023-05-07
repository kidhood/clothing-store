package com.vthong.clothingstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.vthong.clothingstore.entity.AbtractProduct;
import com.vthong.clothingstore.entity.Product;
import com.vthong.clothingstore.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ProductControler {

	@Autowired
	private ProductService productService;
	
	@GetMapping("products")
	public List<Product> retrieveProducts (){
		return productService.retrieveAllProduct();
	}
	
	@GetMapping("products/{id}")
	public Product retrieveProductById(@PathVariable Long id){
		return productService.retrieveProductById(id);
	}
}
