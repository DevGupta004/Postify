#!/bin/bash

# Postify Auto Builder Script
# Builds APK and AAB files with automatic build number management

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BUILD_DIR="$SCRIPT_DIR/builds"
GRADLE_FILE="$PROJECT_ROOT/android/app/build.gradle"
BUILD_INFO_FILE="$SCRIPT_DIR/.build_info"

# Create builds directory if it doesn't exist
mkdir -p "$BUILD_DIR"

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Function to get current version code and name from build.gradle
get_version_info() {
    if [ ! -f "$GRADLE_FILE" ]; then
        print_error "build.gradle not found at $GRADLE_FILE"
        exit 1
    fi
    
    VERSION_CODE=$(grep -E "versionCode\s+\d+" "$GRADLE_FILE" | grep -oE "\d+" | head -1)
    VERSION_NAME=$(grep -E "versionName\s+\"[^\"]+\"" "$GRADLE_FILE" | grep -oE "\"[^\"]+\"" | tr -d '"' | head -1)
    
    if [ -z "$VERSION_CODE" ]; then
        VERSION_CODE=1
        print_warning "Could not find versionCode, defaulting to 1"
    fi
    
    if [ -z "$VERSION_NAME" ]; then
        VERSION_NAME="1.0"
        print_warning "Could not find versionName, defaulting to 1.0"
    fi
}

# Function to increment build number
increment_build_number() {
    get_version_info
    NEW_VERSION_CODE=$((VERSION_CODE + 1))
    
    # Update versionCode in build.gradle
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/versionCode $VERSION_CODE/versionCode $NEW_VERSION_CODE/" "$GRADLE_FILE"
    else
        # Linux
        sed -i "s/versionCode $VERSION_CODE/versionCode $NEW_VERSION_CODE/" "$GRADLE_FILE"
    fi
    
    print_success "Build number incremented: $VERSION_CODE → $NEW_VERSION_CODE"
    VERSION_CODE=$NEW_VERSION_CODE
}

# Function to set build number manually
set_build_number() {
    local new_code=$1
    get_version_info
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/versionCode $VERSION_CODE/versionCode $new_code/" "$GRADLE_FILE"
    else
        sed -i "s/versionCode $VERSION_CODE/versionCode $new_code/" "$GRADLE_FILE"
    fi
    
    print_success "Build number set to: $new_code"
    VERSION_CODE=$new_code
}

# Function to clean previous builds
clean_builds() {
    print_info "Cleaning previous builds..."
    cd "$PROJECT_ROOT/android"
    ./gradlew clean
    print_success "Clean completed"
}

# Function to build APK (Debug)
build_apk_debug() {
    print_info "Building Debug APK..."
    cd "$PROJECT_ROOT/android"
    ./gradlew assembleDebug
    
    # Copy APK to builds directory
    APK_PATH="$PROJECT_ROOT/android/app/build/outputs/apk/debug/app-debug.apk"
    if [ -f "$APK_PATH" ]; then
        TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
        NEW_NAME="postify-debug-v${VERSION_NAME}-b${VERSION_CODE}-${TIMESTAMP}.apk"
        cp "$APK_PATH" "$BUILD_DIR/$NEW_NAME"
        print_success "Debug APK built: $BUILD_DIR/$NEW_NAME"
        echo "$BUILD_DIR/$NEW_NAME"
    else
        print_error "APK not found at $APK_PATH"
        exit 1
    fi
}

# Function to build APK (Release)
build_apk_release() {
    print_info "Building Release APK..."
    cd "$PROJECT_ROOT/android"
    ./gradlew assembleRelease
    
    # Copy APK to builds directory
    APK_PATH="$PROJECT_ROOT/android/app/build/outputs/apk/release/app-release.apk"
    if [ -f "$APK_PATH" ]; then
        TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
        NEW_NAME="postify-release-v${VERSION_NAME}-b${VERSION_CODE}-${TIMESTAMP}.apk"
        cp "$APK_PATH" "$BUILD_DIR/$NEW_NAME"
        print_success "Release APK built: $BUILD_DIR/$NEW_NAME"
        echo "$BUILD_DIR/$NEW_NAME"
    else
        print_error "APK not found at $APK_PATH"
        exit 1
    fi
}

