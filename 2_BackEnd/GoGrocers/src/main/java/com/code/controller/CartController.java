package com.code.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.code.dto.ResponseDto;
import com.code.pojos.Cart;
import com.code.service.ICartService;



@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {
	
	@Autowired 
	private ICartService cartService;
	
	//add to cart
	@PostMapping("/add")
	public ResponseEntity<?> addToCart(@RequestBody HashMap<String, Integer> map){
		Integer productId = map.get("productId");
		Integer quantity = map.get("quantity");
		System.out.println("ProductId: "+productId+" quantity: "+quantity);
		Integer userId = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
		return new ResponseEntity<>(new ResponseDto<>("success", cartService.addItemToCart(productId,quantity,userId)),HttpStatus.CREATED);
	}
	
	//view cart
	@GetMapping("/all")
	public ResponseEntity<?> getCartContents(){
		Integer userId = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
		List<Cart> cartItems= cartService.getAllCartContents(userId);
		return new ResponseEntity<>(new ResponseDto<>("success", cartItems),HttpStatus.OK);
	}
	
	//update quantity
	@PutMapping("/update")
	public ResponseEntity<?> updateQuantity(@RequestBody HashMap<String, Integer> map){
		Integer cartId = map.get("cartId");
		Integer quantity = map.get("quantity");
		String message = cartService.updateQuantity(cartId,quantity);
		Cart updatedCart = cartService.findById(cartId).get();
		return new ResponseEntity<>(new ResponseDto<>(message,updatedCart),HttpStatus.ACCEPTED);
	}
	
	//remove from cart
	@DeleteMapping("/delete/{cartId}")
	public ResponseEntity<?> removeFromCart(@PathVariable Integer cartId){
		String productName = cartService.findById(cartId).get().getSelectedProduct().getName();
		cartService.deleteFromCart(cartId);
		return new ResponseEntity<>(new ResponseDto<>("success",productName +" removed from cart"),HttpStatus.OK);
	}
	
	//remove all from cart
	@DeleteMapping("/delete/all")
	public ResponseEntity<?> removeAllFromCart(){
		Integer userId = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
		cartService.deleteAllFromCart(userId);
		return new ResponseEntity<>(new ResponseDto<>("success","Cart destroyed for user with userId: "+userId),HttpStatus.OK);
	}
}
