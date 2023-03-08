package com.code.pojos;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Lob;
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
	
	@Lob
	    @Column(name = "imagedata")
	    private byte[] imageData;

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
	public byte[] getImageData() {
		return imageData;
	}
	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
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
		return "Product [name=" + name + ", description=" + description + ", price=" + price + ", imageName="
				+ imageName + ", imageData=" + Arrays.toString(imageData) + ", status=" + status + ", selectedcategory="
				+ selectedcategory + "]";
	}

	
	
}