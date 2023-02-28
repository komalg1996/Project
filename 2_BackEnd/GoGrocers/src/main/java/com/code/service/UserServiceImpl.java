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

@Transactional
@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepo;
	@Override
	public User registerOrEditUser(User user) {
		return userRepo.save(user);
	}
	@Override
	public User authnticateUser(LoginRequest request) throws UserNotFoundException {
		return userRepo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new UserNotFoundException("Invalid Credintials"));
	}
	@Override
	public User findByEmail(String email) {
		
		return userRepo.findByEmail(email);
	}
	@Override
	public User findById(Long userId) throws UserNotFoundException {
		
		return userRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("Invalid Credintials"));
	}
	@Override
	public List<User> getUsersByRole(String role) {
		return userRepo.findAll().stream().filter(user -> user.getuserRole().name().equals(role))
		.collect(Collectors.toList());
	}
	@Override
	public String deleteUserById(Long Id) {
		userRepo.deleteById(Id);
		if (userRepo.findById(Id) == null) {
			return "User Deleted Success fully";
		}
		return "";
	}

}
	
