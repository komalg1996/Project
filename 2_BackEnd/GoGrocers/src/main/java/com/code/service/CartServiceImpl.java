package com.code.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.dao.CartRepository;
import com.code.dao.ProductRepository;
import com.code.dao.StockRepository;
import com.code.dao.UserRepository;
import com.code.pojos.Cart;
import com.code.pojos.Product;
import com.code.pojos.Stock;
import com.code.pojos.User;

@Service
@Transactional
public class CartServiceImpl implements CartService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ProductRepository prodRepo;
	@Autowired
	private CartRepository cartRepo;
	@Autowired
	private StockRepository stockRepo;

	@Override
	public String addItemToCart(Long productId, Integer quntity, Long userId) {
		User customer = userRepo.findById(userId).get();
		Product product = prodRepo.findById(productId).get();
		Stock stock = stockRepo.findById(productId).get();
		if (stock.getQuantity() < quntity)
			return "We Only Have" + stock.getQuantity() + " " + stock.getUnit() + "(s) of" + product.getName() + " .";
		cartRepo.save(new Cart(quntity, product, customer));
		return quntity + product.getName() + " added to cart";
	}

	@Override
	public List<Cart> getAllCartContents(Long userID) {
		return cartRepo.findAllItemsByUser(userID);
	}

	@Override
	public String updateQuantity(Long cartId, Integer quantity) {
		Cart cartItem = cartRepo.findById(cartId).get();
		Long stockId = cartItem.getSelectedProduct().getId();
		Stock stock = stockRepo.findById(stockId).get();
		if (stock.getQuantity() < quantity)
			return "We only have " + stock.getQuantity() + " " + stock.getUnit() + "(s) left!.";
		cartItem.setQuantity(quantity);
		return "success";
	}

	@Override
	public void deleteFromCart(Long cartId) {
		cartRepo.deleteById(cartId);

	}

	@Override
	public void deleteAllFromCart(Long userID) {
		cartRepo.deleteAll(cartRepo.findAllItemsByUser(userID));

	}

	@Override
	public Optional<Cart> findById(Long cartId) {
		return cartRepo.findById(cartId);
	}

}
