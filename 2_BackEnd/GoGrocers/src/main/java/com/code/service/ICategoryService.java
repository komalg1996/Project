package com.code.service;

import java.util.List;

import com.code.pojos.Category;
import com.code.pojos.Product;

public interface ICategoryService {

	List<Category> getAllCategories();
	
	void deleteCategory(long id);
	
	//String addProductInCategory	(String categoryName,Product p);
	
	
}
