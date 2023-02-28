package com.code.service;

import java.util.List;

import com.code.dto.ProductDto;
import com.code.pojos.Product;

public interface ProductService {
	String addProduct(ProductDto input);

	List<Product> getProductsByCategory(Long id);

	ProductDto editProduct(ProductDto input);

	List<ProductDto> getStockReportByCategory(String category);

	String deleteProduct(Long id);

	ProductDto getProductDetail(Long id);
}
