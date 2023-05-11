package com.vthong.clothingstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.vthong.clothingstore.model.JwtRequestModel;
import com.vthong.clothingstore.model.JwtResponseModel;
import com.vthong.clothingstore.repository.UserRepository;

@Service
public class AuthenticationService {
	
	@Autowired
	private  AuthenticationManager authenticationManager;
	
	@Autowired
	private  UserRepository userRepository;
	
	@Autowired
	private  JwtTokenService jwtService;
	
	public JwtResponseModel authenticate(JwtRequestModel request) {
		    authenticationManager.authenticate(
		        new UsernamePasswordAuthenticationToken(
		            request.username(),
		            request.password()
		        )
		    );
		    UserDetails user = userRepository.findByUserName(request.username());
		    var jwtToken = jwtService.generateToken(user);
//		    var refreshToken = jwtService.generateRefreshToken(user);
//		    revokeAllUserTokens(user);
//		    saveUserToken(user, jwtToken);
		    return new JwtResponseModel(jwtToken);
		  }
}
