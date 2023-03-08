package com.code.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.code.pojos.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{

	Optional<Category> findByName(String category);

}
