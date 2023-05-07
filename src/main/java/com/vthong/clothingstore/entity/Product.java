package com.vthong.clothingstore.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vthong.clothingstore.service.IDoDiscount;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@Entity
public class Product extends AbtractProduct{
	
	public Product(Long productID, String productName, String description, double buyPrice, double sellPrice,
			String imageUrl, Categories category, List<Size> sizes) {
		super(productID, productName, description, buyPrice, sellPrice, imageUrl, category, sizes);
		// TODO Auto-generated constructor stub
	}
	
	public Product() {
		super();
		
	}

	
	@OneToOne(mappedBy = "product")
	@JsonIgnore
	private OrderDetails orderDetails;
	
	
	
	public double getPromotePrice() {
		return getSellPrice();
	}



	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return super.toString();
	}




	
	
	
}
