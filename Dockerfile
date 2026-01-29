# # 1. Use Node image
# FROM node:18

# # 2. Set working directory
# WORKDIR /app

# # 3. Copy project files
# COPY . .

# # 4. Install dependencies
# RUN npm install

# # 5. Build React app
# RUN npm run build

# # 6. Install static server
# RUN npm install -g serve

# # 7. Expose port
# EXPOSE 3000

# # 8. Run app
# CMD ["serve", "-s", "dist", "-l", "3000"]

