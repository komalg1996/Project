package com.code.service;

import java.util.List;

import com.code.pojos.Address;

public interface AddressService {

	List<Address> GetAllAddressessByUserId(Long userId);

	Address AddOrEditAddress(Address addr);

	String DeleteAddressById(Long userId);
}
