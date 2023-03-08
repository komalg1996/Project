package com.code.pojos;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "payments")
public class Payment extends BaseEntity {

	private double amount;

	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	private LocalDateTime paymentDate;

	@Enumerated(EnumType.STRING)
	@Column(length = 12)
	private PaymentStatus status;

	@Enumerated(EnumType.STRING)
	@Column(length = 12)
	private Type type;

	@OneToOne
	@JoinColumn(name = "order_id")
	private Order currentOrder;

	public Payment() {
	}

	public Payment(double amount, LocalDateTime paymentDate, PaymentStatus status, Type type, Order currentOrder) {
		super();
		this.amount = amount;
		this.paymentDate = paymentDate;
		this.status = status;
		this.type = type;
		this.currentOrder = currentOrder;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public LocalDateTime getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDateTime paymentDate) {
		this.paymentDate = paymentDate;
	}

	public PaymentStatus getStatus() {
		return status;
	}

	public void setStatus(PaymentStatus status) {
		this.status = status;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	@JsonIgnore
	public Order getCurrentOrder() {
		return currentOrder;
	}

	public void setCurrentOrder(Order currentOrder) {
		this.currentOrder = currentOrder;
	}

	@Override
	public String toString() {
		return "Payment [amount=" + amount + ", paymentDate=" + paymentDate + ", status=" + status + ", type=" + type
				+ "]";
	}
}
