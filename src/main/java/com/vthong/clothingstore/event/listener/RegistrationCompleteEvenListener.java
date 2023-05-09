package com.vthong.clothingstore.event.listener;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.vthong.clothingstore.entity.User;
import com.vthong.clothingstore.event.RegistrationCompleteEvent;
import com.vthong.clothingstore.service.UserSevice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
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
						"/"+
						"verifyregistration?token="
						+ token;
			log.info("Click the link {}", url);
	}

}
