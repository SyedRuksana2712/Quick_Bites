import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Login Handler
  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  // SignUp Handler
  const handleSignUp = (username) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  // Logout Handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        user={user} 
        handleLogout={handleLogout} 
      />
      <Routes>
        {/* Protected Routes: Redirect to Login if User is NOT Logged In */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/restaurant/:id" element={user ? <RestaurantDetails addToCart={addToCart} /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <CartPage cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /> : <Navigate to="/login" />} />

        {/* Public Routes: Accessible to Everyone */}
        <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUpPage onSignUp={handleSignUp} />} />
      </Routes>
    </Router>
  );
}

export default App;
