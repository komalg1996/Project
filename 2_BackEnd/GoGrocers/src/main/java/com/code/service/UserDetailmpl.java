package com.code.service;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.code.pojos.User;

public class UserDetailmpl implements UserDetails{
	
	private static final long serialVersionUID = 1L;
	private User user;
	
	private UserDetailmpl() {
		
	}
		// populating UserDetails object(spring sec object) from loaded user details
		// from DB
		public UserDetailmpl(User user) {
			super();
			this.user = user;
		}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		System.out.println("get authorities"+user.getuserRole());
		return List.of(new SimpleGrantedAuthority(user.getuserRole().name()));
	}

	@Override
	public String getPassword() {
		System.out.println("Get Password");
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
