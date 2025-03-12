# Use Node.js as the base image for building the frontend
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Node.js to serve the built frontend
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/build /app/build

# Install serve to serve the build directory
RUN npm install -g serve

# Expose the port where the frontend will be served (default for serve is 5000)
EXPOSE 5000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "5000"]