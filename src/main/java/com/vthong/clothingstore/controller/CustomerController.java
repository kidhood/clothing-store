package com.vthong.clothingstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vthong.clothingstore.entity.Customers;
import com.vthong.clothingstore.model.CustomerModel;
import com.vthong.clothingstore.model.JwtRequestModel;
import com.vthong.clothingstore.model.UserModel;
import com.vthong.clothingstore.repository.CustomerRepository;
import com.vthong.clothingstore.service.CustomerService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@PostMapping("/users/retrieve-customer")
	public  Customers retrieveCustomerByUserName(@RequestBody JwtRequestModel account) {
		return customerService.retrieveCusByUserName(account.username());
		
	}
	@PostMapping("users/update-profile")
	public ResponseEntity<String> updateProfile(@RequestBody CustomerModel customerModel){
		
		Customers cus = customerService.updateProfileCus(customerModel);
		if(cus == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}
}
