package com.code.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "cart_items")
public class CartItem extends BaseEntity{
	//quantity , totalPrice , cart , product
	private int quantity;
	@Column(name = "total_price")
	private double totalPrice;
	@ManyToOne
	@JoinColumn(name = "cart_id", nullable = false)
	private ShoppingCart cart;
	@OneToOne
	@JoinColumn(name = "product_id")
	private Product product;
	
	
	public CartItem() {
		
	}
	

	public CartItem(int quantity, double totalPrice, ShoppingCart cart, Product product) {
		super();
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.cart = cart;
		this.product = product;
	}


	@Override
	public String toString() {
		return "CartItem [quantity=" + quantity + ", totalPrice=" + totalPrice + ", cart=" + cart + "]";
	}


	public int getQuantity() {
		return quantity;
	}


	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}


	public double getTotalPrice() {
		return totalPrice;
	}


	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}


	public ShoppingCart getCart() {
		return cart;
	}


	public void setCart(ShoppingCart cart) {
		this.cart = cart;
	}


	public Product getProduct() {
		return product;
	}


	public void setProduct(Product product) {
		this.product = product;
	}
	
	
	
	
}
