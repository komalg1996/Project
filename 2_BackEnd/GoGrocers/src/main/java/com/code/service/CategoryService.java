package com.code.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.dao.CategoryRepository;
import com.code.pojos.Category;

@Service
public class CategoryService implements ICategoryService{
	@Autowired
	private CategoryRepository crepo;
	@Override
	public List<Category> getAllCategories() {

		return crepo.findAll();
	}

}
