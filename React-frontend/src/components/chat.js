import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography, Box, Paper } from '@mui/material';

const Chat = ({ chatId, email }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatName, setChatName] = useState('Untitled Chat');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (chatId) {
            
            axios.get(`http://springboot-backend:8080/chats/${chatId}`)
                .then(response => {
                    setMessages(response.data.messages || []);
                    setChatName(response.data.name || 'Untitled Chat');
                })
                .catch(error => {
                    console.error('Error fetching chat messages:', error);
                });
        }
    }, [chatId]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = {
            sender: 'user',
            content: input,
            timestamp: new Date().toISOString()
        };

        
        axios.put(`http://springboot-backend:8080/chats/${chatId}/messages`, userMessage)
            .then(response => {
                setMessages([...messages, userMessage]);
                setLoading(true);

                
                axios.post('http://python-backend:5000/chat', { message: input })
                    .then(apiResponse => {
                        const aiMessage = {
                            sender: 'ai',
                            content: apiResponse.data.response,
                            timestamp: new Date().toISOString()
                        };

                        
                        axios.put(`http://springboot-backend:8080/chats/${chatId}/messages`, aiMessage)
                            .then(() => {
                                setMessages(prevMessages => [...prevMessages, aiMessage]);
                                setLoading(false);
                            })
                            .catch(error => {
                                console.error('Error adding AI message to chat:', error);
                                setLoading(false);
                            });
                    })
                    .catch(error => {
                        console.error('Error getting AI response:', error);
                        setLoading(false);
                    });
            })
            .catch(error => {
                console.error('Error adding user message to chat:', error);
            });

        setInput('');
    };

    const handleChatNameChange = (e) => {
        setChatName(e.target.value);
    };

    const handleChatNameBlur = () => {
        
        axios.put(`http://springboot-backend:8080/chats/${chatId}`, { name: chatName })
            .catch(error => {
                console.error('Error updating chat name:', error);
            });
    };

    const formatMessageContent = (content) => {
        
        const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return { __html: formattedContent };
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Chat
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                value={chatName}
                onChange={handleChatNameChange}
                onBlur={handleChatNameBlur}
                placeholder="Enter chat name"
                sx={{ marginBottom: 2 }}
            />
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, maxHeight: '60vh', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <Typography variant="caption" color="textSecondary">
                            {formatTimestamp(message.timestamp)}
                        </Typography>
                        <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={formatMessageContent(message.content)}
                            sx={{ whiteSpace: 'pre-wrap' }}
                        />
                    </Box>
                ))}
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                        <CircularProgress />
                    </Box>
                )}
            </Paper>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    sx={{ marginRight: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSend}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;