package com.code.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.custome_exeception.CategoryNotFoundException;
import com.code.dao.CategoryRepository;
import com.code.pojos.Category;
import com.code.pojos.Product;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService{
	@Autowired
	private CategoryRepository crepo;
	@Autowired
	private ProductServiceImpl prepo;
	
	//get
	@Override
	public List<Category> getAllCategories() {

		return crepo.findAll();
	}
	
	@Override
	public Category addOrEditCategory(Category category) {
		return crepo.save(category);
	}

	@Override
	public String deleteCategoryById(Long id) {
		Category categoryToDelete = crepo.findById(id).get();
		String catName = categoryToDelete.getName();
		categoryToDelete.getProducts().forEach(product -> {
			prepo.deleteProduct(product.getId());
		});
		return catName + "Category Deleted Successfully";
	}

	@Override
	public Category findByName(String categoryName) {
		return crepo.findByName(categoryName)
				.orElseThrow(() -> new CategoryNotFoundException("No such Category available"));
	}
	
	
	
	

}
