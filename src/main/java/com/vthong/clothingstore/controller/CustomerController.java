package com.vthong.clothingstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vthong.clothingstore.entity.Customers;
import com.vthong.clothingstore.model.JwtRequestModel;
import com.vthong.clothingstore.model.UserModel;
import com.vthong.clothingstore.repository.CustomerRepository;
import com.vthong.clothingstore.service.CustomerService;

@RestController
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/users/retrieve-customer")
	public  Customers retrieveCustomerByUserName(@RequestBody String userName) {
		return customerService.retrieveCusByUserName(userName);
	}
	
}
