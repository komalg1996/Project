package com.code.service;

import java.util.List;

import com.code.pojos.Category;
import com.code.pojos.Product;

public interface CategoryService {

	List<Category> getAllCategories();
	
	Category addOrEditCategory(Category category);
	
	String deleteCategoryById(Long id);

	Category findByName(String categoryName);
	
	
}
