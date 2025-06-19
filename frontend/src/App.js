import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CssBaseline, Container } from '@mui/material';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import RecipeGeneratorPage from './pages/RecipeGeneratorPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if protected route is accessed without being logged in
  useEffect(() => {
    const protectedRoutes = ['/profile', '/saved-recipes'];
    
    if (!user && protectedRoutes.some(route => location.pathname.startsWith(route))) {
      navigate('/login');
    }
  }, [user, location, navigate]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generator" element={<RecipeGeneratorPage />} />
              <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
              <Route path="/saved-recipes" element={<SavedRecipesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </Box>
        
        <Footer />
      </Box>
    </>
  );
}

export default App;