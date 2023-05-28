package com.vthong.clothingstore.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.EntityResponse;

import com.vthong.clothingstore.entity.Customers;
import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.entity.VerificationToken;
import com.vthong.clothingstore.event.RegistrationCompleteEvent;
import com.vthong.clothingstore.model.JwtResponseModel;
import com.vthong.clothingstore.model.PasswordModel;
import com.vthong.clothingstore.model.UserModel;
import com.vthong.clothingstore.repository.UserRepository;
import com.vthong.clothingstore.service.JwtTokenService;
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
	
	@Autowired
	private JwtTokenService jwtTokenService;
	
	@GetMapping("users")
	public List<User> retriveUsers(){
		return userRepository.findAll();
	}
	
	@PostMapping("/users/username")
	public String retriveUserName(@RequestBody JwtResponseModel responseModel){
		return jwtTokenService.extractUsername(responseModel.token());
	}
	
	public Customers retrieveCustomerByUserName(String username) {
		User user = userSevice.findUserByUserName(username);
		return user.getCustomers();
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody  UserModel userModel,
			final HttpServletRequest request) {
		if(userSevice.findUserByUserName(userModel.getUserName()) != null) {
			return new ResponseEntity<String>("This username already have please change",HttpStatus.BAD_REQUEST);
		}
		User user = userSevice.registerUser(userModel);
		if(user == null) {
			return new ResponseEntity<String>("Repassword not matching",HttpStatus.BAD_REQUEST);
		}
		publicsher.publishEvent(new RegistrationCompleteEvent(
				user,
				userSevice.applicationUrl(request)));
		return new ResponseEntity<String>("Success please check email to verify your account",HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/verifyregistration")
	public String verifyRegistration(@RequestParam("token") String token) {
		String result = userSevice.validateVerificationToken(token);
		if(result.equalsIgnoreCase("valid"))
			return "User Verifies Successfully";
		return "Bad User " + result;
	}
	
	@GetMapping("/resendverifyToken")
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
	
	@PostMapping("/users/resetpassword")
	public String resetPassword(@RequestBody PasswordModel passwordModel,
			HttpServletRequest request) {
		
		User user = userSevice.findUserByUserName(passwordModel.getUserName());
		String url = "";
		if(user != null) {
			String token = UUID.randomUUID().toString();
			userSevice.createPasswordResetTokenForUser(user, token);
			url = userSevice.passwordResetTokenEmail(user,
					userSevice.applicationUrl(request), token);
		}
		return url;
	}
	
	@PostMapping("/users/savepassword")
	public String savePassword(@RequestParam("token")String token, 
					@RequestBody PasswordModel passwordModel) {
		
		 String result = userSevice.validatePasswordResetToken(token);
		 if(!result.equalsIgnoreCase("valid")) {
			 return "Invalid Token";
		 }

		 Optional<User> user = userSevice.getUserByPasswordResetToken(token);
		 if(user.isPresent()) {
			 userSevice.changePassword(user.get(), passwordModel.getNewPassword());
			 return "Password Reset Successfully";
		 }else {
			 return  "Invalid Token";
		 }
	}
	
	@PostMapping("/users/changepassword")
	public ResponseEntity<String> changePassword(@RequestBody PasswordModel passwordModel) {
		User user = userSevice.findUserByUserName(passwordModel.getUserName());
		if(!userSevice.checkIfValidOldPasswrod(passwordModel.getOldPassword(),user)) {
			return new ResponseEntity<>("Invalid Old password!", HttpStatus.BAD_REQUEST);
		}
		if(!passwordModel.getConfirmPassword().equals(passwordModel.getNewPassword()))
			return new ResponseEntity<>("Confirm password not match!", HttpStatus.BAD_REQUEST);
		//save new password
		userSevice.changePassword(user, passwordModel.getNewPassword());
		return ResponseEntity.ok("Password Change Succesfully!");
	}

}
