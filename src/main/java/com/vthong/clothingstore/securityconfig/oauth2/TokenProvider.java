package com.vthong.clothingstore.securityconfig.oauth2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.vthong.clothingstore.service.JwtTokenService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TokenProvider {
	
	@Autowired
	private JwtTokenService jwtTokenService;

    public String createToken(Authentication authentication) {
    	
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return jwtTokenService.generateToken(userPrincipal);
    }

    

}