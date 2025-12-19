# Product App API

A Node.js REST API with MongoDB database

## Features

- User Authentication (Signup/Login) with JWT
- User Profile Management with Profile Picture Upload
- Category, Color, and Size Management
- Product Management with Multiple Image Upload
- Product Listing with Filters and Pagination


## Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/product_app
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

POST `/api/auth/signup` 
POST `/api/auth/login` 

 GET `/api/user/profile` 
 PUT `/api/user/profile` 
 POST `/api/category` 
 GET `/api/category` 

 POST `/api/color`
 GET `/api/color` 

 POST `/api/size`
 GET  `/api/size`

 POST  `/api/product` 
 GET  `/api/product` 



