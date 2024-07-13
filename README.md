

# Library Inventory Management System

A comprehensive backend system for managing library inventory, built with Node.js, Express.js, and MongoDB. This repository includes functionalities for managing books, libraries, and user roles.

## Table of Contents

- [Folder Structure](#folder-structure)
- [MVC Pattern](#mvc-pattern)
- [Technologies Used](#technologies-used)
- [Middleware Functions](#middleware-functions)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Folder Structure

```
├── config/
│   ├── cloudinary.js        # Cloudinary configuration
│   ├── database.js          # MongoDB connection setup
├── controllers/
│   ├── booksController.js   # Controller for managing books
│   ├── librariesController.js # Controller for managing libraries
│   └── usersController.js   # Controller for managing users
├── middleware/
│   ├── borrower.js          # Middleware for borrower role
│   ├── admin.js             # Middleware for admin role
│   ├── author.js            # Middleware for author role
│   └── isAuthenticated.js   # Middleware for authentication
├── models/
│   ├── Book.js              # Book schema and model
│   ├── Library.js           # Library schema and model
│   └── User.js              # User schema and model
├── routes/
│   ├── booksRoutes.js       # Routes for books endpoints
│   ├── librariesRoutes.js   # Routes for libraries endpoints
│   └── usersRoutes.js
│   └── borrowerroutes.js
│   └── libraryinventorrroutes.js
      # Routes for users endpoints
├── utils/
│   ├── upload.js            # Utility for handling image uploads to Cloudinary
│   └           # Helper functions used across the application
├── index.js                 # Entry point of the application
├── package.json             # Project dependencies and scripts
└── README.md                # Detailed information about the project
```

## MVC Pattern

The project follows the MVC (Model-View-Controller) pattern for structuring:

- **Models (`models/`)**: Define data structures (schemas) and interact with the database.
- **Controllers (`controllers/`)**: Handle application logic, interact with models, and send responses.
- **Routes (`routes/`)**: Define endpoints and route requests to appropriate controllers.
- **Views**: Typically not applicable in a backend API project.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: MongoDB object modeling tool.
- **Cloudinary**: Cloud-based image and video management service.
- **Passport.js**: Authentication middleware for Node.js.
- **Multer**: Middleware for handling file uploads.
- **bcrypt**: Library for hashing passwords.

## Middleware Functions

Middleware functions are used for authentication and authorization based on user roles:

- **`borrower.js`**: Middleware for borrower role.
- **`admin.js`**: Middleware for admin role.
- **`author.js`**: Middleware for author role.
- **`isAuthenticated.js`**: Middleware for checking user authentication.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dhyaneshsiddhartha15/library-inventory-management.git
   cd library-inventory-management
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   CLOUDINARY_URL=your_cloudinary_url
   SESSION_SECRET=your_session_secret
   ```

4. **Start the server**:

   ```bash
   npm start
   ```

5. **Testing**:

   Use Postman or any API testing tool to test the endpoints defined in `routes/`.

## API Endpoints

- **Books**:
  - `GET /api/v1/books` - Get all books
  - `POST /api/v1/books` - Create a new book
  - `PUT /api/v1/books/:id` - Update a book
  - `DELETE /api/v1/books/:id` - Delete a book

- **Libraries**:
  - `GET /api/v1/libraries` - Get all libraries
  - `POST /api/v1/libraries` - Create a new library
  - `PUT /api/v1/libraries/:id` - Update a library
  - `DELETE /api/v1/libraries/:id` - Delete a library
  - `GET /api/v1/libraries/:id/inventory` - Get books inventory of a library
  - `POST /api/v1/libraries/:id/inventory` - Add a book to a library's inventory
  - `DELETE /api/v1/libraries/:id/inventory/:bookId` - Remove a book from a library's inventory

- **Users**:
  - `POST /api/v1/users/register` - Register a new user
  - `POST /api/v1/users/login` - Login user
  - `GET /api/v1/users/logout` - Logout user



