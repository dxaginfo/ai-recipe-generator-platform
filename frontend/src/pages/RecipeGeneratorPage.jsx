import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  CircularProgress,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SaveIcon from '@mui/icons-material/Save';

// This is a placeholder for the actual API call
const generateRecipe = async (ingredients, preferences) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response data
  return {
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

function RecipeGeneratorPage() {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  
  // Dietary preferences
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    lowCarb: false,
    keto: false,
  });
  
  // Cuisine preferences
  const [cuisine, setCuisine] = useState('');
  
  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== '' && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };
  
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  
  const handlePreferenceChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked,
    });
  };
  
  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const generatedRecipe = await generateRecipe(ingredients, {
        ...preferences,
        cuisine,
      });
      setRecipe(generatedRecipe);
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
      console.error('Error generating recipe:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveRecipe = () => {
    // This function will be implemented later with user authentication
    console.log('Save recipe');
  };
  
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        AI Recipe Generator
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Your Ingredients
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                fullWidth
                label="Add Ingredient"
                variant="outlined"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddIngredient();
                    e.preventDefault();
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddIngredient}
                sx={{ ml: 1 }}
              >
                <AddIcon />
              </Button>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              {ingredients.length > 0 ? (
                <Grid container spacing={1}>
                  {ingredients.map((ingredient, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={ingredient}
                        onDelete={() => handleRemoveIngredient(index)}
                        color="primary"
                        variant="outlined"
                        className="ingredient-chip"
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary" align="center">
                  No ingredients added yet
                </Typography>
              )}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Dietary Preferences
            </Typography>
            
            <FormGroup>
              <Grid container spacing={1}>
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
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Cuisine (Optional)
            </Typography>
            
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel>Cuisine Type</InputLabel>
              <Select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                label="Cuisine Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Mexican">Mexican</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Mediterranean">Mediterranean</MenuItem>
                <MenuItem value="Thai">Thai</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleGenerateRecipe}
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Generate Recipe'
              )}
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
              <CircularProgress />
            </Box>
          ) : recipe ? (
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {recipe.title}
                </Typography>
                
                <Box sx={{ display: 'flex', mb: 2 }}>
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
                
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
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
                
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Instructions
                </Typography>
                <List>
                  {recipe.instructions.map((instruction, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemText
                        primary={`${index + 1}. ${instruction}`}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Nutritional Information
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Chip label={`Calories: ${recipe.nutritionalInfo.calories}`} />
                  <Chip label={`Protein: ${recipe.nutritionalInfo.protein}g`} />
                  <Chip label={`Carbs: ${recipe.nutritionalInfo.carbs}g`} />
                  <Chip label={`Fat: ${recipe.nutritionalInfo.fat}g`} />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<SaveIcon />}
                  color="primary"
                  onClick={handleSaveRecipe}
                >
                  Save Recipe
                </Button>
              </CardActions>
            </Card>
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.default',
                border: '2px dashed',
                borderColor: 'primary.light',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary" align="center">
                Enter your ingredients and preferences, then click "Generate Recipe"
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                Our AI will create a personalized recipe based on what you have available
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default RecipeGeneratorPage;