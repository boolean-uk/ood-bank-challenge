#!/bin/sh

# Set the source and destination directories
src_dir="src"
spec_dir="spec"
build_dir="build"

# Function to move JS files from source to build path
move_js_files() {
    source_path="$1"
    build_path="$2"

    find "$source_path" -type f -name "*.js" | while read -r source_file; do
        relative_path="${source_file#$source_path}"
        target_file="$build_path$relative_path"
        mkdir -p "$(dirname "$target_file")"
        mv "$source_file" "$target_file"
    done
}

# Move JS files from src directory
move_js_files "$src_dir" "$build_dir/$src_dir"

# Move JS files from spec directory
move_js_files "$spec_dir" "$build_dir/$spec_dir"

echo "JS files moved to the build directory: $build_dir"
