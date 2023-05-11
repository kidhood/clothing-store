package com.vthong.clothingstore.entiti;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.annotation.Testable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.vthong.clothingstore.entity.User;

@Testable
@ExtendWith(SpringExtension.class)
public class UserTest {
	
	@Test
	void testCreateUserByLombok() {
		User u = User.builder().userName("Hello").build();
		assertEquals("Hello", u.getUsername());
	}
	
}
