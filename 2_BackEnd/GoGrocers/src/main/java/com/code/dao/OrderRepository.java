package com.code.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.code.pojos.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
	@Query("Select o from Order o where o.customer.id=:id order by o.statusUdpateTime desc")
	List<Order> findAllOrdersByUserId(@Param("id") Long userId);

	@Query("Select o from Order o where o.employee.id=:id")
	List<Order> findAllOrdersByEmployeeId(@Param("id") Long userId);
}
