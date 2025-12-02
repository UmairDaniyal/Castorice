import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecipeGrid from '../components/RecipeGrid';
import RecipeDetail from '../components/RecipeDetail';

const Cuisine = () => {
    const { type } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCuisine = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/recipes/area/${type}`);
                setRecipes(response.data.meals || []);
                setLoading(false);
            } catch (err) {
                setError(`Failed to load ${type} cuisine.`);
                setLoading(false);
            }
        };

        fetchCuisine();
    }, [type]);

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
                <h1>{type} Cuisine</h1>
                <p>Explore the best {type} dishes.</p>
            </header>

            <main>
                {loading && <div className="loading">Loading delicious {type} recipes...</div>}
                {error && <div className="error">{error}</div>}

                {!loading && !error && (
                    <RecipeGrid recipes={recipes} onRecipeClick={handleRecipeClick} />
                )}
            </main>

            {selectedRecipeId && (
                <RecipeDetail id={selectedRecipeId} onClose={closeDetail} />
            )}
        </motion.div>
    );
};

export default Cuisine;
