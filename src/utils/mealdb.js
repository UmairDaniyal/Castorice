import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Search recipes by name
export const searchRecipes = async (query) => {
    const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    return response.data;
};

// Get recipe details by ID
export const getRecipeById = async (id) => {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    return response.data;
};

// Filter recipes by area/cuisine
export const getRecipesByArea = async (area) => {
    const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
    return response.data;
};

// Get all categories
export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    return response.data;
};

// Filter recipes by category
export const getRecipesByCategory = async (category) => {
    const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
    return response.data;
};

// Get random recipe
export const getRandomRecipe = async () => {
    const response = await axios.get(`${BASE_URL}/random.php`);
    return response.data;
};
