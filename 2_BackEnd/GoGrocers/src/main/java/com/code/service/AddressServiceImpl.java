package com.code.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.dao.AddressRepository;
import com.code.pojos.Address;

@Service
@Transactional
public class AddressServiceImpl implements IAddressService{
	
	@Autowired
	private AddressRepository addrRepo;
	
	@Override
	public List<Address> getAllAddressesByUserId(Integer userId) {
		return addrRepo.getAllAddressesByUserId(userId);
	}

	@Override
	public Address addOrEditAddress(Address addr) {
		return addrRepo.save(addr);
	}

	@Override
	public String deleteAddressById(Integer addrId) {
		addrRepo.deleteById(addrId);
		return "Address with id : " + addrId + " deleted successfully!!";
	}
}
