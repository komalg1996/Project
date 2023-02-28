package com.code.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.dao.CategoryRepository;
import com.code.dao.ProductRepository;
import com.code.dao.StockRepository;
import com.code.dto.ProductDto;
import com.code.pojos.Category;
import com.code.pojos.Product;
import com.code.pojos.Status;
import com.code.pojos.Stock;
@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	@Autowired
	private CategoryRepository crepo;
	@Autowired
	private ProductRepository prepo;
	@Autowired
	private StockRepository srepo;
	@Override
	public String addProduct(ProductDto input) {
		
		// find category by name
				Optional<Category> cat = crepo.findBycategoryName(input.getCategory());
				Category currentCat = null;
				// Category present then get persistent pojo
				if (cat.isPresent())
					currentCat = cat.get();
				else {// Category absent then create a new category and persist it
					currentCat =new Category (input.getCategory(),Status.ACTIVE);
					crepo.save(currentCat);
				}
				// extract product details
				Product product = input.getProduct();
				currentCat.addProducts(product);// helper method in category pojo,
				// Link the category pojo with product pojo by adding it into categories product
				// Extract stock from input
				Stock stock = input.getStock();
				// link the product with the stock pojo
				stock.setCurrentProduct(product);
				srepo.save(stock);
				return product.getProductName() + "Added Successfully";
	}
	@Override
	public List<Product> getProductsByCategory(Long id) {
		
		return prepo.getProductByCategory(id);
	}
	@Override
	public ProductDto editProduct(ProductDto input) {
		// extract product from productDTO
		Product product = input.getProduct();
		// extract category from name
		Category cat = crepo.findBycategoryName(input.getCategory()).get();
		// set the extracted category into product
		product.setProductCategory(cat);
		Product updateProduct = prepo.save(product);
		// save stock
		Stock stock = srepo.save(input.getStock());
		return new ProductDto(updateProduct, cat.getCategoryName(), stock);
	}
	
	@Override
	public List<ProductDto> getStockReportByCategory(String category) {
		Category currentCat = crepo.findBycategoryName(category).get();
		List<Product> products = prepo.getProductByCategory(currentCat.getId());
		List<ProductDto> product_details = new ArrayList<>();
		products.forEach(product -> {
			product_details.add(new ProductDto(product, category, srepo.findById(product.getId()).get()));
		});
		return product_details;
	}
	@Override
	public String deleteProduct(Long id) {
		String productName = prepo.findById(id).get().getProductName();
		srepo.deleteById(id);
		prepo.deleteById(id);
		return productName + "Deleted Successfully";
	}
	@Override
	public ProductDto getProductDetail(Long id) {
		Stock stock = srepo.findById(id).get();
		return new ProductDto(stock.getCurrentProduct(), stock.getCurrentProduct().getProductCategory().getCategoryName(),
				stock);
	}
	
	
}
