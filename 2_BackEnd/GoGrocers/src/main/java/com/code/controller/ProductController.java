package com.code.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.code.dto.ProductDto;
import com.code.dto.ResponseDto;
import com.code.pojos.Category;
import com.code.pojos.Product;
import com.code.service.CategoryService;
import com.code.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

	@Value("${file.upload.location}")
	private String location;

	@Autowired
	private ProductService prodService;

	@Autowired
	private CategoryService catService;

	@PostMapping("/add-product")
	public ResponseEntity<?> addNewProduct(@RequestBody ProductDto productDto){
//			@RequestParam(required = false) MultipartFile image) {
		String message = "";
		try {
			//ProductDto productDetails = new ObjectMapper().readValue(productDto, ProductDto.class);

//			if (image != null) {
//				image.transferTo(new File(location, image.getOriginalFilename()));
//				productDetails.getProduct().setImageName(image.getOriginalFilename());
//			}
			message = prodService.addProduct(productDto);
		} catch (Exception e) {
			message = "error";
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ResponseDto<>("success", message), HttpStatus.CREATED);
	}

	@GetMapping("/image/{imgName}")
	public ResponseEntity<InputStreamResource> getImage(@PathVariable String imgName) throws IOException {

		System.out.println("in img download 2 " + (location + imgName));
		Path path = Paths.get(location, imgName);
		InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(path.toFile()));

		HttpHeaders headers = new HttpHeaders();
		headers.add("content-type", Files.probeContentType(path));
		return ResponseEntity.ok().headers(headers).body(inputStreamResource);
	}

	// show all by category
	@GetMapping("/category/{categoryName}")
	public ResponseEntity<?> getProductsByCategory(@PathVariable String categoryName) {
		Category cat = catService.findByName(categoryName);
		return new ResponseEntity<>(
				new ResponseDto<List<Product>>("success", prodService.getProductsByCategory(cat.getId())),
				HttpStatus.OK);
	}

	// show stock with category
	@GetMapping("/stock/category-report/{categoryName}")
	public ResponseEntity<?> getStockReportByCategory(@PathVariable String categoryName) {
		List<ProductDto> product_details = prodService.getStockReportByCategory(categoryName);
		return new ResponseEntity<>(new ResponseDto<List<ProductDto>>("success", product_details), HttpStatus.OK);
	}

	// show all product details with stock
	@GetMapping("/detail/{pid}")
	public ResponseEntity<?> getProductDetail(@PathVariable Long pid) {
		ProductDto productDetail = prodService.getProductDetail(pid);
		return new ResponseEntity<>(new ResponseDto<>("success", productDetail), HttpStatus.OK);
	}

	// edit product
	@PutMapping("/edit")
	public ResponseEntity<?> editProduct(@RequestParam ProductDto productDto){
			//@RequestParam(required = false) MultipartFile image) {
		String message = "";
		try {
//			ProductDto productDetails = new ObjectMapper().readValue(productDto, ProductDto.class);
//
//			if (image != null) {
//				image.transferTo(new File(location, image.getOriginalFilename()));
//				productDetails.getProduct().setImageName(image.getOriginalFilename());
//			}
//			ProductDto newProduct = prodService.editProduct(productDetails);
//			// System.out.println("Product Details: "+productDetails);
			message = productDto.getProduct().getName() + " edited successfully";
			
		} catch (Exception e) {
			message = "error";
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ResponseDto<>("success", message), HttpStatus.OK);
	}

	// delete product
	@DeleteMapping("/delete/{pid}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long pid) {
		return new ResponseEntity<>(new ResponseDto<String>("success", prodService.deleteProduct(pid)), HttpStatus.OK);
	}
}
