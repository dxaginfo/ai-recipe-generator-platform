# AI Recipe Generator Platform

A web platform that creates recipes based on available ingredients and dietary constraints using AI.

## Features

- Input available ingredients and dietary preferences
- Generate customized recipes using AI
- Save favorite recipes
- User authentication and profiles
- Personalized dietary preferences
- Mobile-responsive design

## Tech Stack

### Frontend
- React.js
- Redux for state management
- Material UI for design components
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- OpenAI API for recipe generation

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB account (local or Atlas)
- OpenAI API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/dxaginfo/ai-recipe-generator-platform.git
   cd ai-recipe-generator-platform
   ```

2. Install dependencies
   ```
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server
   ```
   npm run dev
   ```

## Usage

1. Register an account
2. Set up your dietary preferences in your profile
3. Navigate to the Recipe Generator
4. Enter ingredients you have available
5. Set additional preferences for this particular recipe
6. Generate a recipe
7. Save recipes you like to your profile

## API Endpoints

### Users
- `POST /api/users` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get user data
- `PUT /api/users/preferences` - Update user preferences

### Recipes
- `POST /api/recipes/generate` - Generate a recipe
- `GET /api/recipes` - Get all user recipes
- `GET /api/recipes/saved` - Get saved recipes
- `GET /api/recipes/:id` - Get single recipe
- `PUT /api/recipes/:id/save` - Save recipe
- `PUT /api/recipes/:id/unsave` - Unsave recipe
- `DELETE /api/recipes/:id` - Delete recipe

## License

This project is licensed under the MIT License - see the LICENSE file for details.
