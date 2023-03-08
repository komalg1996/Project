package com.code.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.code.pojos.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{

	@Query("Select od from OrderDetail od where od.currentOrder.id=:id")
	List<OrderDetail> findAllByOrderId(@Param("id") Integer id);
}
