package com.code.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.code.pojos.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
