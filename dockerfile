# Use the lightweight Node.js Alpine base image (multi-arch: supports ARM and x86)
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the application port (change if your app uses a different port)
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
