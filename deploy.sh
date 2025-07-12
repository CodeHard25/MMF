#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod --name mens-mastery-framework --confirm
