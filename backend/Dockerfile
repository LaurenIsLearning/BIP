# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including dev deps
RUN npm install --include=dev

# Copy backend folders individually (prevents Git Bash path rewrite bug)
COPY src ./src
COPY db ./db
COPY tsconfig.json .

# Build TypeScript to /app/dist
RUN npm run build

# Expose backend port
ENV PORT=8080
EXPOSE 8080

# Start the compiled server
#CMD ["node", "dist/backend.js"]

# DEBUG: Run seed THEN start backend
CMD ["sh", "-c", "node dist/seed.js && node dist/backend.js"]