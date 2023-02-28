package com.code.service;

import java.util.List;
import java.util.Optional;

import com.code.pojos.Cart;

public interface CartService {
	String addItemToCart(Long productId, Integer quntity, Long userId);

	List<Cart> getAllCartContents(Long userID);

	String updateQuantity(Long carId, Integer quantity);

	void deleteFromCart(Long cartId);

	void deleteAllFromCart(Long userID);

	Optional<Cart> findById(Long cartId);
}
