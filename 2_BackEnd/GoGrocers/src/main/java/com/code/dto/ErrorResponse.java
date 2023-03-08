package com.code.dto;

import java.time.LocalDateTime;

public class ErrorResponse {
	private String status;
	private String message;
	private LocalDateTime timeStamp;
	private String errDetails;

	public ErrorResponse() {
	}

	public ErrorResponse(String status, String message, String errDetails) {
		super();
		this.status = status;
		this.message = message;
		this.errDetails = errDetails;
		this.timeStamp = LocalDateTime.now();
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}

	public String getErrDetails() {
		return errDetails;
	}

	public void setErrDetails(String errDetails) {
		this.errDetails = errDetails;
	}

	@Override
	public String toString() {
		return message + " timeStamp=" + timeStamp;
	}
}