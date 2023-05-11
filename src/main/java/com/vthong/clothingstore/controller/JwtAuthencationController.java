package com.vthong.clothingstore.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vthong.clothingstore.model.JwtRequestModel;
import com.vthong.clothingstore.model.JwtResponseModel;
import com.vthong.clothingstore.service.JwtTokenService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class JwtAuthencationController {
	
	private final JwtTokenService jwtTokenService;
	
	private AuthenticationManager authenticationManager;
	
	public JwtAuthencationController(JwtTokenService jwtTokenService,
			AuthenticationManager authenticationManager) {
		this.jwtTokenService = jwtTokenService;
		this.authenticationManager = authenticationManager;
		
	}
	
	 @PostMapping("/authenticate")
	    public ResponseEntity<JwtResponseModel> generateToken(
	            @RequestBody JwtRequestModel jwtTokenRequest) {
	        
	        var authenticationToken = 
	                new UsernamePasswordAuthenticationToken(
	                        jwtTokenRequest.username(), 
	                        jwtTokenRequest.password());
	        
	        var authentication = 
	                authenticationManager.authenticate(authenticationToken);
	        
	        System.out.println("We are here");
	        log.info("token encode {}", authentication.getCredentials() );
	        var token = jwtTokenService.generateToken(authentication);
	        
	        log.info("token {}", token );
	        
	        return ResponseEntity.ok(new JwtResponseModel(token));
	    }
}
