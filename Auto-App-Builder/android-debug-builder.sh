#!/bin/bash

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BUILD_DIR="$SCRIPT_DIR/builds"
GRADLE_FILE="$PROJECT_ROOT/android/app/build.gradle"

mkdir -p "$BUILD_DIR"

echo -e "${BLUE}📱 Android Debug Builder${NC}"
echo ""

VERSION_CODE=$(grep -E "versionCode\s+\d+" "$GRADLE_FILE" | grep -oE "\d+" | head -1)
VERSION_NAME=$(grep -E "versionName\s+\"[^\"]+\"" "$GRADLE_FILE" | grep -oE "\"[^\"]+\"" | tr -d '"' | head -1)

echo -e "${BLUE}Current:${NC} v${VERSION_NAME} (Build ${VERSION_CODE})"

NEW_VERSION_CODE=$((VERSION_CODE + 1))
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/versionCode $VERSION_CODE/versionCode $NEW_VERSION_CODE/" "$GRADLE_FILE"
else
    sed -i "s/versionCode $VERSION_CODE/versionCode $NEW_VERSION_CODE/" "$GRADLE_FILE"
fi

echo -e "${GREEN}✓${NC} Build number: ${VERSION_CODE} → ${NEW_VERSION_CODE}"
echo ""

echo -e "${BLUE}Building Debug APK...${NC}"
cd "$PROJECT_ROOT/android"
./gradlew assembleDebug

APK_PATH="$PROJECT_ROOT/android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    FILENAME="postify-debug-v${VERSION_NAME}-b${NEW_VERSION_CODE}-${TIMESTAMP}.apk"
    cp "$APK_PATH" "$BUILD_DIR/$FILENAME"
    
    echo ""
    echo -e "${GREEN}✓ Build successful!${NC}"
    echo -e "${BLUE}Output:${NC} $BUILD_DIR/$FILENAME"
    echo -e "${BLUE}Size:${NC} $(du -h "$BUILD_DIR/$FILENAME" | cut -f1)"
else
    echo -e "${YELLOW}⚠ APK not found${NC}"
    exit 1
fi
