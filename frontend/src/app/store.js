import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import recipeReducer from '../features/recipes/recipeSlice';
import ingredientReducer from '../features/ingredients/ingredientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    ingredients: ingredientReducer,
  },
});