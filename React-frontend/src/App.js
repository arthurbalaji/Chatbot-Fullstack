import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChatHistory from './components/chathistory';
import Login from './components/login';

import { auth } from './firebase';

const PrivateRoute = ({ element: Component, ...rest }) => {
    return auth.currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/chathistory" element={<PrivateRoute element={ChatHistory} />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;