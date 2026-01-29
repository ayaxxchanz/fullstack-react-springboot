package com.eazybytes.eazystore.repository;

import com.eazybytes.eazystore.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

//@Repository // optional if use "extends JpaRepository"
public interface ContactRepository extends JpaRepository<Contact, Long> {

    // the query defined inside Contact entity will be invoked
    List<Contact> findByStatus(String status);

    // the query defined inside Contact entity will be invoked
    List<Contact> findByStatusWithNativeQuery(String status);

    // in case you want to use different method name here and call the one inside Entity
    @Query(name = "Contact.findByStatusWithNativeQuery")
    List<Contact> fetchByStatus(String status);
}
