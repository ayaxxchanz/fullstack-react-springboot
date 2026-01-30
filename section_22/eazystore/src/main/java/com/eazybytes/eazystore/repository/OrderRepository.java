package com.eazybytes.eazystore.repository;

import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    /*
        Fetch orders for a customer, sorted by creation date in descending order.
    */
    List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer);

    List<Order> findByOrderStatus(String orderStatus);

    // Custom queries example 1 using JPQL (method name must not follow JPA standard)
    @Query("SELECT o FROM Order o WHERE o.customer=:customer ORDER BY createdAt DESC") // customer and createdAt are table and field names inside Order entity
    List<Order> findOrdersByCustomer(@Param("customer") Customer customer); // the field inside @Param must same with "=:customer"(dynamic variable) in the SQL

    // Custom queries example 2 using JPQL (method name must not follow JPA standard)
    @Query("SELECT o FROM Order o WHERE o.orderStatus=?1") // "?1" means the first parameter in the method below will be used. You can have multiple numbers if there are multiple parameters
    List<Order> findOrdersByStatus(String orderStatus);

    // Custom queries example 3 using Native SQL (method name must not follow JPA standard)
    @Query(value = "SELECT * FROM orders o WHERE o.customer_id=:customerId ORDER BY created_at DESC", nativeQuery = true) // use real table and columns names and full name of field for dynamic variable
    List<Order> findOrdersByCustomerWithNativeQuery(@Param("customerId") Long customerId); // use Long because that's how it stored in the entity

    // Custom queries example 4 using Native SQL (method name must not follow JPA standard)
    @Query(value = "SELECT * FROM orders o WHERE o.order_status=?1", nativeQuery = true) // Usage of "?1" is same as JPQL
    List<Order> findOrdersByStatusWithNativeQuery(String orderStatus);

    // Custom query with JPQL to update data. This method is better for performance than using JPA because JPA will use 2 queries
    @Transactional // success all or fail all (more info in lecture 299). if fail, rollback all
    @Modifying // to tell Spring that this Query will modify the data
    @Query("UPDATE Order o SET o.orderStatus=?2, o.updatedAt=CURRENT_TIMESTAMP, o.updatedBy=?3 WHERE o.orderId=?1") // or you can use "=:orderStatus" and "=:orderId" with @Param. Manually update the updatedAt and updatedBy because JPA Audit doesn't work for direct update query
    int updateOrderStatus(Long orderId, String orderStatus, String updatedBy); // will return number of row updated if using "int". Can also use void
}
