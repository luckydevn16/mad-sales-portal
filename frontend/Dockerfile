# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json, yarn.lock, and .yarnrc.yml to the container
COPY package*.json ./

# Install project dependencies using Yarn
RUN yarn

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN yarn build


# Expose the port that Nginx will listen on
EXPOSE 3000


# Start the React development server when the container runs
CMD ["yarn", "start"]

