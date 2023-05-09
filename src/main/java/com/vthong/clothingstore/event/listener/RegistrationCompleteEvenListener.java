package com.vthong.clothingstore.event.listener;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;

import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.event.RegistrationCompleteEvent;
import com.vthong.clothingstore.repository.VeriFicationTokenRepository;
import com.vthong.clothingstore.service.UserSevice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RegistrationCompleteEvenListener implements
	ApplicationListener<RegistrationCompleteEvent>{
	
	@Autowired
	private UserSevice userSevice;

	@Override
	public void onApplicationEvent(RegistrationCompleteEvent event) {
		// create the vertification token for the user with link
			User user = event.getUser();
			String token = UUID.randomUUID().toString();
			userSevice.saveVerificationTokenForUser(token,user);
		//send mail to user
			String url = 
						event.getApplicationUrl() +
						"verifiRegistration?token="
						+ token;
			log.info("Click the link {}", url);
	}

}
