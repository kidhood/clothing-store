package com.vthong.clothingstore.model;

public record  CustomerModel (Long customersID,String firstName,String lastName,String email, String phoneNumber, AddressModel address) {}