# Use the official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Copy serve configuration into the dist directory
COPY serve.json ./dist/serve.json

# Expose port 3000 for the application
EXPOSE 3000

# Use the serve module to serve the React app, explicitly specifying the serve.json configuration
CMD ["npx", "serve", "-s", "dist", "-l", "3000", "--config", "/usr/src/app/dist/serve.json"]
