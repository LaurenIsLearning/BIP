# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install ALL dependencies including dev dependencies
RUN npm install --include=dev

# Copy the rest of your backend source code
COPY . .

# Build TypeScript to /app/dist
RUN npm run build

# Expose backend port
EXPOSE 3000

# Start the compiled server
CMD ["node", "dist/backend.js"]
