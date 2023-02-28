package com.code.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@Entity
@Table(name = "Users_table")
public class User extends BaseEntity {
	@Column(length = 20)
	private String firstName;
	@Column(length = 20)
	private String lastName;
	@Column(length = 25, unique = true) // unique constraint
	private String email;
	@Column(nullable = false)
	private String password; // not null constraint
	@Column(length = 20)
	private String phone;
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private Role userRole;

	// default ctr
	public User() {
		this.firstName = "Komal";
	}

	// parametrised ctr
	public User(String firstName, String lastName, String email, String password, String phone, Role userRole) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.userRole = userRole;
	}

	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", password=" + password
				+ ", phone=" + phone + ", userRole=" + userRole + "]";
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Role getuserRole() {
		return userRole;
	}

	public void setRole(Role userRole) {
		this.userRole = userRole;
	}

}
