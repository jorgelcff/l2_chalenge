package com.desafio.service;


import com.desafio.entity.Contact;
import com.desafio.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public void softDeleteContact(Long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        contact.ifPresent(c -> {
            c.setActive(false);
            c.setDeletedAt(LocalDateTime.now());
            contactRepository.save(c);
        });
    }
}
