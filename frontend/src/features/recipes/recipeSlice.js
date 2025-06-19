import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
  recipe: null,
  savedRecipes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Generate a recipe
export const generateRecipe = createAsyncThunk(
  'recipes/generate',
  async (recipeData, thunkAPI) => {
    try {
      // This would be an actual API call in a real app
      console.log('Generate recipe API call with:', recipeData);
      
      // Mock response data with a delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        id: Math.random().toString(36).substring(2, 9),
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
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get recipe by ID
export const getRecipeById = createAsyncThunk(
  'recipes/getById',
  async (id, thunkAPI) => {
    try {
      // This would be an actual API call in a real app
      console.log('Get recipe API call with id:', id);
      
      // Mock response data
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
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Save a recipe
export const saveRecipe = createAsyncThunk(
  'recipes/save',
  async (recipe, thunkAPI) => {
    try {
      // This would be an actual API call in a real app
      console.log('Save recipe API call with:', recipe);
      
      // In a real app, we would return the response from the API
      return recipe;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get saved recipes
export const getSavedRecipes = createAsyncThunk(
  'recipes/getSaved',
  async (_, thunkAPI) => {
    try {
      // This would be an actual API call in a real app
      console.log('Get saved recipes API call');
      
      // Mock response data
      return [
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
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    reset: (state) => initialState,
    clearRecipe: (state) => {
      state.recipe = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipe = action.payload;
      })
      .addCase(generateRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecipeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipe = action.payload;
      })
      .addCase(getRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(saveRecipe.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.savedRecipes.push(action.payload);
      })
      .addCase(getSavedRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSavedRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedRecipes = action.payload;
      })
      .addCase(getSavedRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;