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
public class ProductServiceImpl implements IProductService {

	@Autowired
	private CategoryRepository catRepo;

	@Autowired
	private ProductRepository prodRepo;

	@Autowired
	private StockRepository stockRepo;

	@Override
	public String addProduct(ProductDto input) {
		// Find the category by name
		Optional<Category> cat = catRepo.findByName(input.getCategory());
		Category currentCat = null;
		// Category present then get persistent pojo
		if (cat.isPresent())
			currentCat = cat.get();
		else { // Category absent then create a new category and persist it
			currentCat = new Category(input.getCategory(), Status.ACTIVE);
			catRepo.save(currentCat);
		}

		// extract product details
		Product product = input.getProduct();

		currentCat.addProduct(product); // helper method in category pojo,
		// Link the category pojo with product pojo by adding it into categories product
		// list

		// Extract stock from input
		Stock stock = input.getStock();

		// link the product with the stock pojo
		stock.setCurrentProduct(product);

		// persist stock
		stockRepo.save(stock);
		return product.getName() + " added successfully!";
	}

	@Override
	public List<Product> getProductsByCategory(Integer id) {
		return prodRepo.getProductsByCategory(id);
	}

	@Override
	public ProductDto editProduct(ProductDto input) {
		// extract product from productDto
		Product product = input.getProduct();
		// extract category from name
		Category cat = catRepo.findByName(input.getCategory()).get();
		// set the extracted category into product
		product.setSelectedCategory(cat);

		Product updatedProduct = prodRepo.save(product);
		// save stock
		Stock stock = stockRepo.save(input.getStock());
		return new ProductDto(updatedProduct, cat.getName(), stock);
	}

	@Override
	public List<ProductDto> getStockReportByCategory(String category) {
		Category currentCat = catRepo.findByName(category).get();

		List<Product> products = prodRepo.getProductsByCategory(currentCat.getId());

		List<ProductDto> product_details = new ArrayList<>();

		products.forEach(product -> {
			product_details.add(new ProductDto(product, category, stockRepo.findById(product.getId()).get()));
		});

		return product_details;
	}

	@Override
	public String deleteProduct(Integer pid) {
		String productName = prodRepo.findById(pid).get().getName();
		stockRepo.deleteById(pid);
		prodRepo.deleteById(pid);
		return productName + " deleted successfully!";
	}

	@Override
	public ProductDto getProductDetail(Integer pid) {
		Stock stock = stockRepo.findById(pid).get();
		return new ProductDto(stock.getCurrentProduct(), stock.getCurrentProduct().getSelectedCategory().getName(),
				stock);
	}

}
