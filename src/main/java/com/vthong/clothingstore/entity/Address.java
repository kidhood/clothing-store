package com.vthong.clothingstore.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToOne;
import jakarta.persistence.criteria.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
@NoArgsConstructor

@Embeddable
public class Address {
	private String line;
	private String city;
	private String country;
	
	
}
