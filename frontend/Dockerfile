# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
