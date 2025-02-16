# MariaDB

MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system. It was created by the original developers of MySQL after Oracle Corporation acquired MySQL in 2009.

## Key Differences from MySQL

1. **Open Source Focus**: MariaDB maintains a strong commitment to open-source principles, while MySQL has both open-source and proprietary components under Oracle.

2. **Feature Set**:
   - MariaDB includes additional storage engines (like Aria and XtraDB)
   - Better performance optimizations
   - Enhanced security features
   - More extensive testing and quality assurance

3. **Drop-in Replacement**: MariaDB is designed to be a drop-in replacement for MySQL, meaning:
   - Binary compatibility with MySQL
   - Same commands, interfaces, APIs, and libraries
   - Identical data and table structures

4. **Version Compatibility**: 
   - MariaDB version numbers don't align directly with MySQL versions
   - MariaDB 10.x is compatible with MySQL 5.7 and 8.0 (depending on specific version)

## Use Cases

MariaDB is ideal for:
- Web applications
- Database-driven applications
- Enterprise solutions requiring a reliable, open-source database
- Projects needing MySQL compatibility with enhanced features

For configuration details, see the `my.cnf` file in this directory.

## Docker Setup

### Building the Image
To build the Docker image, run the following command from this directory:

```bash
docker build -t mariadb-image .
```

### Running the Container
To run the container, use the following command:

```bash
docker run -d --name mariadb -p 3306:3306 --env-file .env -v $(pwd)/data:/var/lib/mysql -v $(pwd)/my.cnf:/etc/mysql/my.cnf mariadb-image
```
This will:
- Run the container in detached mode (-d)
- Name it "mariadb"
- Map port 3306 to your host machine
- Mount a local data directory for persistence
- Use your custom configuration file

### Accessing the Database
To access the MariaDB shell, run:

```bash
docker exec -it mariadb mysql -u root -p
```

### Connecting to the Database
To connect to the database from your application, use the following connection string:

```bash
mysql://root:your_password@localhost:3306/your_database
```

Note: Make sure to:
1. Build the image first using the build command
2. Create a `data` directory in the current folder before running the container
3. Ensure your `my.cnf` file exists in the current directory
