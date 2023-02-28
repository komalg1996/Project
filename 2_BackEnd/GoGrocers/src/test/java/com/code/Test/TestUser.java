package com.code.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import com.code.dao.UserRepository;
import com.code.pojos.Role;
import com.code.pojos.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
class TestUser {
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private UserRepository urepo;
	
	@Test
	void test() {
		assertNotNull(urepo);
	}
	@Test
	void userTest() {
		List<User> user =List.of(new User("Komal", "Ghorpade", "k@gmail.com", encoder.encode("komal123"), "9028888888", Role.ADMIN),
				new User("Ashwini", "Palve", "a@gmail.com", encoder.encode("ashwini123"), "7269999999", Role.ADMIN));
	
		urepo.saveAll(user);
	}

}
