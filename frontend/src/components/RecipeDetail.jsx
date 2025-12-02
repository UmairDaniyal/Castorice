import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from 'firebase/firestore';

const RecipeDetail = ({ id, onClose }) => {
    const { currentUser, login } = useAuth();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isCooked, setIsCooked] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/recipes/${id}`);
                setRecipe(response.data.meals[0]);
                setLoading(false);
            } catch (err) {
                setError('Failed to load recipe details');
                setLoading(false);
            }
        };

        if (id) {
            fetchRecipe();
        }
    }, [id]);

    useEffect(() => {
        const checkUserLists = async () => {
            if (!currentUser || !recipe) return;

            try {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    const wishlist = data.wishlist || [];
                    const cooked = data.cooked || [];

                    setIsWishlisted(wishlist.some(item => item.idMeal === recipe.idMeal));
                    setIsCooked(cooked.some(item => item.idMeal === recipe.idMeal));
                }
            } catch (error) {
                console.error("Error checking user lists:", error);
            }
        };

        checkUserLists();
    }, [currentUser, recipe]);

    const handleAuthAction = async (action) => {
        if (!currentUser) {
            const shouldLogin = window.confirm("You need to login to use this feature. Login with Google now?");
            if (shouldLogin) {
                try {
                    await login();
                } catch (error) {
                    console.error("Login failed from modal:", error);
                }
            }
            return;
        }
        await action();
    };

    const toggleWishlist = () => handleAuthAction(async () => {
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await setDoc(userDocRef, { email: currentUser.email }, { merge: true });

            // Sanitize recipe object to remove undefined values
            const cleanRecipe = JSON.parse(JSON.stringify(recipe));

            if (isWishlisted) {
                await updateDoc(userDocRef, { wishlist: arrayRemove(cleanRecipe) });
                setIsWishlisted(false);
            } else {
                await updateDoc(userDocRef, { wishlist: arrayUnion(cleanRecipe) });
                setIsWishlisted(true);
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    });

    const toggleCooked = () => handleAuthAction(async () => {
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await setDoc(userDocRef, { email: currentUser.email }, { merge: true });

            // Sanitize recipe object
            const cleanRecipe = JSON.parse(JSON.stringify(recipe));

            if (isCooked) {
                await updateDoc(userDocRef, { cooked: arrayRemove(cleanRecipe) });
                setIsCooked(false);
            } else {
                await updateDoc(userDocRef, { cooked: arrayUnion(cleanRecipe) });
                setIsCooked(true);
            }
        } catch (error) {
            console.error("Error updating cooked list:", error);
        }
    });

    if (loading) return <div className="modal-overlay"><div className="modal-content">Loading...</div></div>;
    if (error) return <div className="modal-overlay"><div className="modal-content">{error} <button onClick={onClose}>Close</button></div></div>;
    if (!recipe) return null;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`] && recipe[`strIngredient${i}`].trim() !== "") {
            ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
        }
    }

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    const youtubeEmbedUrl = getYoutubeEmbedUrl(recipe.strYoutube);

    return (
        <motion.div
            className="modal-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="modal-content"
                onClick={e => e.stopPropagation()}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="modal-header">
                    <h2>{recipe.strMeal}</h2>
                    <div className="header-actions">
                        <span className="category-tag">{recipe.strCategory} | {recipe.strArea}</span>
                        <div className="action-buttons">
                            <button
                                className={`action-btn ${isWishlisted ? 'active' : ''}`}
                                onClick={toggleWishlist}
                            >
                                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>
                            <button
                                className={`action-btn ${isCooked ? 'active' : ''}`}
                                onClick={toggleCooked}
                            >
                                {isCooked ? 'Mark as Uncooked' : 'Mark as Cooked'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="modal-body">
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} className="detail-image" />
                    <div className="ingredients-section">
                        <h3>Ingredients</h3>
                        <ul>
                            {ingredients.map((ing, index) => (
                                <li key={index}>{ing}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="instructions-section">
                        <h3>Instructions</h3>
                        <p>{recipe.strInstructions}</p>
                    </div>
                    {youtubeEmbedUrl && (
                        <div className="video-section">
                            <h3>Video Tutorial</h3>
                            <div className="video-container">
                                <iframe
                                    src={youtubeEmbedUrl}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default RecipeDetail;
