const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate recipes based on user inputs
 * @param {Array} ingredients - List of ingredients
 * @param {Object} preferences - User dietary preferences
 * @param {Number} numRecipes - Number of recipes to generate
 * @returns {Array} - List of generated recipes
 */
const generateRecipes = async (ingredients, preferences, numRecipes = 1) => {
  try {
    // Construct the prompt for OpenAI
    const prompt = constructRecipePrompt(ingredients, preferences, numRecipes);

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a professional chef specialized in creating recipes from available ingredients. Provide detailed, structured recipes with exact measurements and clear instructions.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Parse the response
    return parseRecipeResponse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw new Error('Failed to generate recipes');
  }
};

/**
 * Construct prompt for recipe generation
 * @param {Array} ingredients - List of ingredients
 * @param {Object} preferences - User dietary preferences
 * @param {Number} numRecipes - Number of recipes to generate
 * @returns {String} - Constructed prompt
 */
const constructRecipePrompt = (ingredients, preferences, numRecipes) => {
  const ingredientsList = ingredients.join(', ');
  const dietaryRestrictions = preferences?.dietaryRestrictions?.join(', ') || '';
  const allergies = preferences?.allergies?.join(', ') || '';
  const cuisinePreferences = preferences?.cuisinePreferences?.join(', ') || '';
  
  return `Generate ${numRecipes} detailed recipe${numRecipes > 1 ? 's' : ''} using some or all of these ingredients: ${ingredientsList}.
${dietaryRestrictions ? `Dietary restrictions: ${dietaryRestrictions}.` : ''}
${allergies ? `Allergies (avoid these ingredients): ${allergies}.` : ''}
${cuisinePreferences ? `Preferred cuisine styles: ${cuisinePreferences}.` : ''}

Format each recipe as a JSON object with the following structure:
{
  "title": "Recipe Title",
  "ingredients": [
    { "name": "Ingredient Name", "amount": 1, "unit": "cup" },
    ...
  ],
  "instructions": [
    "Step 1: Do this...",
    "Step 2: Then do that...",
    ...
  ],
  "nutritionalInfo": {
    "calories": 350,
    "protein": 20,
    "carbs": 30,
    "fat": 10
  },
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4
}`;
};

/**
 * Parse OpenAI response into recipe objects
 * @param {String} responseText - Raw response from OpenAI
 * @returns {Array} - Parsed recipe objects
 */
const parseRecipeResponse = (responseText) => {
  try {
    // Extract JSON objects from the response
    const jsonMatches = responseText.match(/\{[\s\S]*?\}/g);
    
    if (!jsonMatches) {
      throw new Error('No valid JSON found in the response');
    }
    
    // Parse each JSON object
    return jsonMatches.map(jsonStr => {
      try {
        return JSON.parse(jsonStr);
      } catch (error) {
        console.error('Error parsing recipe JSON:', error);
        return null;
      }
    }).filter(recipe => recipe !== null);
    
  } catch (error) {
    console.error('Error parsing recipe response:', error);
    throw new Error('Failed to parse generated recipes');
  }
};

module.exports = {
  generateRecipes,
};