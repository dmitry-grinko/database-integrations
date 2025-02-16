# Redis API Service

A RESTful API service that demonstrates Redis operations using Node.js, Express, and Redis.

## Prerequisites

- Node.js (v14 or higher)
- Redis server running on localhost:6379

## Setup

Install dependencies:
```
npm install
```

## Running the Application

Start the Node.js application:
```
npm start
```

## API Endpoints

All endpoints are prefixed with `/api`

### Health Check
```
GET /api/health
Response: { "status": "OK" }
```

### Key-Value Operations

#### Set a value
```
POST /api/set
Body: {
    "key": "greeting",
    "value": "Hello Redis!"
}
Response: { "message": "Value set successfully" }
```

#### Get a value
```
GET /api/get/:key
Response: { "value": "Hello Redis!" }
```

### Counter Operations

#### Increment counter
```
POST /api/counter/:key/increment
Body: { "amount": 5 }  # Optional, defaults to 1
Response: { "value": 5 }
```

### List Operations

#### Add to list
```
POST /api/list/:key
Body: {
    "values": ["apple", "banana", "orange"]
}
Response: { "message": "Values added to list" }
```

#### Get list
```
GET /api/list/:key
Response: { "list": ["orange", "banana", "apple"] }
```

### Hash Operations

#### Set hash fields
```
POST /api/hash/:key
Body: {
    "fields": {
        "name": "John Doe",
        "email": "john@example.com",
        "age": "30"
    }
}
Response: { "message": "Hash fields set successfully" }
```

#### Get hash
```
GET /api/hash/:key
Response: {
    "hash": {
        "name": "John Doe",
        "email": "john@example.com",
        "age": "30"
    }
}
```

## Example Usage

Using curl:

```
# Set a value
curl -X POST http://localhost:3000/api/set \
    -H "Content-Type: application/json" \
    -d '{"key": "greeting", "value": "Hello Redis!"}'

# Get a value
curl http://localhost:3000/api/get/greeting

# Increment counter
curl -X POST http://localhost:3000/api/counter/visits/increment \
    -H "Content-Type: application/json" \
    -d '{"amount": 5}'

# Add to list
curl -X POST http://localhost:3000/api/list/fruits \
    -H "Content-Type: application/json" \
    -d '{"values": ["apple", "banana", "orange"]}'

# Set hash
curl -X POST http://localhost:3000/api/hash/user:1 \
    -H "Content-Type: application/json" \
    -d '{"fields": {"name": "John Doe", "email": "john@example.com", "age": "30"}}'
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Successful operation
- 404: Resource not found
- 500: Server error

Error responses include an error message:
```
{
    "error": "Error message details"
}
```
