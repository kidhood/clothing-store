package com.vthong.clothingstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vthong.clothingstore.entity.Customers;
import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.entity.VerificationToken;
import com.vthong.clothingstore.enums.UserRole;
import com.vthong.clothingstore.model.UserModel;
import com.vthong.clothingstore.repository.UserRepository;
import com.vthong.clothingstore.repository.VeriFicationTokenRepository;

@Service
public class UserSevice {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private VeriFicationTokenRepository veriFicationTokenRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User registerUser(UserModel userModel) {
		User user = new User();
		Customers cus = new Customers();
		user.setUserName(userModel.getUserName());
		user.setPassword(passwordEncoder.encode(userModel.getPassword()) );
		user.setRole(UserRole.US);
		cus.setFirstName(userModel.getFirstName());
		cus.setLastName(userModel.getLastName());
		cus.setEmail(userModel.getEmail());
		user.setCustomers(cus);
		customerService.saveCustomer(cus);
		
		userRepository.save(user);

		
		
		return user;
	}

	public void saveVerificationTokenForUser(String token, User user) {
		VerificationToken verificationToken = 
					new VerificationToken(user, token);
		veriFicationTokenRepository.save(verificationToken );
		
	}
	
//	@Override
//	public User registerUser() {
//	
//	}
}
