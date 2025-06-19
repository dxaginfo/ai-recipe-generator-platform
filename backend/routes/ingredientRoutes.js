const express = require('express');
const router = express.Router();

// @desc    Get all ingredients
// @route   GET /api/ingredients
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get All Ingredients - Implementation Pending' });
});

// @desc    Search ingredients
// @route   GET /api/ingredients/search
// @access  Public
router.get('/search', (req, res) => {
  res.status(200).json({ message: 'Search Ingredients - Implementation Pending' });
});

// @desc    Get ingredient by ID
// @route   GET /api/ingredients/:id
// @access  Public
router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Get Ingredient ${req.params.id} - Implementation Pending` });
});

// @desc    Create ingredient
// @route   POST /api/ingredients
// @access  Private/Admin
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create Ingredient - Implementation Pending' });
});

// @desc    Update ingredient
// @route   PUT /api/ingredients/:id
// @access  Private/Admin
router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update Ingredient ${req.params.id} - Implementation Pending` });
});

// @desc    Delete ingredient
// @route   DELETE /api/ingredients/:id
// @access  Private/Admin
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete Ingredient ${req.params.id} - Implementation Pending` });
});

// @desc    Save user ingredients (for recipe generation)
// @route   POST /api/ingredients/user
// @access  Public
router.post('/user', (req, res) => {
  res.status(200).json({ message: 'Save User Ingredients - Implementation Pending' });
});

module.exports = router;