package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean userExists(String mailId) {
        return userRepository.existsByMailId(mailId);
    }

    public User getUserByMailId(String mailId) {
        return userRepository.findByMailId(mailId);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }
}
