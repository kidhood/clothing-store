package com.vthong.clothingstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomAuthenticationProvider implements AuthenticationProvider{

	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
//	@Autowired
//	private PasswordEncoder passwordEncoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		UserDetails user = customUserDetailsService.loadUserByUsername(username);
		
		return checkPassword(user, password);
	}

	private Authentication checkPassword(UserDetails user, String rawPassword) {
//		String encodePassword = passwordEncoder.encode(rawPassword);
		if(user.getPassword().equals(rawPassword)) {
			return new UsernamePasswordAuthenticationToken(user.getUsername(),
					user.getPassword(), user.getAuthorities());
		}
		throw new BadCredentialsException("Bad credentials");
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
