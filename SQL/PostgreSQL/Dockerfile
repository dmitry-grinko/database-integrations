FROM postgres:15

# Copy initialization scripts
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port (using ARG for build-time variable)
ARG POSTGRES_PORT=5432
EXPOSE ${POSTGRES_PORT}

# The default command will start PostgreSQL
CMD ["postgres"]
