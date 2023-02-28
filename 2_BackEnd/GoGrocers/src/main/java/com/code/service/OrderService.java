package com.code.service;

import java.util.List;

import com.code.dto.OrderResponse;

public interface OrderService {
	List<OrderResponse> getAllOrders();

	List<OrderResponse> getAllCustomerOrders(Long userId);

	void updateOrderStatus(Long orderId, String status);

	String placeOrderForUser(Long userId, Long addrId, String paymentMode);

	void assignEmployee(Long userId, Long orderId);

	List<OrderResponse> getAllAssignedOrders(Long userId);
}
