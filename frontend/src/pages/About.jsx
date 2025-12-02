import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.div
            className="about-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <header className="app-header">
                <h1>About Castorice</h1>
                <p>Your culinary journey starts here.</p>
            </header>

            <div className="about-content">
                <motion.section
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2>Our Mission</h2>
                    <p>
                        At Castorice, we believe that cooking should be an accessible, enjoyable, and creative experience for everyone.
                        Our mission is to connect food lovers with a diverse range of recipes from around the globe,
                        making it easy to discover new flavors and master the art of home cooking.
                    </p>
                </motion.section>

                <motion.section
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2>Why Castorice?</h2>
                    <ul>
                        <li><strong>Global Flavors:</strong> Explore cuisines from every corner of the world.</li>
                        <li><strong>Simple & Intuitive:</strong> A minimalist design that puts the food first.</li>
                        <li><strong>Community Driven:</strong> Built for foodies, by foodies.</li>
                    </ul>
                </motion.section>

                <motion.section
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="team-section"
                >
                    <h2>Meet the Team</h2>
                    <p>
                        Castorice is brought to you by a passionate team of developers and designers who love good food as much as clean code.
                    </p>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default About;