# Function to build AAB (Release)
build_aab_release() {
    print_info "Building Release AAB..."
    cd "$PROJECT_ROOT/android"
    ./gradlew bundleRelease
    
    # Copy AAB to builds directory
    AAB_PATH="$PROJECT_ROOT/android/app/build/outputs/bundle/release/app-release.aab"
    if [ -f "$AAB_PATH" ]; then
        TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
        NEW_NAME="postify-release-v${VERSION_NAME}-b${VERSION_CODE}-${TIMESTAMP}.aab"
        cp "$AAB_PATH" "$BUILD_DIR/$NEW_NAME"
        print_success "Release AAB built: $BUILD_DIR/$NEW_NAME"
        echo "$BUILD_DIR/$NEW_NAME"
    else
        print_error "AAB not found at $AAB_PATH"
        exit 1
    fi
}

# Function to show usage
show_usage() {
    echo "Postify Auto Builder"
    echo ""
    echo "Usage: ./build.sh [OPTIONS] [BUILD_TYPE]"
    echo ""
    echo "Build Types:"
    echo "  apk-debug      Build Debug APK"
    echo "  apk-release    Build Release APK"
    echo "  aab-release    Build Release AAB"
    echo "  all            Build all (Debug APK, Release APK, Release AAB)"
    echo ""
    echo "Options:"
    echo "  --increment    Increment build number before building (default)"
    echo "  --no-increment Don't increment build number"
    echo "  --build-number=N  Set build number to N"
    echo "  --clean        Clean before building"
    echo "  --version      Show current version info"
    echo "  --help         Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./build.sh apk-debug              # Build debug APK with auto-increment"
    echo "  ./build.sh --build-number=10 apk-release  # Build release APK with build number 10"
    echo "  ./build.sh --no-increment all     # Build all without incrementing"
    echo "  ./build.sh --clean aab-release     # Clean and build AAB"
}

# Function to show version info
show_version() {
    get_version_info
    echo ""
    echo "Current Version Info:"
    echo "  Version Code: $VERSION_CODE"
    echo "  Version Name: $VERSION_NAME"
    echo ""
}

# Parse arguments
INCREMENT=true
CLEAN=false
BUILD_TYPE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --increment)
            INCREMENT=true
            shift
            ;;
        --no-increment)
            INCREMENT=false
            shift
            ;;
        --build-number=*)
            BUILD_NUMBER="${1#*=}"
            set_build_number "$BUILD_NUMBER"
            INCREMENT=false
            shift
            ;;
        --clean)
            CLEAN=true
            shift
            ;;
        --version)
            show_version
            exit 0
            ;;
        --help|-h)
            show_usage
            exit 0
            ;;
        apk-debug|apk-release|aab-release|all)
            BUILD_TYPE=$1
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# If no build type specified, show usage
if [ -z "$BUILD_TYPE" ]; then
    print_error "No build type specified"
    show_usage
    exit 1
fi

# Main execution
print_info "Starting build process..."
print_info "Project: Postify"
print_info "Build Directory: $BUILD_DIR"

# Get version info
get_version_info
print_info "Current Version: $VERSION_NAME (Build $VERSION_CODE)"

# Increment build number if needed
if [ "$INCREMENT" = true ]; then
    increment_build_number
fi

# Clean if requested
if [ "$CLEAN" = true ]; then
    clean_builds
fi

# Build based on type
case $BUILD_TYPE in
    apk-debug)
        build_apk_debug
        ;;
    apk-release)
        build_apk_release
        ;;
    aab-release)
        build_aab_release
        ;;
    all)
        print_info "Building all variants..."
        build_apk_debug
        build_apk_release
        build_aab_release
        print_success "All builds completed!"
        ;;
esac

# Show summary
echo ""
print_success "Build completed successfully!"
print_info "Build files are in: $BUILD_DIR"
get_version_info
print_info "Final Version: $VERSION_NAME (Build $VERSION_CODE)"
