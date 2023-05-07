package com.vthong.clothingstore.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Size {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sizeID;
	
	private String sizeName;
	
	private String description;
	
	@ManyToMany(mappedBy = "sizes")
	@JsonIgnore
	private List<AbtractProduct> product;
	
	@OneToOne(mappedBy = "size")
	@JsonIgnore
	private OrderDetails orderDetails;

	@Override
	public String toString() {
		return "Size [sizeID=" + sizeID + ", sizeName=" + sizeName + "]";
	}
	
	
}
