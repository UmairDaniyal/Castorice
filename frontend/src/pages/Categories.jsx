import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/categories');
                setCategories(response.data.categories || []);
                setLoading(false);
            } catch (err) {
                setError('Failed to load categories.');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <header className="app-header">
                <h1>Categories</h1>
                <p>Browse recipes by category.</p>
            </header>

            {loading && <div className="loading">Loading categories...</div>}
            {error && <div className="error">{error}</div>}

            {!loading && !error && (
                <motion.div
                    className="categories-grid"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {categories.map((cat) => (
                        <motion.div
                            key={cat.idCategory}
                            className="category-card"
                            variants={item}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Link to={`/category/${cat.strCategory}`} className="category-link">
                                <img src={cat.strCategoryThumb} alt={cat.strCategory} className="category-image" />
                                <h3 className="category-title">{cat.strCategory}</h3>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Categories;
