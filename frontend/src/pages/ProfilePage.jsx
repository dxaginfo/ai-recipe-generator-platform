import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  Chip,
} from '@mui/material';

function ProfilePage() {
  // Mock user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    preferences: {
      dietaryRestrictions: ['vegetarian'],
      allergies: ['peanuts', 'shellfish'],
      cuisinePreferences: ['Italian', 'Mexican'],
      calorieTarget: 2000,
    },
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    vegetarian: user.preferences.dietaryRestrictions.includes('vegetarian'),
    vegan: user.preferences.dietaryRestrictions.includes('vegan'),
    glutenFree: user.preferences.dietaryRestrictions.includes('gluten-free'),
    dairyFree: user.preferences.dietaryRestrictions.includes('dairy-free'),
  });

  const [allergies, setAllergies] = useState(user.preferences.allergies);
  const [newAllergy, setNewAllergy] = useState('');
  const [cuisines, setCuisines] = useState(user.preferences.cuisinePreferences);
  const [newCuisine, setNewCuisine] = useState('');
  const [calorieTarget, setCalorieTarget] = useState(user.preferences.calorieTarget);

  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferenceChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked,
    });
  };

  const handleAddAllergy = () => {
    if (newAllergy && !allergies.includes(newAllergy)) {
      setAllergies([...allergies, newAllergy]);
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (allergyToRemove) => {
    setAllergies(allergies.filter(allergy => allergy !== allergyToRemove));
  };

  const handleAddCuisine = () => {
    if (newCuisine && !cuisines.includes(newCuisine)) {
      setCuisines([...cuisines, newCuisine]);
      setNewCuisine('');
    }
  };

  const handleRemoveCuisine = (cuisineToRemove) => {
    setCuisines(cuisines.filter(cuisine => cuisine !== cuisineToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate password if changing
    if (formData.password) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    // Prepare dietary restrictions array from checkboxes
    const dietaryRestrictions = [];
    if (preferences.vegetarian) dietaryRestrictions.push('vegetarian');
    if (preferences.vegan) dietaryRestrictions.push('vegan');
    if (preferences.glutenFree) dietaryRestrictions.push('gluten-free');
    if (preferences.dairyFree) dietaryRestrictions.push('dairy-free');

    // Update user state (in a real app, this would be an API call)
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      preferences: {
        ...user.preferences,
        dietaryRestrictions,
        allergies,
        cuisinePreferences: cuisines,
        calorieTarget,
      },
    });

    setSuccessMessage('Profile updated successfully');
    setError('');
    
    // Clear password fields
    setFormData({
      ...formData,
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Profile
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Account Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Password (leave blank to keep current)"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Dietary Preferences
          </Typography>

          <FormGroup sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
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
            </Grid>
          </FormGroup>

          <Typography variant="subtitle1" gutterBottom>
            Allergies
          </Typography>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              label="Add Allergy"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddAllergy();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddAllergy}
              sx={{ ml: 1 }}
            >
              Add
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {allergies.map((allergy, index) => (
              <Chip
                key={index}
                label={allergy}
                onDelete={() => handleRemoveAllergy(allergy)}
              />
            ))}
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Preferred Cuisines
          </Typography>

          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              label="Add Cuisine"
              value={newCuisine}
              onChange={(e) => setNewCuisine(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCuisine();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddCuisine}
              sx={{ ml: 1 }}
            >
              Add
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {cuisines.map((cuisine, index) => (
              <Chip
                key={index}
                label={cuisine}
                onDelete={() => handleRemoveCuisine(cuisine)}
              />
            ))}
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Daily Calorie Target
          </Typography>

          <TextField
            type="number"
            label="Calories"
            value={calorieTarget}
            onChange={(e) => setCalorieTarget(parseInt(e.target.value) || 0)}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" color="primary" size="large">
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProfilePage;