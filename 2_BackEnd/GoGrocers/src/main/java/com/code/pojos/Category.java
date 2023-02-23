package com.code.pojos;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "categories")
public class Category extends BaseEntity {
	@Column(name = "category_name", length = 30)
	private String categoryName;
	@Column(length = 100)
	private String description;
	@OneToMany(mappedBy = "productCategory", cascade = CascadeType.ALL, orphanRemoval = true)	//one category many products
	private List<Product> products =new ArrayList<>();
	
	public Category() {
		
	}

	public Category(String categoryName, String description) {
		super();
		this.categoryName = categoryName;
		this.description = description;
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

	@Override
	public String toString() {
		return "Category=Id"+getId()+" [categoryName=" + categoryName + ", description=" + description + "]";
	}
	
	
	
	
}
