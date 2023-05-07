package com.vthong.clothingstore.entity;

import java.sql.Date;

import com.vthong.clothingstore.enums.OrderStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Orders {
	@Id
	@GeneratedValue
	private Long orderId;
	
	@ManyToOne
	@JoinColumn(name = "CUSTOMER_ID")
	private Customers customer;
	
	private Date orderDate;
	
	private double totalPrice;
	
	private String boughtAddress;
	
	private String recieveAddress;
	
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
	private Boolean isDelete;
	
	@OneToOne(mappedBy = "order")
	private OrderDetails orderDetail;
}	
