# PostgreSQL TypeORM Integration

This is a Node.js application demonstrating integration with PostgreSQL using TypeORM.

## Features

- TypeORM integration with PostgreSQL
- RESTful API endpoints for User entity
- Environment configuration
- Error handling and connection retry logic
- Entity management with TypeORM
- Data validation and sanitization
- Secure password handling
- Database migrations support

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL server
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

## Environment Variables

Create a `.env` file with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
PORT=3000
```

## Running the Application

Start the development server:

```bash
npm run start
```

## API Endpoints

### User Management

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

