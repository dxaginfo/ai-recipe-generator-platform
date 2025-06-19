import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock data for saved recipes
const savedRecipes = [
  {
    id: '1',
    title: 'Pasta with Tomato and Herbs',
    prepTime: 10,
    cookTime: 20,
    ingredients: ['Pasta', 'Tomatoes', 'Garlic', 'Olive Oil', 'Basil'],
    dateAdded: '2023-10-15',
  },
  {
    id: '2',
    title: 'Vegetable Stir Fry',
    prepTime: 15,
    cookTime: 10,
    ingredients: ['Broccoli', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Ginger'],
    dateAdded: '2023-10-10',
  },
  {
    id: '3',
    title: 'Chocolate Chip Cookies',
    prepTime: 20,
    cookTime: 12,
    ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Chocolate Chips'],
    dateAdded: '2023-10-08',
  },
];

function SavedRecipesPage() {
  const handleDeleteRecipe = (id) => {
    console.log(`Delete recipe with id: ${id}`);
    // This would be implemented with state management in a real app
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Saved Recipes
      </Typography>

      {savedRecipes.length > 0 ? (
        <Grid container spacing={3}>
          {savedRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card className="recipe-card" elevation={2}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {recipe.title}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTimeIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {recipe.prepTime + recipe.cookTime} min
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Added on {new Date(recipe.dateAdded).toLocaleDateString()}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    {recipe.ingredients.map((ingredient, index) => (
                      <Chip
                        key={index}
                        label={ingredient}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    component={RouterLink}
                    to={`/recipes/${recipe.id}`}
                    size="small"
                    color="primary"
                  >
                    View Recipe
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteRecipe(recipe.id)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            You haven't saved any recipes yet
          </Typography>
          <Button
            component={RouterLink}
            to="/generator"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Generate Your First Recipe
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default SavedRecipesPage;