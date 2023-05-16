package com.vthong.clothingstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vthong.clothingstore.entity.Customers;
import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.model.JwtRequestModel;
import com.vthong.clothingstore.repository.CustomerRepository;
import com.vthong.clothingstore.repository.UserRepository;

@Service
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
}
