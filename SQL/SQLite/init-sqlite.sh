#!/bin/bash

# Database file path
DB_FILE="database.sqlite"

# Check if database file already exists
if [ -f "$DB_FILE" ]; then
    echo "Database file already exists. Removing old file..."
    rm "$DB_FILE"
fi

# Create new database and tables
echo "Creating new SQLite database..."
sqlite3 "$DB_FILE" <<EOF
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (name, email) VALUES 
    ('John Doe', 'john@example.com'),
    ('Jane Smith', 'jane@example.com');

.quit
EOF

# Set proper permissions
chmod 644 "$DB_FILE"

echo "SQLite database initialized successfully!"
echo "Database file: $DB_FILE"
