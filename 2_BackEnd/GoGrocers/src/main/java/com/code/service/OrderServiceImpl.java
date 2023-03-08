package com.code.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.dao.AddressRepository;
import com.code.dao.CartRepository;
import com.code.dao.OrderDetailRepository;
import com.code.dao.OrderRepository;
import com.code.dao.PaymentRepository;
import com.code.dao.StockRepository;
import com.code.dao.UserRepository;
import com.code.dto.OrderResponse;
import com.code.pojos.Address;
import com.code.pojos.Cart;
import com.code.pojos.Order;
import com.code.pojos.OrderDetail;
import com.code.pojos.OrderStatus;
import com.code.pojos.Payment;
import com.code.pojos.PaymentStatus;
import com.code.pojos.Stock;
import com.code.pojos.Type;
import com.code.pojos.User;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {

	@Autowired
	private OrderRepository orderRepo;

	@Autowired
	private OrderDetailRepository orderDetailRepo;

	@Autowired
	private CartRepository cartRepo;

	@Autowired
	private AddressRepository addrRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private StockRepository stockRepo;

	@Autowired
	private PaymentRepository payRepo;

	@Override
	public String placeOrderForUser(Integer userId, Integer addrId, String paymentMode) {
		// get all cart items for given user
		List<Cart> cartItems = cartRepo.findAllItemsByUser(userId);

		double total = 0.0;
		int deliveryCharges = 25;
		for (Cart item : cartItems) {
			Stock stock = stockRepo.findById(item.getSelectedProduct().getId()).get();
			int stockQuantity = stock.getQuantity();
			int orderQuantity = item.getQuantity();
			if (stockQuantity < orderQuantity) {
				return item.getSelectedProduct().getName() + " is out of stock. Order cannot be placed";
			}
			total += item.getQuantity() * item.getSelectedProduct().getPrice();
			stock.setQuantity(stockQuantity - orderQuantity);
		}

		Address address = addrRepo.findById(addrId).get();
		User user = userRepo.findById(userId).get();

		Order newOrder = new Order(total, LocalDateTime.now(), OrderStatus.PLACED, LocalDateTime.now(), address, user,
				null);
		orderRepo.save(newOrder);

		Payment payment = new Payment(total + deliveryCharges, LocalDateTime.now(),
				paymentMode.equals("COD") ? PaymentStatus.PENDING : PaymentStatus.COMPLETED, Type.valueOf(paymentMode),
				newOrder);
		payRepo.save(payment);
		cartItems.forEach(item -> {
			orderDetailRepo.save(new OrderDetail(item.getSelectedProduct().getPrice(), item.getQuantity(), newOrder,
					item.getSelectedProduct()));
		});
		cartRepo.deleteAll(cartItems);
		return "Order Placed Successfully!";
	}

	@Override
	public List<OrderResponse> getAllOrders() {
		List<Order> orders = orderRepo.findAll();
		List<OrderResponse> response = new ArrayList<>();

		for (Order order : orders) {
			List<OrderDetail> orderDetails = orderDetailRepo.findAllByOrderId(order.getId());
			Payment payment = payRepo.findPaymentByOrderId(order.getId());
			response.add(new OrderResponse(order, orderDetails, payment));
		}
		return response;
	}

	@Override
	public List<OrderResponse> getAllCustomerOrders(Integer userId) {
		List<Order> orders = orderRepo.findAllOrdersByUserId(userId);

		List<OrderResponse> response = new ArrayList<>();

		for (Order order : orders) {
			List<OrderDetail> orderDetails = orderDetailRepo.findAllByOrderId(order.getId());
			Payment payment = payRepo.findPaymentByOrderId(order.getId());
			response.add(new OrderResponse(order, orderDetails, payment));
		}
		return response;
	}

	@Override
	public void assignEmployee(Integer userId, Integer orderId) {
		Order order = orderRepo.findById(orderId).get();
		User employee = userRepo.findById(userId).get();
		order.setEmployee(employee);
		if (employee.getRole().name().equals("EMPLOYEE")) {
			order.setOrderStatus(OrderStatus.PACKING);
			order.setStatusUpdateDate(LocalDateTime.now());
		} else if (employee.getRole().name().equals("DELIVERY_PERSON"))
			order.setOrderStatus(OrderStatus.OUT_FOR_DELIVERY);
		return;
	}

	@Override
	public List<OrderResponse> getAllAssignedOrders(Integer userId) {
		List<Order> orders = orderRepo.findAllOrdersByEmployeeId(userId);

		List<OrderResponse> response = new ArrayList<>();

		for (Order order : orders) {
			List<OrderDetail> orderDetails = orderDetailRepo.findAllByOrderId(order.getId());
			Payment payment = payRepo.findPaymentByOrderId(order.getId());
			response.add(new OrderResponse(order, orderDetails, payment));
		}
		return response;
	}

	@Override
	public void updateOrderStatus(Integer orderId, String status) {
		Order order = orderRepo.findById(orderId).get();
		order.setOrderStatus(OrderStatus.valueOf(status));
		order.setStatusUpdateDate(LocalDateTime.now());
		if (status.equals("DELIVERED")) {
			Payment payment = payRepo.findPaymentByOrderId(orderId);
			payment.setStatus(PaymentStatus.COMPLETED);
		}
		return;

	}

}