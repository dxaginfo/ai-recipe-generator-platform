const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a recipe title'],
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
        },
        unit: {
          type: String,
        },
      },
    ],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      vitamins: Object,
    },
    dietaryCategories: [String],
    prepTime: Number,
    cookTime: Number,
    servings: Number,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);