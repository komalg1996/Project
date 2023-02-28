package com.code.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.code.dao.UserRepository;
import com.code.pojos.User;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
	@Autowired
	private UserRepository userRepo;

	/*
	 * o.s.s.c.userdetails.UserDetails : represents core user information. It stores
	 * user information which is later encapsulated into Authentication object. This
	 * allows non-security related additional user information (eg : email
	 * addresses,telephone numbers ) to be stored in a convenient location.
	 * 
	 */
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		System.out.println("in load user " + userName);
		// replaced userName by email
//		User user = userRepo.findByUserName(userName)
//				.orElseThrow(() -> new UsernameNotFoundException("User Name " + userName + " not found!!!"));
		User user = userRepo.findByEmail(userName);
		return new UserDetailmpl(user);
	}

	public UserDetails loadUserById(Long id) throws UsernameNotFoundException {

		System.out.println("\n------------ IN UserDetailsServiceImpl.loadUserById ---------------\n");

		System.out.println("Id: " + id);

		User user = userRepo.findById(id).get();

		System.out.println("User from loadUserById: " + user);
		return new org.springframework.security.core.userdetails.User(user.getId().toString(), user.getPassword(),
				new ArrayList<GrantedAuthority>());
	}
}
