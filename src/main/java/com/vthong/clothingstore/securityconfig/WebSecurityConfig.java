package com.vthong.clothingstore.securityconfig;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.datasource.init.UncategorizedScriptException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.vthong.clothingstore.enums.UserRole;
import com.vthong.clothingstore.securityconfig.oauth2.CustomOAuth2UserService;
import com.vthong.clothingstore.securityconfig.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.vthong.clothingstore.securityconfig.oauth2.OAuth2AuthenticationFailureHandler;
import com.vthong.clothingstore.securityconfig.oauth2.OAuth2AuthenticationSuccessHandler;
import com.vthong.clothingstore.securityconfig.oauth2.user.RestAuthenticationEntryPoint;
import com.vthong.clothingstore.service.CustomAuthenticationProvider;
import com.vthong.clothingstore.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig{
	
	private static final String[] WHITE_LIST_URLS = {
			"/hello",
			"/register",
//			"/h2-console",
			"/verifyregistration*",
			"/resendverifyToken*",
			"/authenticate",
			"/products",
			"/products/*",
			"/sizes",
			"/oauth2/**",
			"/auth/**",
			"/",
            "/error",
            "/favicon.ico",
//            "/**/*.png",
//            "/**/*.gif",
//            "/**/*.svg",
//            "/**/*.jpg",
//            "/**/*.html",
//            "/**/*.css",
//            "/**/*.js"
	};
//	
//	@Autowired
//	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private CustomAuthenticationProvider customAuthenticationProvider;
	
	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;
	
	@Autowired
	private  OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	
	@Autowired
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

	
	@Autowired
	private JwtAuthenticationFilter jwtAuthFilter;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		  return http
	                .csrf( csrf -> csrf.disable())
//	                .cors(c -> c.disable())
	                .exceptionHandling( exception -> exception
	                								.authenticationEntryPoint(new RestAuthenticationEntryPoint()))
	                .authorizeHttpRequests(auth -> auth
                		.requestMatchers(HttpMethod.POST,"/**").permitAll()
	                	.requestMatchers(WHITE_LIST_URLS).permitAll()
	                	.requestMatchers(HttpMethod.POST,"/users/*").hasAnyAuthority(UserRole.US.name())
	                	.requestMatchers(PathRequest.toH2Console()).permitAll() // h2-console is a servlet and NOT recommended for a production
	                    .requestMatchers(HttpMethod.OPTIONS,"/**")
	                    .permitAll()
	                    .anyRequest()
	                    .authenticated()
	                    )
	                .httpBasic(
	                        Customizer.withDefaults())
	                .headers(header -> {
	                    header.frameOptions( frame -> frame.sameOrigin() );
	                })
	                .formLogin(login -> login 
	                					.disable()
	                					)
	                .httpBasic( basic -> 
	                					basic.disable())	
	                .oauth2Login( oauth -> oauth
	                					.authorizationEndpoint(a -> a.baseUri("/oauth2/authorize")
	                												.authorizationRequestRepository(cookieAuthorizationRequestRepository()))
	                					.redirectionEndpoint(e -> e.baseUri("/oauth2/callback/*"))
	                					.userInfoEndpoint( user -> user.userService(customOAuth2UserService))
	                					.successHandler(oAuth2AuthenticationSuccessHandler)
	                					.failureHandler(oAuth2AuthenticationFailureHandler)
	                					
	                		)	
	                .sessionManagement(session -> session.
	                		sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	                .authenticationProvider(customAuthenticationProvider)
	                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
	                .build();
    }
	 
	
	@Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }
	
	 	@Bean
	    public AuthenticationManager authenticationManager(
	    		CustomUserDetailsService customUserDetailsService) {
	 		
	        var authenticationProvider = new DaoAuthenticationProvider();
	        
	        authenticationProvider.setUserDetailsService(customUserDetailsService);
	        
	        authenticationProvider.setPasswordEncoder(passwordEncoder());

	        return new ProviderManager(authenticationProvider);
	    }
	  
	  @Bean
	    public JWKSource<SecurityContext> jwkSource() {
	        JWKSet jwkSet = new JWKSet(rsaKey());

	        return (((jwkSelector, securityContext) 
	                        -> jwkSelector.select(jwkSet)));
	    }

	    @Bean
	    JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
	        return new NimbusJwtEncoder(jwkSource);
	    }

	    @Bean
	    JwtDecoder jwtDecoder() throws JOSEException {
	        return NimbusJwtDecoder
	                .withPublicKey(rsaKey().toRSAPublicKey())
	                .build();
	    }
	    
	    @Bean
	    public RSAKey rsaKey() {
	        KeyPair keyPair = keyPair();
	        
	        return new RSAKey
	                .Builder((RSAPublicKey) keyPair.getPublic())
	                .privateKey((RSAPrivateKey) keyPair.getPrivate())
	                .keyID(UUID.randomUUID().toString())
	                .build();
	    }

	    @Bean
	    public KeyPair keyPair() {
	        try {
	            var keyPairGenerator = KeyPairGenerator.getInstance("RSA");
	            keyPairGenerator.initialize(2048);
	            return keyPairGenerator.generateKeyPair();
	        } catch (Exception e) {
	            throw new IllegalStateException(
	                    "Unable to generate an RSA Key Pair", e);
	        }
	    }
	 
}
