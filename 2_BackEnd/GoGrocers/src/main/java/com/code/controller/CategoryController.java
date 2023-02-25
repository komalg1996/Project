package com.code.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.code.pojos.Category;
import com.code.service.ICategoryService;

@RestController
@RequestMapping("/catagories")
public class CategoryController {
	@Autowired
	private ICategoryService service;
	
	//getAllCatagories
	@GetMapping
	public List<Category> getAllCategories(){
		return service.getAllCategories();
		
	}
	
	//addCategory
	
	
	//updateCategory
	//deleteCategory
	//
}
