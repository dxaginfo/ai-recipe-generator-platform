const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    ingredients: [
      {
        name: String,
        amount: Number,
        unit: String,
      },
    ],
    instructions: [String],
    prepTime: Number,
    cookTime: Number,
    servings: Number,
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    tags: [String],
    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);