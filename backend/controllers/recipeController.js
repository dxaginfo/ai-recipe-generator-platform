const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipeModel');

// @desc    Generate a new recipe using AI
// @route   POST /api/recipes/generate
// @access  Private
const generateRecipe = asyncHandler(async (req, res) => {
  const { ingredients, preferences, cuisine } = req.body;

  if (!ingredients || ingredients.length === 0) {
    res.status(400);
    throw new Error('Please add at least one ingredient');
  }

  // This is where you would integrate with OpenAI API
  // For now, we'll return a mock recipe
  
  // Mock recipe generation
  const recipe = {
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
    servings: 2,
    tags: [cuisine, ...Object.keys(preferences).filter(key => preferences[key])],
    user: req.user.id,
    isSaved: false,
  };

  const createdRecipe = await Recipe.create(recipe);

  res.status(201).json(createdRecipe);
});

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Private
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user.id });
  res.status(200).json(recipes);
});

// @desc    Get saved recipes
// @route   GET /api/recipes/saved
// @access  Private
const getSavedRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user.id, isSaved: true });
  res.status(200).json(recipes);
});

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Private
const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error('Recipe not found');
  }

  // Make sure the logged in user matches the recipe user
  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  res.status(200).json(recipe);
});

// @desc    Save recipe
// @route   PUT /api/recipes/:id/save
// @access  Private
const saveRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error('Recipe not found');
  }

  // Make sure the logged in user matches the recipe user
  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    { isSaved: true },
    { new: true }
  );

  res.status(200).json(updatedRecipe);
});

// @desc    Unsave recipe
// @route   PUT /api/recipes/:id/unsave
// @access  Private
const unsaveRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error('Recipe not found');
  }

  // Make sure the logged in user matches the recipe user
  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    { isSaved: false },
    { new: true }
  );

  res.status(200).json(updatedRecipe);
});

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error('Recipe not found');
  }

  // Make sure the logged in user matches the recipe user
  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await recipe.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  generateRecipe,
  getRecipes,
  getSavedRecipes,
  getRecipe,
  saveRecipe,
  unsaveRecipe,
  deleteRecipe,
};