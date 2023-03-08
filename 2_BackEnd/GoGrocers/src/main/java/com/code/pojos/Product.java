package com.code.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "products")
public class Product extends BaseEntity {
	@Column(length = 30)
	private String name;
	@Column(length = 100)
	private String description;
	private double price;

	@Column(length = 40)
	private String imageName;

	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private Status status;
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	@JsonIgnoreProperties("products")
	private Category selectedCategory;

	public Product() {
	}

	public Product(String name, String description, double price, Status status) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@JsonIgnore
	public Category getSelectedCategory() {
		return selectedCategory;
	}

	public void setSelectedCategory(Category selectedCategory) {
		this.selectedCategory = selectedCategory;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	@Override
	public String toString() {
		return "Product [ID=" + getId() + ",name=" + name + ", description=" + description + ", price=" + price
				+ ", status=" + status + ",imageName=" + imageName + "]";
	}
}
