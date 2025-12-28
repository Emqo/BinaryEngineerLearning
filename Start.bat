@echo off
echo ========================================
echo  Binary Engineer Learning - Local Server
echo ========================================
echo.
echo Please select language:
echo  1. Chinese (中文) - Default
echo  2. English
echo.
set /p choice="Enter choice (1/2): "

if "%choice%"=="2" (
    echo.
    echo Starting English version on http://localhost:3000...
    echo Press Ctrl+C to stop the server.
    echo.
    mdbook serve --config-file book-en.toml --port 3000
) else (
    echo.
    echo Starting Chinese version on http://localhost:3000...
    echo Press Ctrl+C to stop the server.
    echo.
    mdbook serve --port 3000
)