package com.vthong.clothingstore.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.vthong.clothingstore.entity.User;

//import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.enums.UserRole;
import com.vthong.clothingstore.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;

	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUserName(username);
		if(user == null) {
			throw new UsernameNotFoundException("No User Found");
		}
//		return new org.springframework.security.core.userdetails.User(
//				user.getUserName(),
//				user.getPassword(),
//				user.getEnable(),
//				true,
//				true,
//				true,
//				getAuthorities(List.of(user.getRole()))
//				);
			return user;
	}



	private Collection<? extends GrantedAuthority> getAuthorities(List<UserRole> roles) {
		List<GrantedAuthority> authorities = new ArrayList<>();

		roles.forEach(
				role -> 
				authorities.add(
						new SimpleGrantedAuthority(role.toString()
													)				
								)
					);
		
		
		
		return authorities;
	}
	
	

}
