package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/exists/{mailId}")
    public boolean userExists(@PathVariable String mailId) {
        return userService.userExists(mailId);
    }

    @GetMapping("/{mailId}")
    public User getUser(@PathVariable String mailId) {
        return userService.getUserByMailId(mailId);
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }
}