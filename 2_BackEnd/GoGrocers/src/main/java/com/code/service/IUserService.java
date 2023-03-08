package com.code.service;

import java.util.List;

import com.code.dto.LoginRequest;
import com.code.pojos.User;

public interface IUserService {
	User registerOrEditUser(User user);

	User authenticateUser(LoginRequest request);

	User findByEmail(String email);

	User findById(Integer userId);

	List<User> getUsersByRole(String string);

	String deleteUserById(Integer uid);
}
