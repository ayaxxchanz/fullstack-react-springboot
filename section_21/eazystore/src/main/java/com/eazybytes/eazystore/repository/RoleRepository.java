package com.eazybytes.eazystore.repository;

import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.entity.Role;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//@Repository // optional if use "extends JpaRepository"
public interface RoleRepository extends JpaRepository<Role, Long> {

    // ROLE_USER -> CACHE MISS -> DB call -> Cache Store (ROLE_USER -> Role record) -> Customer 1
    // ROLE_USER -> CACHE HIT -> Customer 2
    // ROLE_ADMIN -> CACHE MISS -> DB call -> Cache Store (ROLE_ADMIN -> Role record) -> Customer X
    @Cacheable("roles")
    Optional<Role> findByName(String name);
}
