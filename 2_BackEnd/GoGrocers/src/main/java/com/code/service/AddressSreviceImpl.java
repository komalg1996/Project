package com.code.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.dao.AddressRepository;
import com.code.pojos.Address;

@Service
@Transactional
public class AddressSreviceImpl implements AddressService {
	@Autowired
	private AddressRepository addrRepo;
	@Override
	public List<Address> GetAllAddressessByUserId(Long userId) {
		return addrRepo.GetAllAddressesByUserId(userId);
	}

	@Override
	public Address AddOrEditAddress(Address addr) {
		return addrRepo.save(addr);
	}

	@Override
	public String DeleteAddressById(Long userId) {
		addrRepo.deleteById(userId);
		return "Address of ID" + userId + "is deleted Successfully";
	}

}
