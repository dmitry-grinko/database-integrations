# Redis

This is a simple Redis server container.

## Usage

1. Build the image

```bash
docker build -t redis-server .
```

2. Run the container

```bash
docker run -d --name redis-server -p 6379:6379 redis
```

3. Connect to the container

```bash
docker exec -it redis-server redis-cli
```

4. Set a key

```bash
docker exec -it redis-server redis-cli set mykey "Hello, World!"
```

5. Get a key

```bash
docker exec -it redis-server redis-cli get mykey
```

