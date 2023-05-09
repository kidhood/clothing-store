package com.vthong.clothingstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.entity.VerificationToken;
import com.vthong.clothingstore.event.RegistrationCompleteEvent;
import com.vthong.clothingstore.model.UserModel;
import com.vthong.clothingstore.repository.UserRepository;
import com.vthong.clothingstore.service.UserSevice;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserSevice userSevice;
	
	@Autowired
	private ApplicationEventPublisher publicsher;
	
	@GetMapping("users")
	public List<User> retriveUsers(){
		return userRepository.findAll();
	}
	
	@PostMapping("/register")
	public String registerUser(@RequestBody  UserModel userModel,
			final HttpServletRequest request) {
		User user = userSevice.registerUser(userModel);
		publicsher.publishEvent(new RegistrationCompleteEvent(
				user,
				userSevice.applicationUrl(request)));
		return "Success";
	}
	
	@GetMapping("/verifyRegistration")
	public String verifyRegistration(@RequestParam("token") String token) {
		String result = userSevice.validateVerificationToken(token);
		if(result.equalsIgnoreCase("valid"))
			return "User Verifies Successfully";
		return "Bad User " + result;
	}
	
	@GetMapping("/resendVerifyToken")
	public String resendVerificationToken(@RequestParam("token") String oldToken,
			HttpServletRequest request) {
		
		
		 VerificationToken verificationToken =
				 userSevice.resendVerificationToken( oldToken);
		 
		 User user  = verificationToken.getUser();
		 
		 userSevice.resendVerificationTokenMail(user,
				 userSevice.applicationUrl(request),
				 verificationToken);
		 
		 return "Verification Link sent";
	}
	
	
}
