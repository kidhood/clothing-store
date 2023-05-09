package com.vthong.clothingstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vthong.clothingstore.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Setter
@Getter
@Builder
@NoArgsConstructor

@Entity(name = "Account")
public class User {
	@Id
	@GeneratedValue
	private Long id;
	
	private String userName;
	
	private String password;
	
	@Enumerated(EnumType.STRING)
	private UserRole role;
	
	private Boolean enable;
	
	@OneToOne(fetch =  FetchType.LAZY)
	@JoinColumn(name = "CUSTOMER_ID")
	@JsonIgnore
	private Customers customers;

	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", role=" + role ;
	}
	
	
}
