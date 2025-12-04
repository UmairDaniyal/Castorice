import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cuisine from './pages/Cuisine';
import About from './pages/About';
import Categories from './pages/Categories';
import CategoryRecipes from './pages/CategoryRecipes';
import Wishlist from './pages/Wishlist';
import CookedList from './pages/CookedList';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/category/:type" element={<CategoryRecipes />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cooked" element={<CookedList />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
