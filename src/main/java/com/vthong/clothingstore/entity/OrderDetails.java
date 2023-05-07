package com.vthong.clothingstore.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
@Entity
public class OrderDetails {
	@Id
	@GeneratedValue
	private Long orderDetail;
	
	@OneToOne
	@JoinColumn(name = "ORDER_ID")
	private Orders order;
	
	@OneToOne
	@JoinColumn(name = "PRODUCT_ID")
	private Product product;
	
	private int quantity;
	
	private double price;
	
	@OneToOne
	@JoinColumn(name ="SIZE_ID")
	private Size size;
}
