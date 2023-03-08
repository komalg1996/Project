package com.code.dto;

public class OrderPlaceDto {
	private String paymentMode;
	private int addressId;

	public OrderPlaceDto() {
	}

	public OrderPlaceDto(String paymentMode, int addressId) {
		super();
		this.paymentMode = paymentMode;
		this.addressId = addressId;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public int getAddressId() {
		return addressId;
	}

	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}

	@Override
	public String toString() {
		return "OrderPlaceDto [paymentMode=" + paymentMode + ", addressId=" + addressId + "]";
	}
}
