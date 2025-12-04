import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import RecipeGrid from '../components/RecipeGrid';
import RecipeDetail from '../components/RecipeDetail';

const CookedList = () => {
    const { currentUser, login } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    useEffect(() => {
        const fetchCookedList = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            try {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setRecipes(userData.cooked || []);
                }
            } catch (error) {
                console.error("Error fetching cooked list:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCookedList();
    }, [currentUser]);

    const handleRecipeClick = (id) => {
        setSelectedRecipeId(id);
    };

    const closeDetail = () => {
        setSelectedRecipeId(null);
    };

    if (!currentUser) {
        return (
            <div className="welcome-state">
                <h2>Please login to view your cooked recipes.</h2>
                <button onClick={login} className="login-btn" style={{ marginTop: '20px' }}>
                    Login with Google
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <header className="app-header">
                <h1>Cooked Recipes</h1>
                <p>A collection of dishes you've mastered.</p>
            </header>

            {loading ? (
                <div className="loading">Loading cooked list...</div>
            ) : recipes.length > 0 ? (
                <RecipeGrid recipes={recipes} onRecipeClick={handleRecipeClick} />
            ) : (
                <div className="empty-state">
                    <h3>You haven't marked any recipes as cooked yet.</h3>
                    <p>Get cooking and track your culinary journey!</p>
                </div>
            )}

            {selectedRecipeId && (
                <RecipeDetail id={selectedRecipeId} onClose={closeDetail} />
            )}
        </motion.div>
    );
};

export default CookedList;
