package com.code.dto;

import java.time.LocalDateTime;

public class ErrorResponse {
	private String status;
	private String message;
	private LocalDateTime timestamp;
	private String errDetails;

	public ErrorResponse() {
	}

	public ErrorResponse(String status, String message, String errDetails) {
		super();
		this.status = status;
		this.message = message;
		this.errDetails = errDetails;
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

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getErrDetails() {
		return errDetails;
	}

	public void setErrDetails(String errDetails) {
		this.errDetails = errDetails;
	}

	@Override
	public String toString() {
		return message + " timeStamp=" + timestamp;
	}
}

