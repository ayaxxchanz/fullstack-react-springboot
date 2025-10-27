package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ProductDto;
import com.eazybytes.eazystore.entity.Product;
// import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor // with this, we don't need to create constructor for ProductRepository
//@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    // not a good practice by directly using repository in controller
    // public final ProductRepository productRepository;

//    @GetMapping
//    public String getProducts() {
//        return "Here are your products";
//    }

    public final IProductService iProductService;

    // without using DTO
//    @GetMapping
//    public List<Product> getProducts() {
//        return iProductService.getProducts();
//    }

    // using DTO
    @GetMapping
    public List<ProductDto> getProducts() throws InterruptedException {
        //Thread.sleep(3000);
        return iProductService.getProducts();
    }
}
