package com.eazybytes.eazystore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "customers")
public class Customer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Size(max = 100)
    @NotNull
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Size(max = 100)
    @NotNull
    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Size(max = 15)
    @NotNull
    @Column(name = "mobile_number", nullable = false, length = 15)
    private String mobileNumber;

    @Size(max = 500)
    @NotNull
    @Column(name = "password_hash", nullable = false, length = 500)
    private String passwordHash;

    @OneToOne(mappedBy = "customer",cascade = CascadeType.ALL)
    private Address address;

    @ManyToMany(fetch = FetchType.EAGER) // no cascade configuration explanation on lecture 303
    @JoinTable(name = "customer_roles", // the intermediate table name
            joinColumns = @JoinColumn(name = "customer_id"), // the PK of this entity as the column name inside the intermediate table
            inverseJoinColumns = @JoinColumn(name = "role_id") // the PK of the joining table as the column name inside the intermediate table
    )
    private Set<Role> roles = new LinkedHashSet<>();
}