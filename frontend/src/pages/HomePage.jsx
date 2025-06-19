import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EcoIcon from '@mui/icons-material/Eco';

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        className="recipe-hero"
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?cooking)',
          mb: 6,
        }}
      >
        <Box className="recipe-hero-content">
          <Typography variant="h2" component="h1" gutterBottom>
            AI-Powered Recipe Generator
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Turn your available ingredients into delicious meals
          </Typography>
          <Button
            component={RouterLink}
            to="/generator"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ fontWeight: 'bold', px: 4, py: 1.5 }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container>
        <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 6 }}>
          How It Works
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <RestaurantIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                  Enter Ingredients
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Tell us what ingredients you have available in your kitchen
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <AccessTimeIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                  Set Preferences
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Specify any dietary restrictions or cuisine preferences
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <LocalDiningIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                  Generate Recipes
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Our AI creates personalized recipe suggestions based on your inputs
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <EcoIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                  Cook & Enjoy
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Follow the recipe instructions to prepare your delicious meal
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" gutterBottom>
            Ready to cook something amazing?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Create an account to save your favorite recipes and preferences
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              component={RouterLink} 
              to="/register" 
              variant="contained" 
              color="primary" 
              size="large"
            >
              Sign Up Free
            </Button>
            <Button 
              component={RouterLink} 
              to="/generator" 
              variant="outlined" 
              color="primary" 
              size="large"
            >
              Try Generator
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;