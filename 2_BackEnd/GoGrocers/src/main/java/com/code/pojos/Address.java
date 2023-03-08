package com.code.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "addresses")
public class Address extends BaseEntity {
	@Column(length = 45)
	private String addressLine1;
	@Column(length = 45)
	private String addressLine2;
	@Column(length = 30)
	private String city;
	@Column(length = 10)
	private String pinCode;
	@Column(length = 30)
	private String state;
	@Column(length = 30)
	private String country;

	// Bidirectional Association
	@ManyToOne(fetch = FetchType.LAZY) // Fetch the data lazily/ on demand
	@JoinColumn(name = "user_id", nullable = false) // Create a table column in address table to store PK of user as FK.
	@JsonIgnore
	private User selectedUser;

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPinCode() {
		return pinCode;
	}

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public User getSelectedUser() {
		return selectedUser;
	}

	public void setSelectedUser(User selectedUser) {
		this.selectedUser = selectedUser;
	}

	@Override
	public String toString() {
		return "Address [ID=" + getId() + ",addressLine1=" + addressLine1 + ", addressLine2=" + addressLine2 + ", city="
				+ city + ", pinCode=" + pinCode + ", state=" + state + ", country=" + country + "]";
	}

}
