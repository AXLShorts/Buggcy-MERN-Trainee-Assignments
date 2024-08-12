#!/bin/bash

# Run TypeScript compiler
npx tsc

# Build the application
npm run build

# Git Add
git add .

# Git Commit with message
git commit -m "Build"

# Git Push
git push