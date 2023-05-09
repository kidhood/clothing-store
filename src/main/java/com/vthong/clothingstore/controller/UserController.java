package com.vthong.clothingstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vthong.clothingstore.entity.User;
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
				applicationUrl(request)));
		return "Success";
	}

	private String applicationUrl(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return "http://" + 
				request.getServerName() + 
				":" +
				request.getServerPort() + 
				request.getContextPath();
	}
}
