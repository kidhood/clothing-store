package com.vthong.clothingstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vthong.clothingstore.entity.Customers;
import com.vthong.clothingstore.repository.CustomerRepository;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository ;
	
	public void saveCustomer(Customers cus) {
		customerRepository.save(cus);
	}
}
