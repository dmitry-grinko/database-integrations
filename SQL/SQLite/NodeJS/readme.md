# Express SQLite CRUD API

A simple REST API built with Express.js and SQLite for managing users.

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation



// TODO: Add installation instructions



### Create a new user

curl -X POST \
  http://localhost:3000/api/users \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
}'

### Get all users

curl http://localhost:3000/api/users

### Update a user

curl -X PUT \
  http://localhost:3000/api/users/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
}'

### Delete a user

curl -X DELETE http://localhost:3000/api/users/1

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


