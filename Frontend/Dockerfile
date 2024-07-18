# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY ./dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
