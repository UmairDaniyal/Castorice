import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecipeGrid from '../components/RecipeGrid';
import RecipeDetail from '../components/RecipeDetail';
import { getRecipesByCategory } from '../utils/mealdb';

const CategoryRecipes = () => {
    const { type } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryRecipes = async () => {
            setLoading(true);
            try {
                const data = await getRecipesByCategory(type);
                setRecipes(data.meals || []);
                setLoading(false);
            } catch (err) {
                setError(`Failed to load ${type} recipes.`);
                setLoading(false);
            }
        };

        fetchCategoryRecipes();
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
                <h1>{type} Recipes</h1>
                <p>Explore our collection of {type} dishes.</p>
            </header>

            <main>
                {loading && <div className="loading">Loading {type} recipes...</div>}
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

export default CategoryRecipes;
