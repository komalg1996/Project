package com.code.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.code.pojos.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}
