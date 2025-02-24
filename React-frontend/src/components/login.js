import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { CircularProgress, Button, Typography, Box } from '@mui/material';

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = useAuth();

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const { displayName, email, photoURL } = user;

            
            const userExistsResponse = await axios.get(`http://springboot-backend:8080/users/exists/${email}`);
            const userExists = userExistsResponse.data;

            if (!userExists) {
                
                const newUser = {
                    mailId: email,
                    name: displayName,
                    profilePictureLink: photoURL
                };
                await axios.post('http://springboot-backend:8080/users', newUser);
            }

            
            navigate('/chathistory', { state: { email } });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/chathistory" />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {loading ? (
                <CircularProgress />
            ) : (
                <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
                    Login with Google
                </Button>
            )}
        </Box>
    );
};

export default Login;