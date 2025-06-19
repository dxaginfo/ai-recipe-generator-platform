import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Container,
  Paper,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        className="recipe-hero"
        sx={{
          background: 'url(https://source.unsplash.com/random/?cooking,food) no-repeat center center',
          backgroundSize: 'cover',
          mb: 6,
        }}
      >
        <Box className="recipe-hero-content">
          <Typography variant="h2" component="h1" gutterBottom>
            Turn Your Ingredients into Delicious Meals
          </Typography>
          <Typography variant="h5" paragraph>
            Let AI create personalized recipes based on what you have in your kitchen
          </Typography>
          <Button
            component={RouterLink}
            to="/generator"
            variant="contained"
            size="large"
            sx={{ mt: 2, py: 1.5, px: 4 }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Turn your ingredients into delicious recipes in just a few simple steps
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <SearchIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                1. Enter Your Ingredients
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tell us what ingredients you have in your kitchen. The more ingredients you add, the more personalized your recipe will be.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <SettingsIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                2. Set Your Preferences
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Specify any dietary restrictions or cuisine preferences. Our AI will take these into account when creating your recipe.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <RestaurantIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                3. Get Your Recipe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our AI will generate a personalized recipe with ingredients, instructions, and nutritional information just for you.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Features
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Everything you need to make the most of your ingredients
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <MenuBookIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Custom Recipes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get personalized recipes based on your available ingredients and preferences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <AccessTimeIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Time Saving
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  No more searching through recipe books or websites. Get instant meal ideas.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <FavoriteIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Save Favorites
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Save your favorite recipes to your profile for easy access later.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <RestaurantIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Dietary Options
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Set preferences for vegetarian, vegan, gluten-free, and other dietary needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* CTA Section */}
        <Box
          sx={{
            bgcolor: 'primary.light',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            mb: 8,
          }}
        >
          <Typography variant="h5" component="h3" color="white" gutterBottom>
            Ready to transform your cooking experience?
          </Typography>
          <Typography variant="body1" color="white" paragraph>
            Join Recipe AI today and start creating delicious meals with what you already have.
          </Typography>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2 }}
          >
            Sign Up Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;