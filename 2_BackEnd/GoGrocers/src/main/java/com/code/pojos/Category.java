package com.code.pojos;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity {
	@Column(length = 30)
	private String name;

	@Column(length = 30)
	@Enumerated(EnumType.STRING)
	private Status status;

	@JsonIgnoreProperties("selectedcategory")
	@OneToMany(mappedBy = "selectedcategory", cascade = { CascadeType.MERGE, CascadeType.REMOVE }, orphanRemoval = true)
	private List<Product> products = new ArrayList<>();

	public Category() {
	}

	public Category(String name, Status status) {
		super();
		this.name = name;
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@JsonIgnore
	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	// helper method to add product
	public void addProduct(Product p) {
		products.add(p);
		p.setSelectedcategory(this);
	}

	// helper method to remove product
	public void removeProduct(Product p) {
		products.remove(p);
		p.setSelectedcategory(null);
	}

	@Override
	public String toString() {
		return "Category ID " + getId() + " [name=" + name + ", status=" + status + "]";
	}
}
