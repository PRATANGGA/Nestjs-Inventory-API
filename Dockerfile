# Gunakan image Node.js resmi
FROM node:20

# Set workdir di dalam container
WORKDIR /app

# Salin package.json dan yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Salin semua source code
COPY . .

# Build NestJS (typescript -> javascript)
RUN yarn build

# Expose port NestJS
EXPOSE 3000

# Command default ketika container jalan
CMD ["yarn", "start:prod"]
