#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Navigate to build directory
cd dist/public

# Copy assets to root level if needed
if [ -d "assets" ]; then
    echo "Assets found, copying..."
    cp -r assets/* .
fi

# Initialize a git repository
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Push to gh-pages branch
git push -f https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git main:gh-pages

cd ../..
echo "Deployment complete!"