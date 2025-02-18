package com.example.demo.service;

import com.example.demo.entity.Chat;
import com.example.demo.entity.Message;
import com.example.demo.entity.User;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    public Chat createChat(Chat chat, String userMailId) {
        User user = userRepository.findByMailId(userMailId);
        chat.setUser(user);
        return chatRepository.save(chat);
    }

    public Chat addMessageToChat(Long chatId, Message message) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
        chat.getMessages().add(message);
        return chatRepository.save(chat);
    }

    public Chat updateChatName(Long chatId, String name) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
        chat.setName(name);
        return chatRepository.save(chat);
    }

    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }

    public Chat getChatById(Long chatId) {
        return chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
    }

    public List<Chat> getChatsByUser(String userMailId) {
        User user = userRepository.findByMailId(userMailId);
        return chatRepository.findByUser(user);
    }
}
