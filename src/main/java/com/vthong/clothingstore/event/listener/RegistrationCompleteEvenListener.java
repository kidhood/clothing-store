package com.vthong.clothingstore.event.listener;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.vthong.clothingstore.entity.Customers;
import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.event.RegistrationCompleteEvent;
import com.vthong.clothingstore.repository.CustomerRepository;
import com.vthong.clothingstore.service.EmailSenderService;
import com.vthong.clothingstore.service.UserSevice;

import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RegistrationCompleteEvenListener implements
	ApplicationListener<RegistrationCompleteEvent>{
	
	@Autowired
	private UserSevice userSevice;
	
	@Autowired
	private EmailSenderService service;
	

	@Override
	public void onApplicationEvent(RegistrationCompleteEvent event) {
		// create the vertification token for the user with link
			User user = event.getUser();
			String token = UUID.randomUUID().toString();
			userSevice.saveVerificationTokenForUser(token,user);
		//send mail to user
			String url = 
						event.getApplicationUrl() +
						"/"+
						"verifyregistration?token="
						+ token;
			
			String content = "This link will expried after 10 minutes " + url;
			String subject = "Please verify your account from clothing store";
			
			Customers cus = user.getCustomers();
					
			try {
				triggerMail(cus.getEmail(), content, subject);
			} catch (MessagingException e) {
				log.error("Bug at mail send in RegistrationCompleteEvent {} ", e.getMessage());
			}
	}
	
	public void triggerMail(String emailTo, String content, String subject)
			throws MessagingException {

		service.sendSimpleEmail(emailTo,
								content,
								subject);
		log.info("Mail send...");

	}

}
