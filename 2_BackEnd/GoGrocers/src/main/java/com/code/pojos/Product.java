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

	private long price;

	@Column(length = 30)
	private String imageName;

	@Column(length = 30)
	@Enumerated(EnumType.STRING)
	private Status status;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	@JsonIgnoreProperties("products")
	private Category selectedcategory;

	public Product() {
	}

	public Product(String name, String description, long price, Status status) {
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

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@JsonIgnore
	public Category getSelectedcategory() {
		return selectedcategory;
	}

	public void setSelectedcategory(Category selectedcategory) {
		this.selectedcategory = selectedcategory;
	}

	@Override
	public String toString() {
		return "Product Id" + getId() + "[name=" + name + ", description=" + description + ", price=" + price
				+ ", imageName=" + imageName + ", status=" + status + ", selectedcategory=" + selectedcategory + "]";
	}
}