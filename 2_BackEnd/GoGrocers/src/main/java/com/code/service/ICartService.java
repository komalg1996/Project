package com.code.service;

import java.util.List;
import java.util.Optional;

import com.code.pojos.Cart;

public interface ICartService {
	String addItemToCart(Integer productId, Integer quantity, Integer userId);

	List<Cart> getAllCartContents(Integer userId);

	String updateQuantity(Integer cartId, Integer quantity);

	void deleteFromCart(Integer cartId);

	void deleteAllFromCart(Integer userId);

	Optional<Cart> findById(Integer cartId);
}
