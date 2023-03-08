package com.code.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.code.dto.OrderPlaceDto;
import com.code.dto.ResponseDto;
import com.code.service.IOrderService;



@RestController
@CrossOrigin
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private IOrderService orderService;
	
	@PostMapping("/place")
	public ResponseEntity<?> placeOrderFromCart(@RequestBody OrderPlaceDto orderInput){
		Integer userId = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
		Integer addrId = orderInput.getAddressId();
		String paymentMode = orderInput.getPaymentMode();
		return new ResponseEntity<>(new ResponseDto<>("success", orderService.placeOrderForUser(userId,addrId,paymentMode)),HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllOrders(){
		return new ResponseEntity<>(new ResponseDto<>("success",orderService.getAllOrders()),HttpStatus.OK);
	}
	
	@GetMapping("/assigned")
	public ResponseEntity<?> getAssignedOrders(){
		Integer userId = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
		return new ResponseEntity<>(new ResponseDto<>("success",orderService.getAllAssignedOrders(userId)),HttpStatus.OK);
	}
	
	@GetMapping("/customer/all")
	public ResponseEntity<?> getAllCustomerOrders(){
		Integer userId = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
		return new ResponseEntity<>(new ResponseDto<>("success",orderService.getAllCustomerOrders(userId)),HttpStatus.OK);
	}
	
	@PatchMapping("/update")
	public ResponseEntity<?> assignEmployee(@RequestBody HashMap<String, Integer> orderInput){
		Integer userId = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
		orderService.assignEmployee(userId,orderInput.get("orderId"));
		return new ResponseEntity<>(new ResponseDto<>("success","Order Assigned Successfully!!"),HttpStatus.OK);
	}
	
	@PatchMapping("/update-status")
	public ResponseEntity<?> updateOrderStatus(@RequestBody HashMap<String, String> orderInput){
		orderService.updateOrderStatus(Integer.parseInt(orderInput.get("orderId")),orderInput.get("status"));
		return new ResponseEntity<>(new ResponseDto<>("success","Order Status Changed Successfully!!"),HttpStatus.OK);
	}
	
}
