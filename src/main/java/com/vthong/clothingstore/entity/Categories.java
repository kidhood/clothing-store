package com.vthong.clothingstore.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Categories {
	@Id
	@GeneratedValue
	private int categoryID;
	private String categoryName;
	
//	@OneToOne(mappedBy = "category")
	@OneToMany (mappedBy = "category")
	@JsonIgnore
	private List<AbtractProduct> products;

	@Override
	public String toString() {
		return "Categories [categoryID=" + categoryID + ", categoryName=" + categoryName + "]";
	}
	
	
}
