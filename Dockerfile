# Use a Node 16 base image
FROM node:16-alpine 

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# Copy package.json and package-lock.json or yarn.lock
COPY package*.json ./

# Install app dependencies
RUN npm install

# Clear npm cache
RUN npm cache clean --force

# Install Material-UI dependencies
RUN npm install @mui/material @emotion/react @emotion/styled

# Build the app
RUN npm run build

# Set environment to production
ENV NODE_ENV production

# Expose the port on which the app will be running (3002 is the default that `serve` uses)
EXPOSE 3002

# Start the app using serve
CMD ["npx", "serve", "-s", "build", "-l", "3002"]
