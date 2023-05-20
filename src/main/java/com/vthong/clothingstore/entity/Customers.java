package com.vthong.clothingstore.entity;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@Builder
@NoArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Customers {
	@Id
	@GeneratedValue
	private Long customersID;
	
	private String firstName;
	
	private String lastName;
	@Column(unique=true)
	private String email;
	
	private String phoneNumber;
	
	@JsonIgnore
	@CreationTimestamp
	private Date dateRegistered;
	
	@Embedded
	private Address address;
	
	@JsonIgnore
	private Boolean isDelete;
	
	@OneToMany(mappedBy = "customer")
	@JsonIgnore
	private List<Orders> orders;
	
	@OneToOne(mappedBy = "customers")
	@JsonIgnore
	private User user;

	@Override
	public String toString() {
		return "Customers [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", phoneNumber="
				+ phoneNumber + ", dateRegistered=" + dateRegistered + ", address=" + address.toString() ;
	}
	
}
