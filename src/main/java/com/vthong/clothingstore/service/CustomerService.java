package com.vthong.clothingstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vthong.clothingstore.entity.Address;
import com.vthong.clothingstore.entity.Customers;
import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.model.CustomerModel;
import com.vthong.clothingstore.model.JwtRequestModel;
import com.vthong.clothingstore.repository.CustomerRepository;
import com.vthong.clothingstore.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository ;
	
	@Autowired
	private UserRepository userRepository;
	
	public void saveCustomer(Customers cus) {
		customerRepository.save(cus);
	}

	public Customers retrieveCusByUserName(String userName) {
		User user = userRepository.findByUserName(userName);
		return user.getCustomers();
	}
	
	public Customers updateProfileCus (CustomerModel cusmodel) {
		Customers cus = customerRepository.findById(cusmodel.customersID()).orElse(null);
		cus.setFirstName(cusmodel.firstName());
		cus.setLastName(cusmodel.lastName());
		cus.setEmail(cusmodel.email());
		cus.setPhoneNumber(cusmodel.phoneNumber());
		
		Address add = new Address(cusmodel.address().line(), cusmodel.address().city(), cusmodel.address().country());
		
		cus.setAddress(add);
		
		return customerRepository.save(cus);
	}
}
