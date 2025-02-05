import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot instead of ReactDOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import App from './App';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root instance
const root = createRoot(rootElement);

// Render your app inside the root
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);