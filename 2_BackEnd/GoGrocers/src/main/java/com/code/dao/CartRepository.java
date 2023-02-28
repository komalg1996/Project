package com.code.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.code.pojos.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{
	@Query("Select c from Cart c join fetch c.productCategory where c.currentCustomer.id=:id")
	List<Cart> findAllItemsByUser(@Param("id") Long userId);
}
