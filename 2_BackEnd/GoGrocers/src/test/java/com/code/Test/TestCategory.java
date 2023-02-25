package com.code.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.code.dao.CategoryRepository;
import com.code.pojos.Category;

@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(false)
class TestCategory {
	@Autowired
	private CategoryRepository crepo;
	@Test
	void test() {
		assertNotNull(crepo);
	}
	@Test
	void categoryTest() {
		
		List<Category> category =List.of(new Category("Grains", "Nutritious"),new Category("Juice", "Refreshing"));
		
		crepo.saveAll(category);
	}
}
