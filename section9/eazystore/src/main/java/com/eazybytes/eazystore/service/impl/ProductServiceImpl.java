package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.ProductDto;
import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;

    // without using DTO
//    @Override
//    public List<Product> getProducts() {
//        return productRepository.findAll();
//    }

    // using DTO
    @Override
    public List<ProductDto> getProducts() {
        return productRepository.findAll()
                .stream().map(this::transformToDto)
                .collect(Collectors.toList());
    }

    // transform entity to Dto to show only certain data not all
    private ProductDto transformToDto(Product product) {
        ProductDto productDto = new ProductDto();
        // automatically map the field name
        BeanUtils.copyProperties(product, productDto);
        productDto.setProductId(product.getId()); // manually map because the entity is using "id" instead of "productId"
        return productDto;
    }
}
