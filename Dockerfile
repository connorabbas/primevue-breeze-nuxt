# Use the node:20-alpine image as the base image
FROM node:20-alpine

# Install Git
RUN apk add --no-cache git

# Set the working directory
WORKDIR /srv/app

# Copy the rest of the application code to the container
COPY . .

# Expose port 80
EXPOSE 80

# Set the default command
CMD ["sh"]
