package com.desafio.service;

import com.desafio.entity.User;
import com.desafio.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void softDeleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        user.ifPresent(u -> {
            u.setActive(false);
            u.setDeletedAt(LocalDateTime.now()); 
            userRepository.save(u);
        });
    }
}