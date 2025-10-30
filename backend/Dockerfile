# Use an official Node image
FROM node:20-alpine

# Create and set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose your backend port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
