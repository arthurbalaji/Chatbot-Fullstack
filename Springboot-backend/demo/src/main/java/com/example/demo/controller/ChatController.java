package com.example.demo.controller;

import com.example.demo.entity.Chat;
import com.example.demo.entity.Message;
import com.example.demo.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/{userMailId}")
    public Chat createChat(@RequestBody Chat chat, @PathVariable String userMailId) {
        return chatService.createChat(chat, userMailId);
    }

    @PutMapping("/{chatId}/messages")
    public Chat addMessageToChat(@PathVariable Long chatId, @RequestBody Message message) {
        return chatService.addMessageToChat(chatId, message);
    }

    @PutMapping("/{chatId}")
    public Chat updateChatName(@PathVariable Long chatId, @RequestBody Chat chat) {
        return chatService.updateChatName(chatId, chat.getName());
    }

    @GetMapping
    public List<Chat> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/{chatId}")
    public Chat getChatById(@PathVariable Long chatId) {
        return chatService.getChatById(chatId);
    }

    @GetMapping("/user/{userMailId}")
    public List<Chat> getChatsByUser(@PathVariable String userMailId) {
        return chatService.getChatsByUser(userMailId);
    }
}
