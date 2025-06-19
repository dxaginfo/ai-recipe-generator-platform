const express = require('express');
const router = express.Router();
const {
  generateRecipe,
  getRecipes,
  getSavedRecipes,
  getRecipe,
  saveRecipe,
  unsaveRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateRecipe);
router.get('/', protect, getRecipes);
router.get('/saved', protect, getSavedRecipes);
router.get('/:id', protect, getRecipe);
router.put('/:id/save', protect, saveRecipe);
router.put('/:id/unsave', protect, unsaveRecipe);
router.delete('/:id', protect, deleteRecipe);

module.exports = router;