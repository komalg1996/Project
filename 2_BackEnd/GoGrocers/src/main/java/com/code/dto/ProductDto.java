package com.code.dto;

import com.code.pojos.Product;
import com.code.pojos.Stock;

public class ProductDto {
	private Product product;
	private String category;
	private Stock stock;

	public ProductDto() {
	}

	public ProductDto(Product product, String category, Stock stock) {
		super();
		this.product = product;
		this.category = category;
		this.stock = stock;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	@Override
	public String toString() {
		return "ProductInputDto [product=" + product + ", category=" + category + ", stock=" + stock + "]";
	}
}
