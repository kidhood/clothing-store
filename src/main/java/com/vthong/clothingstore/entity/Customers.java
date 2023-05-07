package com.vthong.clothingstore.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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
@ToString
@Builder
@NoArgsConstructor

@Entity
public class Customers {
	@Id
	@GeneratedValue
	private Long customersID;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String phoneNumber;
	
	private Date dateRegistered;
	
	@Embedded
	private Address address;
	
	private Boolean isDelete;
	
	@OneToMany(mappedBy = "customer")
	private List<Orders> orders;
	
	@OneToOne(mappedBy = "customers")
	private User user;
	
}
