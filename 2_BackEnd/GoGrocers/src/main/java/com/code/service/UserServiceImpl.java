package com.code.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.custome_exeception.UserNotFoundException;
import com.code.dao.UserRepository;
import com.code.dto.LoginRequest;
import com.code.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService{

	@Autowired
	private UserRepository userRepo;

	@Override
	public User registerOrEditUser(User user) {
		// persist the transient user pojo which consists of details of user
		return userRepo.save(user);
	}

	@Override
	public User authenticateUser(LoginRequest request) {
		return userRepo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new UserNotFoundException("Invalid Credentials!"));
	}

	@Override
	public User findByEmail(String email) {
		return userRepo.findByEmail(email);
	}

	@Override
	public User findById(Integer userId) {
		return userRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("Invalid Credentials"));
	}

	@Override
	public List<User> getUsersByRole(String role) {
		// find all the users
		// filter the users list by role
		// collect the filtered users in a list
		return userRepo.findAll().stream().filter(user -> user.getRole().name().equals(role))
				.collect(Collectors.toList());
	}

	@Override
	public String deleteUserById(Integer uid) {
		userRepo.deleteById(uid);
		return "User with id: " + uid + " deleted successfully!!";
	}
}
