import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

// This is a placeholder for fetching a recipe by ID
const getRecipeById = (id) => {
  // Mock data
  return {
    id,
    title: "Pasta with Tomato and Herbs",
    ingredients: [
      { name: "Pasta", amount: 200, unit: "g" },
      { name: "Tomatoes", amount: 3, unit: "medium" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Basil", amount: 10, unit: "leaves" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" },
    ],
    instructions: [
      "Boil water in a large pot and cook pasta according to package instructions.",
      "Meanwhile, dice tomatoes and mince garlic.",
      "Heat olive oil in a pan over medium heat.",
      "Add garlic and sauté until fragrant, about 30 seconds.",
      "Add tomatoes and cook for 5-7 minutes until they break down.",
      "Season with salt and pepper.",
      "Drain pasta and add to the sauce.",
      "Tear basil leaves and add to the pasta.",
      "Stir to combine and serve hot."
    ],
    nutritionalInfo: {
      calories: 450,
      protein: 12,
      carbs: 70,
      fat: 15
    },
    prepTime: 10,
    cookTime: 20,
    servings: 2
  };
};

function RecipeDetailsPage() {
  const { id } = useParams();
  const recipe = getRecipeById(id);

  const handleSaveRecipe = () => {
    console.log('Save recipe');
    // Will be implemented with user authentication
  };

  const handlePrintRecipe = () => {
    window.print();
  };

  const handleShareRecipe = () => {
    console.log('Share recipe');
    // Will be implemented with sharing functionality
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {recipe.title}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RestaurantIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Servings: {recipe.servings}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Button
              startIcon={<SaveIcon />}
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={handleSaveRecipe}
            >
              Save
            </Button>
            <Button
              startIcon={<PrintIcon />}
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={handlePrintRecipe}
            >
              Print
            </Button>
            <Button
              startIcon={<ShareIcon />}
              variant="outlined"
              onClick={handleShareRecipe}
            >
              Share
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <List dense>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText
                    primary={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                  />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Nutritional Information
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip label={`Calories: ${recipe.nutritionalInfo.calories}`} />
              <Chip label={`Protein: ${recipe.nutritionalInfo.protein}g`} />
              <Chip label={`Carbs: ${recipe.nutritionalInfo.carbs}g`} />
              <Chip label={`Fat: ${recipe.nutritionalInfo.fat}g`} />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <List>
              {recipe.instructions.map((instruction, index) => (
                <ListItem key={index} alignItems="flex-start" disableGutters>
                  <ListItemText
                    primary={`Step ${index + 1}`}
                    secondary={instruction}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    className="recipe-instruction"
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default RecipeDetailsPage;