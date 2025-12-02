import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import RecipeGrid from '../components/RecipeGrid';
import RecipeDetail from '../components/RecipeDetail';

const Wishlist = () => {
    const { currentUser, login } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            try {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setRecipes(userData.wishlist || []);
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [currentUser]);

    const handleRecipeClick = (id) => {
        setSelectedRecipeId(id);
    };

    const closeDetail = () => {
        setSelectedRecipeId(null);
        // Refresh list in case item was removed
        // In a real app, we might want to update local state directly for better UX
    };

    if (!currentUser) {
        return (
            <div className="welcome-state">
                <h2>Please login to view your wishlist.</h2>
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
                <h1>My Wishlist</h1>
                <p>Your favorite recipes saved for later.</p>
            </header>

            {loading ? (
                <div className="loading">Loading wishlist...</div>
            ) : recipes.length > 0 ? (
                <RecipeGrid recipes={recipes} onRecipeClick={handleRecipeClick} />
            ) : (
                <div className="empty-state">
                    <h3>Your wishlist is empty.</h3>
                    <p>Start exploring and save recipes you love!</p>
                </div>
            )}

            {selectedRecipeId && (
                <RecipeDetail id={selectedRecipeId} onClose={closeDetail} />
            )}
        </motion.div>
    );
};

export default Wishlist;
