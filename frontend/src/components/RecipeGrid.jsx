import React from 'react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const RecipeGrid = ({ recipes, onRecipeClick }) => {
    if (!recipes) {
        return <div className="empty-state">No recipes found. Try searching for something else!</div>;
    }

    return (
        <motion.div
            className="recipe-grid"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {recipes.map((recipe) => (
                <motion.div
                    key={recipe.idMeal}
                    className="recipe-card"
                    onClick={() => onRecipeClick(recipe.idMeal)}
                    variants={item}
                    whileHover={{ y: -10 }}
                >
                    <div className="recipe-image-container">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
                    </div>
                    <div className="recipe-info">
                        <h3 className="recipe-title">{recipe.strMeal}</h3>
                        <span className="recipe-category">{recipe.strCategory}</span>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default RecipeGrid;
