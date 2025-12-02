import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import RecipeGrid from '../components/RecipeGrid';
import RecipeDetail from '../components/RecipeDetail';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [featuredRecipes, setFeaturedRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        // Fetch some random featured recipes on load
        const fetchFeatured = async () => {
            try {
                // Fetching 8 random recipes by calling random endpoint multiple times or a specific category
                // Since random endpoint returns 1, let's fetch 'Seafood' as featured for now to be efficient
                const response = await axios.get('http://localhost:3000/api/recipes/area/Italian');
                if (response.data.meals) {
                    setFeaturedRecipes(response.data.meals.slice(0, 8));
                }
            } catch (err) {
                console.error("Failed to fetch featured recipes");
            }
        };
        fetchFeatured();
    }, []);

    const searchRecipes = async (query) => {
        setLoading(true);
        setError(null);
        setHasSearched(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/recipes/search?q=${query}`);
            setRecipes(response.data.meals || []);
        } catch (err) {
            setError('Failed to fetch recipes. Please try again.');
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRecipeClick = (id) => {
        setSelectedRecipeId(id);
    };

    const closeDetail = () => {
        setSelectedRecipeId(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <header className="app-header">
                <h1>Castorice</h1>
                <p>Discover delicious recipes with a simple search.</p>
            </header>

            <main>
                <SearchBar onSearch={searchRecipes} />

                {loading && <div className="loading">Searching...</div>}
                {error && <div className="error">{error}</div>}

                {!loading && !error && hasSearched && (
                    <>
                        <h2 style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '2rem' }}>Search Results</h2>
                        <RecipeGrid recipes={recipes} onRecipeClick={handleRecipeClick} />
                        {recipes.length === 0 && <div className="empty-state">No recipes found. Try a different ingredient!</div>}
                    </>
                )}

                {!hasSearched && featuredRecipes.length > 0 && (
                    <div className="featured-section">
                        <h2 style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '2rem' }}>Featured Italian Recipes</h2>
                        <RecipeGrid recipes={featuredRecipes} onRecipeClick={handleRecipeClick} />
                    </div>
                )}
            </main>

            {selectedRecipeId && (
                <RecipeDetail id={selectedRecipeId} onClose={closeDetail} />
            )}
        </motion.div>
    );
};

export default Home;
