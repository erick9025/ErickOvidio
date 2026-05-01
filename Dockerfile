# Use the official Playwright base image with Node.js
FROM mcr.microsoft.com/playwright:v1.48.1-noble

# Set the working directory inside the container to /app.
WORKDIR /app

# Copy 'package.json' and 'package-lock.json' from the host to the container's working directory.
COPY package.json package-lock.json ./

# Install dependencies with npm ci for reproducibility.
RUN npm ci

# Copy the application code from the host to the container's working directory.
COPY . .

# Install Chrome browser for use with Playwright.
RUN npx playwright install chromium

# Here, we run the test script defined in package.json (npm run test:ui).
CMD ["npm", "run", "test:ui"]
