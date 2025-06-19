import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
  preferences: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    lowCarb: false,
    keto: false,
  },
  cuisine: '',
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (!state.ingredients.includes(action.payload)) {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient !== action.payload
      );
    },
    clearIngredients: (state) => {
      state.ingredients = [];
    },
    updatePreference: (state, action) => {
      const { preference, value } = action.payload;
      state.preferences[preference] = value;
    },
    setCuisine: (state, action) => {
      state.cuisine = action.payload;
    },
    resetAll: (state) => initialState,
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  updatePreference,
  setCuisine,
  resetAll,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;