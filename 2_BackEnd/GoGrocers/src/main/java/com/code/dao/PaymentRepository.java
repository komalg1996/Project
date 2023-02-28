package com.code.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.code.pojos.Payment;

public interface PaymentRepository extends JpaRepository<Payment,Long>{
	@Query("Select p from Payment p where p.currentOrder.id=:id")
	Payment findPaymentByOrderId(@Param("id") Long id);
}
