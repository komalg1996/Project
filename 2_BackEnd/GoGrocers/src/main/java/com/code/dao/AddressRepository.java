package com.code.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.code.pojos.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	@Query("Select a from Address a join fetch a.selectedUser where a.selectedUser.id=:id")
	List<Address> getAllAddressesByUserId(@Param("id") Integer userId);

}