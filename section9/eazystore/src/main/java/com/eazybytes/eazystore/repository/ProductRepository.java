package com.eazybytes.eazystore.repository;

import com.eazybytes.eazystore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // optional if use "extends JpaRepository"
public interface ProductRepository extends JpaRepository<Product, Long> {
}
