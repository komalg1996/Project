package com.code.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.code.pojos.Stock;


public interface StockRepository extends JpaRepository<Stock, Integer>{

}
