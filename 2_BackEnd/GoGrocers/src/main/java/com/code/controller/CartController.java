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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.code.dto.ResponseDto;
import com.code.pojos.Cart;
import com.code.service.CartService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cart")
public class CartController {
	@Autowired
	private CartService cartService;

	// add to cart
	public ResponseEntity<?> addToCart(@RequestBody HashMap<String, Long> map) {
		Long productId = map.get("productId");
		Long quantity = map.get("quantity");
		Long userId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
		return new ResponseEntity<>(
				new ResponseDto<>("Success", cartService.addItemToCart(productId, quantity.intValue(), userId)),
				HttpStatus.CREATED);
	}

	// view cart
	@GetMapping("/all")
	public ResponseEntity<?> getCartContents() {
		Long userId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
		List<Cart> cartItems = cartService.getAllCartContents(userId);
		return new ResponseEntity<>(new ResponseDto<>("success", cartItems), HttpStatus.OK);
	}

	// update quantity
	@PutMapping("/update")
	public ResponseEntity<?> updateQuantity(@RequestBody HashMap<String, Long> map) {
		Long cartId = map.get("cartId");
		Long quantity = map.get("quantity");
		String message = cartService.updateQuantity(cartId, quantity.intValue());
		Cart updatedCart = cartService.findById(cartId).get();
		return new ResponseEntity<>(new ResponseDto<>(message, updatedCart), HttpStatus.ACCEPTED);
	}

	// remove from cart
	@DeleteMapping("/delete/{cartId}")
	public ResponseEntity<?> removeFromCart(@PathVariable Long cartId) {
		String productName = cartService.findById(cartId).get().getSelectedProduct().getName();
		cartService.deleteFromCart(cartId);
		return new ResponseEntity<>(new ResponseDto<>("success", productName + " removed from cart"), HttpStatus.OK);
	}

	// remove all from cart
	@DeleteMapping("/delete/all")
	public ResponseEntity<?> removeAllFromCart() {
		Long userId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
		cartService.deleteAllFromCart(userId);
		return new ResponseEntity<>(new ResponseDto<>("success", "Cart destroyed for user with userId: " + userId),
				HttpStatus.OK);
	}
}