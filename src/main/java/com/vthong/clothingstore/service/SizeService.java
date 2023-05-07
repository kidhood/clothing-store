package com.vthong.clothingstore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vthong.clothingstore.entity.Size;
import com.vthong.clothingstore.repository.SizeRepository;

@Service
public class SizeService {
	
	@Autowired
	private SizeRepository sizeRepository;
	
	public List<Size> retrieveSizes(){
		return sizeRepository.findAll();
	}
}
