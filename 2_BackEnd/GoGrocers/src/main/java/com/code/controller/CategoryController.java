package com.code.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.code.dto.ResponseDto;
import com.code.pojos.Category;
import com.code.service.CategoryServiceImpl;
import com.code.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;

	@PostMapping("/add")
	public ResponseEntity<?> addNewCategory(@RequestBody Category category) {
		return new ResponseEntity<>(new ResponseDto<Category>("Success", categoryService.addOrEditCategory(category)),
				HttpStatus.CREATED);
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllCategories() {
		return new ResponseEntity<>(new ResponseDto<List<Category>>("Success", categoryService.getAllCategories()),
				HttpStatus.OK);
	}

	@PutMapping("/edit")
	public ResponseEntity<?> editCategory(@RequestBody Category category) {
		return new ResponseEntity<>(new ResponseDto<Category>("success", categoryService.addOrEditCategory(category)),
				HttpStatus.CREATED);
	}

	@DeleteMapping("/delete/{cid}")
	public ResponseEntity<?> deleteCategory(@PathVariable Long cid) {
		return new ResponseEntity<>(new ResponseDto<String>("success", categoryService.deleteCategoryById(cid)),
				HttpStatus.OK);
	}

}