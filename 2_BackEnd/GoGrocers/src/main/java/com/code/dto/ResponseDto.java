package com.code.dto;

public class ResponseDto<T> {
	private String status;
	private T data;

	public ResponseDto() {
	}

	public ResponseDto(String status, T data) {
		super();
		this.status = status;
		this.data = data;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "ResponseDto [status=" + status + ", data=" + data + "]";
	}
}
