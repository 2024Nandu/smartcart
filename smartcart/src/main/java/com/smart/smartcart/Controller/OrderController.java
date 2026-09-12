package com.smart.smartcart.controller;

import com.smart.smartcart.model.Order;
import com.smart.smartcart.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody Order order
    ) {

        Order savedOrder = orderRepository.save(order);

        return ResponseEntity.ok(savedOrder);
    }
}