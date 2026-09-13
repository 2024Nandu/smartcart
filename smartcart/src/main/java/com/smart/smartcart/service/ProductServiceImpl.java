package com.smart.smartcart.service;

import com.smart.smartcart.model.Product;
import com.smart.smartcart.repository.ProductRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final RedisTemplate<String, Product> redisTemplate;

    private static final String PRODUCT_CACHE_PREFIX = "product:";

    public ProductServiceImpl(
            ProductRepository productRepository,
            RedisTemplate<String, Product> redisTemplate) {

        this.productRepository = productRepository;
        this.redisTemplate = redisTemplate;
    }

    // =========================
    // CREATE PRODUCT
    // =========================

    @Override
    public Product createProduct(Product product) {

        Product savedProduct = productRepository.save(product);

        String key = PRODUCT_CACHE_PREFIX + savedProduct.getId();

        redisTemplate.opsForValue().set(
                key,
                savedProduct,
                10,
                TimeUnit.MINUTES
        );

        return savedProduct;
    }


    // =========================
    // GET PRODUCT BY ID
    // =========================

    @Override
    public Product getProductById(Long id) {

        String key = PRODUCT_CACHE_PREFIX + id;

        // Check Redis first
        Product cachedProduct =
                redisTemplate.opsForValue().get(key);

        if (cachedProduct != null) {

            System.out.println(
                    "Product found in Redis cache"
            );

            return cachedProduct;
        }

        // If not in Redis, get from PostgreSQL
        System.out.println(
                "Product found in PostgreSQL"
        );

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id: " + id
                        )
                );

        // Store product in Redis
        redisTemplate.opsForValue().set(
                key,
                product,
                10,
                TimeUnit.MINUTES
        );

        return product;
    }


    // =========================
    // GET ALL PRODUCTS
    // =========================

    @Override
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }


    // =========================
    // UPDATE PRODUCT
    // =========================

    @Override
    public Product updateProduct(
            Long id,
            Product product) {

        Product existingProduct =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found with id: "
                                                + id
                                )
                        );

        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());

        Product updatedProduct =
                productRepository.save(existingProduct);

        // Update Redis cache
        String key = PRODUCT_CACHE_PREFIX + id;

        redisTemplate.opsForValue().set(
                key,
                updatedProduct,
                10,
                TimeUnit.MINUTES
        );

        return updatedProduct;
    }


    // =========================
    // DELETE PRODUCT
    // =========================

    @Override
    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {

            throw new RuntimeException(
                    "Product not found with id: " + id
            );
        }

        productRepository.deleteById(id);

        // Remove from Redis
        String key = PRODUCT_CACHE_PREFIX + id;

        redisTemplate.delete(key);
    }
}