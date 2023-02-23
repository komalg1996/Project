package com.code.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "stock")
public class Stock extends BaseEntity {
	private int quantity;
	
	@Column(length = 10)
	private String unit;
	
	@OneToOne
	@JoinColumn(name = "product_id")
	@MapsId
	private Product currentProduct;

	public Stock() {

	}

	public Stock(int quantity, String unit, Product currentProduct) {
		super();
		this.quantity = quantity;
		this.unit = unit;
		this.currentProduct = currentProduct;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Product getCurrentProduct() {
		return currentProduct;
	}

	public void setCurrentProduct(Product currentProduct) {
		this.currentProduct = currentProduct;
	}

	@Override
	public String toString() {
		return "Stock [quantity=" + quantity + ", unit=" + unit + "]";
	}
}
