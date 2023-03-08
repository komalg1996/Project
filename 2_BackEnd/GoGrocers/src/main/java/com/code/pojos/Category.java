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
	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private Status status;

	@OneToMany(mappedBy = "selectedCategory", cascade = { CascadeType.MERGE, CascadeType.REMOVE }, orphanRemoval = true)
	@JsonIgnoreProperties("selectedCategory")
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

	public void addProduct(Product p) {
		products.add(p);
		p.setSelectedCategory(this);
	}

	public void removeProduct(Product p) {
		products.remove(p);
		p.setSelectedCategory(null);
	}

	@Override
	public String toString() {
		return "Category [ID=" + getId() + ",name=" + name + ", status=" + status + "]";
	}

}
