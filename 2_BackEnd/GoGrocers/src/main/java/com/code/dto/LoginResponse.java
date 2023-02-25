package com.code.dto;

import com.code.pojos.User;

public class LoginResponse {
	private String status;
	private User data;
	private String token;
	
	public LoginResponse() {
		System.out.println("----In ctor LoginResponse----");
	}

	public LoginResponse(String status, User data, String token) {
		super();
		this.status = status;
		this.data = data;
		this.token = token;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getData() {
		return data;
	}

	public void setData(User data) {
		this.data = data;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "LoginResponse [status=" + status + ", data=" + data + ", token=" + token + "]";
	}
	
}
