package com.vthong.clothingstore.service;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vthong.clothingstore.entity.Customers;
import com.vthong.clothingstore.entity.PasswordResetToken;
import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.entity.VerificationToken;
import com.vthong.clothingstore.enums.UserRole;
import com.vthong.clothingstore.model.UserModel;
import com.vthong.clothingstore.repository.PasswordResetTokenRepository;
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
	private PasswordResetTokenRepository passwordResetTokenRepository;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private VeriFicationTokenRepository verificationTokenRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User registerUser(UserModel userModel) {
		if(userModel.getPassword().equals(userModel.getMatchingPassword())) {
			User user = new User();
			Customers cus = new Customers();
			user.setUserName(userModel.getUserName());
			user.setPassword(passwordEncoder.encode(userModel.getPassword()) );
			user.setRole(UserRole.US);
			user.setEnable(false);
			cus.setFirstName(userModel.getFirstName());
			cus.setLastName(userModel.getLastName());
			cus.setEmail(userModel.getEmail());
			user.setCustomers(cus);
			customerService.saveCustomer(cus);
			
			userRepository.save(user);
			return user;
		}
		
		return null;
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
					"verifyregistration?token="+
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

	public User findUserByUserName(String userName) {
		User user = userRepository.findByUserName(userName);
		return user;
	}

	public void createPasswordResetTokenForUser(User user, String token) {
		PasswordResetToken passwordResetToken =
					new PasswordResetToken(user, token);
		
		passwordResetTokenRepository.save(passwordResetToken);
		
	}

	public String passwordResetTokenEmail(User user, String applicationUrl,
				String token) {
		
		String url = applicationUrl +
				"/"+
				"savepassword?token="+
				token;
		log.info("Click the link to Reset you password: {}", url);
		return url;
	}

	public String validatePasswordResetToken(String token) {
		
		PasswordResetToken passwordResetToken = 
				passwordResetTokenRepository.findByToken(token);
		
		if(passwordResetToken == null)
			return "invalid";
		
		User user = passwordResetToken.getUser();
		Calendar calen = Calendar.getInstance();
		
		if((passwordResetToken.getExpirationTime().getTime() - 
				calen.getTime().getTime()) <= 0) {
			passwordResetTokenRepository.delete(passwordResetToken);
			return "expired";
		}
		
			
		return "valid";
	}

	public Optional<User> getUserByPasswordResetToken(String token) {
		return Optional.ofNullable(passwordResetTokenRepository.findByToken(token).getUser());
	}

	public void changePassword(User user, String newPassword) {
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);
		
	}

	public boolean checkIfValidOldPasswrod(String oldPassword, User user) {
		
		return passwordEncoder.matches(oldPassword, user.getPassword());
	}
	

}
