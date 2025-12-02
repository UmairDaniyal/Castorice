const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Search recipes
app.get('/api/recipes/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Query parameter "q" is required' });
        }
        const response = await axios.get(`${BASE_URL}/search.php?s=${q}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

// Get recipe details
app.get('/api/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipe details:', error.message);
        res.status(500).json({ error: 'Failed to fetch recipe details' });
    }
});

// Filter by area
app.get('/api/recipes/area/:area', async (req, res) => {
    try {
        const { area } = req.params;
        const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipes by area:', error.message);
        res.status(500).json({ error: 'Failed to fetch recipes by area' });
    }
});

// Get random recipe
app.get('/api/recipes/random', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/random.php`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching random recipe:', error.message);
        res.status(500).json({ error: 'Failed to fetch random recipe' });
    }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories.php`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Filter by category
app.get('/api/recipes/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipes by category:', error.message);
        res.status(500).json({ error: 'Failed to fetch recipes by category' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
