#!/bin/bash

# Function to recursively find all TypeScript files in a directory
find_ts_files() {
  find "$1" -type f -name "*.ts"
}

# Get all TypeScript files in the src and spec directories
src_files=($(find_ts_files "./src"))
spec_files=($(find_ts_files "./spec"))

# Function to compile TypeScript files
compile_files() {
  for file in "${@}"; do
    npx tsc "$file"
    if [ $? -eq 0 ]; then
      echo "Successfully compiled $file"
    else
      echo "Error compiling $file"
    fi
  done
}

if [ ${#src_files[@]} -gt 0 ]; then
  echo "Compiling TypeScript files in src directory..."
  compile_files "${src_files[@]}"
else
  echo "No TypeScript files found in src directory."
fi

if [ ${#spec_files[@]} -gt 0 ]; then
  echo "Compiling TypeScript files in spec directory..."
  compile_files "${spec_files[@]}"
else
  echo "No TypeScript files found in spec directory."
fi

