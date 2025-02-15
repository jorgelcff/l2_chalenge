package com.desafio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desafio.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsuarioEmail(String email);

    List<User> findAllByActiveTrueAndDeletedAtIsNull();

    Optional<User> findByUsername(String username);
}