package com.vthong.clothingstore.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.annotation.Testable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import jakarta.mail.MessagingException;

@Testable
@ExtendWith(SpringExtension.class)
class EmailSenderTest {
	
	
//	@Autowired
//	private EmailSenderService service = new EmailSenderService();
//	
//	@Test
//	@EventListener(ApplicationReadyEvent.class)
//	public void triggerMail() throws MessagingException {
//
//		service.sendSimpleEmail("nguoivodanh053@gmail.com",
//								"Test mail",
//								"TEst");
//
//	}

}
