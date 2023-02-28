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


@Entity
@Table(name = "categories")
public class Category extends BaseEntity {
	@Column(name = "category_name", length = 30)
	private String categoryName;
	@Column(length = 100)
	private String description;
	@Column(length = 30)
	@Enumerated(EnumType.STRING)
	private Status status;
	@OneToMany(mappedBy = "productCategory", cascade = CascadeType.ALL, orphanRemoval = true)	//one category many products
	private List<Product> products =new ArrayList<>();
	
	public Category() {
		
	}

	public Category(String name, Status status) {
		super();
		this.categoryName = categoryName;
		this.status = status;
	}

	public Category(String categoryName, String description) {
		super();
		this.categoryName = categoryName;
		this.description = description;
	}
	
	@JsonIgnore
	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Category=Id"+getId()+" [categoryName=" + categoryName + ", description=" + description +  ", status=" + status +"]";
	}
	//helper method
	public void addProducts(Product p) {
		products.add(p);
		p.setSelectedcategory(this);
	}
	public void removeProduct(Product p) {
		products.remove(p);
		p.setSelectedcategory(null);
	}
	
	
	
}
