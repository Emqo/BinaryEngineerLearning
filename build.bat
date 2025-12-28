@echo off
echo ========================================
echo  Building Binary Engineer Learning
echo ========================================
echo.

echo [1/2] Building Chinese version...
mdbook build
if errorlevel 1 (
    echo ERROR: Failed to build Chinese version
    exit /b 1
)

echo.
echo [2/2] Building English version...
mdbook build --config-file book-en.toml
if errorlevel 1 (
    echo ERROR: Failed to build English version
    exit /b 1
)

echo.
echo ========================================
echo  Build completed successfully!
echo ========================================
echo   - Chinese version: book\
echo   - English version: book-en\
echo.
pause

