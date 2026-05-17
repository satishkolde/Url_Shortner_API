# URL Shortener API

A powerful and efficient URL shortening service built with Node.js, Express, and PostgreSQL. This API allows users to create shortened URLs, track analytics, and manage their links with authentication and rate limiting.

## Features

- 🔗 **URL Shortening**: Convert long URLs into short, shareable links
- 👤 **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- 📊 **Analytics**: Track clicks, referrers, and usage statistics for shortened URLs
- ⚡ **Caching**: Redis integration for fast URL lookups and performance optimization
- 🔐 **Rate Limiting**: Built-in rate limiting to prevent abuse
- 🚀 **RESTful API**: Clean and intuitive REST API endpoints
- ♻️ **URL Redirection**: Automatic redirection from short URLs to original destinations

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: PostgreSQL with Sequelize ORM
- **Cache**: Redis
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcrypt for password hashing
- **Utilities**: nanoid for unique ID generation
- **Development**: Nodemon for hot reload

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Redis server
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database Configuration
   POSTGRES_CONNECTION_URI=db_connection_uri

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d

   # Server Configuration
   PORT=3000
   ```

4. **Start the server**
   - Development mode (with hot reload):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## Project Structure

```
src/
├── controllers/          # Request handlers
│   ├── analyse.controller.js
│   ├── redirect.controller.js
│   ├── url.controller.js
│   └── user.controller.js
├── routes/              # API route definitions
│   ├── analyse.route.js
│   ├── redirect.route.js
│   ├── url.route.js
│   └── user.route.js
├── services/            # Business logic
│   ├── analyse.service.js
│   ├── redirect.service.js
│   ├── url.service.js
│   └── user.service.js
├── models/              # Database models
│   ├── click.model.js
│   ├── url.model.js
│   └── user.model.js
├── middlewares/         # Express middlewares
│   ├── auth.middleware.js
│   ├── errorHandler.middleware.js
│   └── rateLimiter.middleware.js
├── utils/               # Utility functions
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── AsyncHandler.js
│   └── urlUtils.js
├── db/                  # Database connection
│   └── index.js
├── redis/               # Redis connection
│   └── index.js
├── app.js               # Express app configuration
├── constants.js         # Application constants
└── index.js             # Entry point
```

## API Endpoints

### User Routes (`/api/v1/user`)

- `POST /register` - Register a new user
- `POST /login` - User login
- `POST /logout` - User logout

### URL Routes (`/api/v1/url`)

- `POST /shorten` - Create a new shortened URL
- `DELETE /:id` - Delete URL

### Redirect Routes (`/`)

- `GET /:shortCode` - Redirect to original URL and track click

### Analytics Routes (`/api/v1/analyse`)

- `GET /analyse/:urlId` - Get analytics for a specific URL

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Register a new user via `/api/v1/user/register`
2. Login via `/api/v1/user/login` to receive a JWT token
3. Include the token in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- Rate limits are configured per endpoint
- Exceeding limits returns a 429 (Too Many Requests) status code
- Limits reset after a configured time period

## Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload

### Code Style

The project follows standard JavaScript conventions with async/await patterns and modular architecture.

## Database Schema

### Users Table
- id (UUID)
- username
- email
- password (hashed)
- created_at
- updated_at

### URLs Table
- id (UUID)
- user_id (foreign key)
- original_url
- short_code (unique)
- created_at
- updated_at

### Clicks Table
- id (UUID)
- url_id (foreign key)
- referrer
- user_agent
- created_at

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For issues and questions, please create an issue in the repository or contact the development team.

---