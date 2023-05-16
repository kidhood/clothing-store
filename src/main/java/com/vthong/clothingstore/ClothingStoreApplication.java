package com.vthong.clothingstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.vthong.clothingstore.service.EmailSenderService;

import jakarta.mail.MessagingException;

@SpringBootApplication
public class ClothingStoreApplication {
	
//	@Autowired
//	private EmailSenderService service;
	
	public static void main(String[] args) {
		SpringApplication.run(ClothingStoreApplication.class, args);
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
					.allowedMethods("*")
					.allowedOrigins("http://localhost:3000");
			}
		};
	}
	
//	@EventListener(ApplicationReadyEvent.class)
//	public void triggerMail() throws MessagingException {
//
//		service.sendSimpleEmail("nguoivodanh053@gmail.com",
//								"Test mail",
//								"TEst");
//
//	}

}
