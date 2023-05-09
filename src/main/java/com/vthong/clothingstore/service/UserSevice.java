package com.vthong.clothingstore.service;

import java.util.Calendar;
import java.util.UUID;

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

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserSevice {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private VeriFicationTokenRepository verificationTokenRepository;
	
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
		verificationTokenRepository.save(verificationToken );
		
		
	}

	public String validateVerificationToken(String token) {
		VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
		if(verificationToken == null)
			return "invalid";
		User user = verificationToken.getUser();
		Calendar calen = Calendar.getInstance();
		
		if((verificationToken.getExpirationTime().getTime() - 
				calen.getTime().getTime()) <= 0) {
			verificationTokenRepository.delete(verificationToken);
			return "expired";
		}
		
		user.setEnable(true);
		userRepository.save(user);
			
		return "valid";
	}

	public VerificationToken resendVerificationToken(String oldToken) {
		VerificationToken verificationToken = 
				verificationTokenRepository.findByToken(oldToken);
		verificationToken.setToken(UUID.randomUUID().toString());
		verificationTokenRepository.save(verificationToken);
		return verificationToken;
	}

	public void resendVerificationTokenMail(User user, String applicationUrl,
			VerificationToken verificationToken) {
		
		String url = applicationUrl +
					"/"+
					"verifyRegistration?token="+
					verificationToken.getToken();
		log.info("Click the link to verify account: {}", url);
	}

	public String applicationUrl(HttpServletRequest request) {
		return "http://" + 
				request.getServerName() + 
				":" +
				request.getServerPort() + 
				request.getContextPath();
	}
	
//	@Override
//	public User registerUser() {
//	
//	}
}
