import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  FormGroup,
  CircularProgress,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
} from '@mui/material';
import { 
  addIngredient, 
  removeIngredient, 
  clearIngredients,
  updatePreference,
  setCuisine
} from '../features/ingredients/ingredientSlice';
import { generateRecipe } from '../features/recipes/recipeSlice';

const cuisineOptions = [
  'Italian',
  'Mexican',
  'Chinese',
  'Indian',
  'Japanese',
  'Thai',
  'French',
  'Mediterranean',
  'American',
  'Middle Eastern',
];

function RecipeGeneratorPage() {
  const [newIngredient, setNewIngredient] = useState('');
  const { ingredients, preferences, cuisine } = useSelector((state) => state.ingredients);
  const { isLoading, isError, message, recipe } = useSelector((state) => state.recipes);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      dispatch(addIngredient(newIngredient.trim()));
      setNewIngredient('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    dispatch(removeIngredient(ingredient));
  };

  const handleClearIngredients = () => {
    dispatch(clearIngredients());
  };

  const handlePreferenceChange = (e) => {
    dispatch(updatePreference({
      preference: e.target.name,
      value: e.target.checked,
    }));
  };

  const handleCuisineChange = (e) => {
    dispatch(setCuisine(e.target.value));
  };

  const handleGenerateRecipe = () => {
    if (ingredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    dispatch(generateRecipe({
      ingredients,
      preferences,
      cuisine,
    }));
  };

  const handleViewRecipe = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Recipe Generator
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Enter ingredients you have, set your preferences, and let AI create a personalized recipe for you.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Add ingredients you have available. The more ingredients you add, the better the recipe will be.
            </Typography>

            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                fullWidth
                label="Add Ingredient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleAddIngredient}
              >
                Add
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {ingredients.map((ingredient, index) => (
                <Chip
                  key={index}
                  label={ingredient}
                  onDelete={() => handleRemoveIngredient(ingredient)}
                  color="primary"
                  variant="outlined"
                  className="ingredient-chip"
                />
              ))}
            </Box>

            {ingredients.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearIngredients}
                size="small"
              >
                Clear All
              </Button>
            )}
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Dietary Preferences
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select any dietary restrictions or preferences.
            </Typography>

            <FormGroup sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferences.vegetarian}
                        onChange={handlePreferenceChange}
                        name="vegetarian"
                      />
                    }
                    label="Vegetarian"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferences.vegan}
                        onChange={handlePreferenceChange}
                        name="vegan"
                      />
                    }
                    label="Vegan"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferences.glutenFree}
                        onChange={handlePreferenceChange}
                        name="glutenFree"
                      />
                    }
                    label="Gluten Free"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferences.dairyFree}
                        onChange={handlePreferenceChange}
                        name="dairyFree"
                      />
                    }
                    label="Dairy Free"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferences.lowCarb}
                        onChange={handlePreferenceChange}
                        name="lowCarb"
                      />
                    }
                    label="Low Carb"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferences.keto}
                        onChange={handlePreferenceChange}
                        name="keto"
                      />
                    }
                    label="Keto"
                  />
                </Grid>
              </Grid>
            </FormGroup>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="cuisine-select-label">Cuisine Type (Optional)</InputLabel>
              <Select
                labelId="cuisine-select-label"
                id="cuisine-select"
                value={cuisine}
                label="Cuisine Type (Optional)"
                onChange={handleCuisineChange}
              >
                <MenuItem value="">Any Cuisine</MenuItem>
                {cuisineOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleGenerateRecipe}
              disabled={isLoading || ingredients.length === 0}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Creating your recipe...
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                  Our AI is analyzing your ingredients and preferences to create the perfect recipe for you.
                </Typography>
              </Box>
            ) : isError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {message}
              </Alert>
            ) : recipe ? (
              <Box>
                <Typography variant="h5" gutterBottom>
                  {recipe.title}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom>
                  Ingredients:
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        <Typography variant="body2">
                          {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
                
                <Typography variant="subtitle1" gutterBottom>
                  Time:
                </Typography>
                <Typography variant="body2" paragraph>
                  Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleViewRecipe}
                  >
                    View Full Recipe
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Your Recipe Will Appear Here
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Add ingredients and click "Generate Recipe" to create a personalized recipe using AI.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RecipeGeneratorPage;