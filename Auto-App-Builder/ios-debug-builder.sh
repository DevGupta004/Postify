#!/bin/bash

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BUILD_DIR="$SCRIPT_DIR/builds"
IOS_DIR="$PROJECT_ROOT/ios"

mkdir -p "$BUILD_DIR"

echo -e "${BLUE}🍎 iOS Debug Builder${NC}"
echo ""

if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${YELLOW}⚠ iOS builds require macOS${NC}"
    exit 1
fi

if ! command -v xcodebuild &> /dev/null; then
    echo -e "${YELLOW}⚠ Xcode not found. Please install Xcode.${NC}"
    exit 1
fi

if [ ! -d "$IOS_DIR/Pods" ]; then
    echo -e "${BLUE}Installing CocoaPods dependencies...${NC}"
    cd "$IOS_DIR"
    pod install
fi

INFO_PLIST="$IOS_DIR/Postify/Info.plist"
if [ -f "$INFO_PLIST" ]; then
    VERSION=$(/usr/libexec/PlistBuddy -c "Print CFBundleShortVersionString" "$INFO_PLIST" 2>/dev/null || echo "1.0")
    BUILD=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "$INFO_PLIST" 2>/dev/null || echo "1")
    
    echo -e "${BLUE}Current:${NC} v${VERSION} (Build ${BUILD})"
    
    NEW_BUILD=$((BUILD + 1))
    /usr/libexec/PlistBuddy -c "Set :CFBundleVersion $NEW_BUILD" "$INFO_PLIST" 2>/dev/null || true
    
    echo -e "${GREEN}✓${NC} Build number: ${BUILD} → ${NEW_BUILD}"
    echo ""
fi

echo -e "${BLUE}Building for iOS Simulator...${NC}"
cd "$IOS_DIR"

SCHEME="Postify"
CONFIGURATION="Debug"
SIMULATOR="iPhone 15"

xcodebuild \
    -workspace Postify.xcworkspace \
    -scheme "$SCHEME" \
    -configuration "$CONFIGURATION" \
    -sdk iphonesimulator \
    -destination "platform=iOS Simulator,name=$SIMULATOR" \
    clean build \
    | xcpretty || xcodebuild \
    -workspace Postify.xcworkspace \
    -scheme "$SCHEME" \
    -configuration "$CONFIGURATION" \
    -sdk iphonesimulator \
    -destination "platform=iOS Simulator,name=$SIMULATOR" \
    clean build

echo ""
echo -e "${GREEN}✓ Build successful!${NC}"
echo -e "${BLUE}Run on simulator:${NC} react-native run-ios"
echo -e "${BLUE}Or open Xcode:${NC} open ios/Postify.xcworkspace"
