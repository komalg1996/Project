package com.code.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.dao.CategoryRepository;
import com.code.pojos.Category;
import com.code.pojos.Product;

@Service
public class CategoryService implements ICategoryService{
	@Autowired
	private CategoryRepository crepo;
	@Override
	public List<Category> getAllCategories() {

		return crepo.findAll();
	}
	
	@Override
	public void deleteCategory(long id) {
		// TODO Auto-generated method stub
		
	}
	//@Override
//	public String addProductInCategory(String categoryName, Product p) {
//		Category category =crepo.findById(id).orElseThrow();
//		if (category!=null) {
//			category.addProducts(p);
//			return "Product added Succesfully";
//		}
//		return "Product not Added";
//	}
	

}
