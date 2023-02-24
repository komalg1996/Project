package com.code.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.code.pojos.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
}
