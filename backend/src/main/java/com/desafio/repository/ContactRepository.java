package com.desafio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desafio.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    Optional<Contact> findByContactEmail(String email);
    List<Contact> findAllByUserIdAndActiveTrueAndDeletedAtIsNull(Long userId);
  
}
