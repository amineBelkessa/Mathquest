# Use Node.js 20 as the base image for building the frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies with clean cache to avoid issues
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use Node.js 20 to serve the built frontend
FROM node:20-alpine

WORKDIR /app

# Copy only the built files from the build stage
COPY --from=build /app/build /app/build

# Install serve to serve the build directory
RUN npm install -g serve

# Expose the port where the frontend will be served (default for serve is 5000)
EXPOSE 5000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "5000"]