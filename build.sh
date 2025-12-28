#!/bin/bash

echo "========================================"
echo " Building Binary Engineer Learning"
echo "========================================"
echo ""

echo "[1/2] Building Chinese version..."
mdbook build
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build Chinese version"
    exit 1
fi

echo ""
echo "[2/2] Building English version..."
mdbook build --config-file book-en.toml
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build English version"
    exit 1
fi

echo ""
echo "========================================"
echo " Build completed successfully!"
echo "========================================"
echo "  - Chinese version: book/"
echo "  - English version: book-en/"
echo ""

