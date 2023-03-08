package com.code.pojos;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cart")
public class Cart extends BaseEntity {

	private int quantity;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product selectedProduct;

	@OneToOne
	@JoinColumn(name = "customer_id")
	private User currentCustomer;

	public Cart() {
	}

	public Cart(int quantity, Product selectedProduct, User currentCustomer) {
		super();
		this.quantity = quantity;
		this.selectedProduct = selectedProduct;
		this.currentCustomer = currentCustomer;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Product getSelectedProduct() {
		return selectedProduct;
	}

	public void setSelectedProduct(Product selectedProduct) {
		this.selectedProduct = selectedProduct;
	}

	@JsonIgnore
	public User getCurrentCustomer() {
		return currentCustomer;
	}

	public void setCurrentCustomer(User currentCustomer) {
		this.currentCustomer = currentCustomer;
	}

	@Override
	public String toString() {
		return "Cart [ID=" + getId() + ",quantity=" + quantity + "]";
	}

}
