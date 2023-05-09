package com.vthong.clothingstore.securityconfig;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	
	private static final String[] WHITE_LIST_URLS = {
			"/hello",
			"/register",
			"/h2-console"
			
	};
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
  
	 @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		  return http.cors()
	                .and()
	                .csrf()
	                .disable()
	                .authorizeHttpRequests(auth -> auth
                		.requestMatchers(HttpMethod.POST,"/**").permitAll()
	                	.requestMatchers(WHITE_LIST_URLS).permitAll()
	                	.requestMatchers(PathRequest.toH2Console()).permitAll() // h2-console is a servlet and NOT recommended for a production
	                    .requestMatchers(HttpMethod.OPTIONS,"/**")
	                    .permitAll()
	                    .anyRequest()
	                    .authenticated())
	                
	                .sessionManagement(session -> session.
	                	sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	                .httpBasic(
	                        Customizer.withDefaults())
	                .headers(header -> {
	                    header.frameOptions().sameOrigin();
	                })
	                .build();
    }
}
