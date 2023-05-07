package com.vthong.clothingstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vthong.clothingstore.entity.Size;
import com.vthong.clothingstore.service.SizeService;

@RestController
public class SizeController {
	
	@Autowired
	private SizeService sizeService;
	
	@GetMapping("sizes")
	public List<Size> retrieveSizes(){
		return sizeService.retrieveSizes();
	}
}
