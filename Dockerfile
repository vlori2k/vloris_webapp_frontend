# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 

# Set a build argument to invalidate the cache
ARG CACHEBUST=1

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# ==== BUILD =====
# Clear npm cache
RUN npm cache clean --force

# Install dependencies (npm ci makes sure the exact versions in the lockfile get installed)
RUN npm ci

# Build the app
RUN npm run build

# ==== RUN =======
ENV NODE_ENV production

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3002

# Start the app
CMD [ "npx", "serve", "-s", "build", "-l", "3002" ]
