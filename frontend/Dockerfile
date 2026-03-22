# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Note: VITE_API_BASE_URL must be provided during build if you want dynamic routing
# For Cloud Run, it's easier to hardcode the backend URL in App.tsx before running this.
RUN npm run build

# Production serving stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config if we had React Router, but for a single page portfolio, default is fine.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
