// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import App from './App';
import Card from './Card'; // Import the Card component

// Get the root element
const rootElement = document.getElementById('root');

// Create a root instance
const root = createRoot(rootElement);

// Render your app inside the root
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Route for Home Page */}
        <Route path="/" element={<Home />} />
        {/* Route for App Page */}
        <Route path="/app" element={<App />} />
        {/* Route for Card Page */}
        <Route path="/card" element={<Card />} />
      </Routes>
    </Router>
  </React.StrictMode>
);