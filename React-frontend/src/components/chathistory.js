import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import {
    AppBar,
    Toolbar,
    Avatar,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
    Container,
    Box,
    IconButton,
    Paper,
    Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import Chat from './chat';

const ChatHistory = () => {
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || auth.currentUser?.email;

    useEffect(() => {
        if (email) {
            
            axios.get(`http://localhost:8080/chats/user/${email}`)
                .then(response => {
                    setChats(response.data);
                })
                .catch(error => {
                    console.error('Error fetching chats:', error);
                });

            
            axios.get(`http://localhost:8080/users/${email}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user information:', error);
                });
        }
    }, [email]);

    const handleChatClick = (chatId) => {
        
        setSelectedChatId(chatId);
    };

    const handleCreateChat = () => {
        
        const newChat = {
            name: null,
            messages: []
        };

        axios.post(`http://localhost:8080/chats/${email}`, newChat)
            .then(response => {
                const newChatId = response.data.id;
                setSelectedChatId(newChatId);
            })
            .catch(error => {
                console.error('Error creating new chat:', error);
            });
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        });
    };

    return (
        <Container maxWidth="lg">
            <AppBar position="static">
                <Toolbar>
                    {user && (
                        <>
                            <Avatar src={user.profilePictureLink} alt="Profile" />
                            <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 2 }}>
                                {user.name}
                            </Typography>
                        </>
                    )}
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ marginTop: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant="h4" gutterBottom>
                            Chat History
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleCreateChat}
                            sx={{ marginBottom: 2 }}
                        >
                            New Chat
                        </Button>
                        <Paper elevation={3}>
                            <List>
                                {chats.map(chat => (
                                    <ListItem button key={chat.id} onClick={() => handleChatClick(chat.id)}>
                                        <ListItemText primary={chat.name || 'Unnamed Chat'} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        {selectedChatId ? (
                            <Chat chatId={selectedChatId} email={email} />
                        ) : (
                            <Typography variant="h6" color="textSecondary">
                                Select a chat to start messaging
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ChatHistory;