# Use the official Redis image as the base
FROM redis:7-alpine

# Add labels for better container management
LABEL maintainer="Dmitry Grinko <dm.grinko@gmail.com>"
LABEL description="Redis server container"

# Expose the default Redis port
EXPOSE 6379

# Use a custom configuration file if needed
# COPY redis.conf /usr/local/etc/redis/redis.conf

# Set the default command to run Redis server
CMD ["redis-server"]
