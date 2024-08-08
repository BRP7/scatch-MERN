import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import ThemeSwitcher from './components/ThemeSwiter';
import './index.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <ThemeSwitcher />
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
