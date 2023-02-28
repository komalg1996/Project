package com.code.service;

import java.util.List;

import com.code.custome_exeception.UserNotFoundException;
import com.code.dto.LoginRequest;
import com.code.pojos.User;

public interface UserService {
	User registerOrEditUser(User user);

	User authnticateUser(LoginRequest request) throws UserNotFoundException;

	User findByEmail(String email);

	User findById(Long userId) throws UserNotFoundException;

	List<User> getUsersByRole(String role);

	String deleteUserById(Long Id);
}
