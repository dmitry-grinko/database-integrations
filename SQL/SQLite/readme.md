# SQLite Database Example

## What is SQLite?

SQLite is a self-contained, serverless, zero-configuration, transactional SQL database engine. Unlike other databases like PostgreSQL or MySQL, SQLite does not require a separate server process or system to operate. Instead, it reads and writes directly to disk files.

### Key Benefits of SQLite:

- **Serverless** - No need for a database server or Docker container
- **Zero-configuration** - No setup or administration needed
- **Self-contained** - The entire database is stored in a single file
- **Cross-platform** - Works on all major operating systems
- **Reliable** - Used by many high-traffic websites and applications
- **Lightweight** - Small footprint, perfect for development and testing

## Project Structure

This example demonstrates a basic SQLite setup with:
- A shell script to initialize the database
- Sample table creation
- Basic data insertion

## Getting Started

### Prerequisites

Make sure you have SQLite installed on your system:

- **Ubuntu/Debian:**
  ```bash
  sudo apt-get install sqlite3
  ```

- **macOS:**
  ```bash
  brew install sqlite3
  ```

- **Windows:**
  Download the precompiled binaries from the [SQLite download page](https://www.sqlite.org/download.html)

### Running the Example

1. Make the initialization script executable:
   ```bash
   chmod +x init-sqlite.sh
   ```

2. Run the initialization script:
   ```bash
   ./init-sqlite.sh
   ```

This will:
- Create a new SQLite database file named `database.sqlite`
- Create a `users` table with basic fields
- Insert sample data
- Set appropriate file permissions

### Accessing the Database

You can interact with the database using the SQLite command line tool:

```bash
sqlite3 database.sqlite
```

Some useful SQLite commands:
- `.tables` - List all tables
- `.schema users` - Show the schema for the users table
- `SELECT * FROM users;` - Query all users
- `.quit` - Exit the SQLite prompt

## Why SQLite Instead of a Container?

Unlike PostgreSQL or MySQL, SQLite doesn't require:
- Container orchestration
- Network configuration
- User management
- Server setup
- Resource allocation

This makes SQLite perfect for:
- Development environments
- Testing
- Small to medium-sized applications
- Embedded systems
- Desktop applications
- Mobile applications

However, for large-scale production applications with multiple concurrent users, you might want to consider a client-server database like PostgreSQL.