package com.code.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.code.pojos.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

	@Query("Select p from Product p join fetch p.selectedCategory where p.selectedCategory.id=:id")
	List<Product> getProductsByCategory(@Param("id")Integer id);

}
