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

# Expose port 8080 for the application
EXPOSE 8080

# Use the serve module to serve the React app
CMD ["npx", "serve", "-s", "build", "-l", "8080"]
