# Development stage
FROM node:16-alpine AS development

WORKDIR /app

COPY package*.json ./

# Install development dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Production stage
FROM node:16-alpine AS production

WORKDIR /app

# Copy only the built artifacts and necessary files from the development stage
COPY --from=development /app/build ./build
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Set environment to production
ENV NODE_ENV production

# Expose the port on which the app will be running (3002 is the default that `serve` uses)
EXPOSE 3002

# Start the app using serve
CMD ["npx", "serve", "-s", "build", "-l", "3002"]
