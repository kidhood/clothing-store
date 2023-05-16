package com.vthong.clothingstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailSenderService {
	 	@Autowired
	    private JavaMailSender mailSender;

	    public void sendSimpleEmail(String toEmail,
	                                String body,
	                                String subject) {
//	        SimpleMailMessage message = new SimpleMailMessage();
//
//	        message.setFrom("andanhgen@gmail.com");
//	        message.setTo(toEmail);
//	        message.setText(body);
//	        message.setSubject(subject);
//
//	        mailSender.send(message);
//	        System.out.println("Mail Send...");
	    	log.info("Content mail {}", body);
	    }
}
