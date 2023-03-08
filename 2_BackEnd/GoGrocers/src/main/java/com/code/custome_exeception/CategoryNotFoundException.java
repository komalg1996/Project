package com.code.custome_exeception;

public class CategoryNotFoundException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public CategoryNotFoundException(String errMessage ) {
		super(errMessage);
	}
	
}
