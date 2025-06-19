import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecipeGeneratorPage from './pages/RecipeGeneratorPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import ProfilePage from './pages/ProfilePage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ minHeight: '80vh', py: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/generator" element={<RecipeGeneratorPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/saved-recipes" element={<SavedRecipesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;