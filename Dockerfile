# Use an official Ubuntu base image
FROM ubuntu:22.04

# Avoid prompts from apt during build
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js, Python, and Java (JDK)
RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    default-jdk \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies (express, cors)
RUN npm install --production

# Copy the backend server file
COPY server.cjs ./

# Expose the port that the server uses
EXPOSE 3001

# Run the server
CMD ["node", "server.cjs"]
