package com.vthong.clothingstore.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vthong.clothingstore.model.JwtRequestModel;
import com.vthong.clothingstore.model.JwtResponseModel;
import com.vthong.clothingstore.service.AuthenticationService;
import com.vthong.clothingstore.service.JwtTokenService;
import com.vthong.clothingstore.utility.JwtUtility;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class JwtAuthencationController {
	
	private final AuthenticationService authenticationService;
	
	private AuthenticationManager authenticationManager;
	
	
	
	
	public JwtAuthencationController(AuthenticationService authenticationService,
			AuthenticationManager authenticationManager) {
		this.authenticationService = authenticationService;
		this.authenticationManager = authenticationManager;
		
	}
	
	 @PostMapping("/authenticate")
	    public ResponseEntity<JwtResponseModel> generateToken(
	            @RequestBody JwtRequestModel jwtTokenRequest) {
	        
//	        var authenticationToken = 
//	                new UsernamePasswordAuthenticationToken(
//	                        jwtTokenRequest.username(), 
//	                        jwtTokenRequest.password());
//	        
//	        var authentication = 
//	                authenticationManager.authenticate(authenticationToken);
//	        
//	        var token = jwtTokenService.generateToken(authentication);
	        
//	        return ResponseEntity.ok(new JwtResponseModel(token));
		 
		 	return ResponseEntity.ok(authenticationService.authenticate(jwtTokenRequest));
	    }
	 
	 @GetMapping("/basicauth")
	 public String basicAuthCheck() {
		 return "success";
	 }
}
