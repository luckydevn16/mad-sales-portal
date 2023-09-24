# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json, yarn.lock, and .yarnrc.yml to the container
COPY package*.json ./

# Install project dependencies using Yarn
RUN yarn

# Copy the rest of the server code to the container
COPY . .

# Expose the port that the Express app will listen on
EXPOSE 8000

# Start the Express app when the container runs
CMD ["yarn", "start"]
