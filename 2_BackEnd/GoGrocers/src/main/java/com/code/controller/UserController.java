package com.code.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.code.dto.LoginRequest;
import com.code.dto.LoginResponse;
import com.code.dto.ResponseDto;
import com.code.pojos.User;
import com.code.service.UserService;
import com.code.util.JwtUtil;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private UserService userService;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtil jwtUtil;

	public UserController() {
		System.out.println("-----ctor " + getClass().getName() + "----------");
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		System.out.println("in create new user" + user);
		user.setPassword(encoder.encode(user.getPassword()));
		System.out.println(user.getPassword());
		return new ResponseEntity<>(new ResponseDto<User>("success", userService.registerOrEditUser(user)),
				HttpStatus.CREATED);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request) {
		System.out.println("in auth " + request);
		try {
			// Tries to authenticate the passed Authentication object, returning a fully
			// populated Authentication object (including granted authorities)if successful.
			Authentication authenticate = authenticationManager.authenticate
			// An o.s.s.c.Authentication i/f implementation used for simple presentation of
			// a username and password.
			// Actual dao based authentication takes place here internally(first email :
			// here replaced username by email for authentication

			// n then pwd n then authorities gets validated)
			(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			// => successful authentication : create JWT n send it to the clnt in the
			// response.
			System.out.println("auth success " + authenticate);
			User user = userService.findByEmail(request.getEmail());
			return ResponseEntity.ok(new LoginResponse("Success", user, jwtUtil.generateJwtToken(authenticate)));
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("User authentication Failed", e);
		}
	}

	@PutMapping("/edit/{uid}")
	public ResponseEntity<?> editUser(@RequestBody User user, @PathVariable long uid) {
		user.setId(uid);
		user.setPassword(encoder.encode(user.getPassword()));
		return new ResponseEntity<>(new ResponseDto<User>("success", userService.registerOrEditUser(user)),
				HttpStatus.OK);
	}

	@GetMapping("/customers")
	public ResponseEntity<?> getAllCustomers() {
		//return new ResponseEntity<>(new ResponseDto<List<User>>("Success", userService.getUsersByRole("CUSTOMER")),HttpStatus.OK);
		return new ResponseEntity<>(new ResponseDto<List<User>>("Success", userService.getUsersByRole("CUSTOMER")),HttpStatus.OK);
	}

	@GetMapping("/employees")
	public ResponseEntity<?> getAllEmployees() {
		return new ResponseEntity<>(new ResponseDto<List<User>>("Success", userService.getUsersByRole("EMPLOYEE")),
				HttpStatus.OK);
	}

	@GetMapping("/delivery_person")
	public ResponseEntity<?> getAllDeliveryPerson() {
		return new ResponseEntity<>(
				new ResponseDto<List<User>>("Success", userService.getUsersByRole("DELIVERY_PERSON")), HttpStatus.OK);
	}

	@DeleteMapping("/delete/{uid}")
	public ResponseEntity<?> deleteById(@PathVariable long uid) {
		return new ResponseEntity<>(new ResponseDto<String>("Success", userService.deleteUserById(uid)), HttpStatus.OK);
	}
}

