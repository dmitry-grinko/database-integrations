# Express SQLite CRUD API

A simple REST API built with Express.js and SQLite for managing users.

### Create a new user

```bash
curl -X POST \
  http://localhost:3000/api/users \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
}'
```

### Get all users

```bash
curl http://localhost:3000/api/users
```

### Update a user

```bash
curl -X PUT \
  http://localhost:3000/api/users/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
}'
```

### Delete a user

```bash
curl -X DELETE http://localhost:3000/api/users/1
```


