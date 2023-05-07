package com.vthong.clothingstore.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor

@Entity(name = "Products")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="ProductType")
public abstract class AbtractProduct implements IProduct{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productID;
	
	private String productName;
	
	private String description;
	
	private double buyPrice;
	
	private double sellPrice;
	
	private String imageUrl;
	
	@ManyToOne
	@JoinColumn(name = "CATEGORY_ID")
	private Categories category;
	
	@ManyToMany
	@JoinTable(name = "PRODUCTS_SIZES",
			joinColumns = @JoinColumn(name="PRODUCT_ID"),
			inverseJoinColumns = @JoinColumn(name="SIZE_ID"))
	private List<Size> sizes;
	
	@Override
	public long getID() {
		// TODO Auto-generated method stub
		return productID;
	}

	@Override
	public String toString() {
		return "AbtractProduct [productID=" + productID + ", productName=" + productName + ", description="
				+ description + ", buyPrice=" + buyPrice + ", sellPrice=" + sellPrice + ", imageUrl=" + imageUrl
				+ ", sizes=" + sizes.toString() + "]";
	}


	
	
}
