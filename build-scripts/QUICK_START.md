# Quick Start Guide

## 🚀 One-Command Builds

```bash
# Debug APK
./build-scripts/build.sh apk-debug

# Release APK
./build-scripts/build.sh apk-release

# Release AAB (Play Store)
./build-scripts/build.sh aab-release

# Build everything
./build-scripts/build.sh all
```

## 📋 Common Commands

```bash
# Build with specific build number
./build-scripts/build.sh --build-number=10 apk-release

# Build without incrementing
./build-scripts/build.sh --no-increment apk-debug

# Clean and build
./build-scripts/build.sh --clean aab-release

# Check current version
./build-scripts/build.sh --version
```

## 📦 Output Location

All builds are saved in: `build-scripts/builds/`

File naming: `postify-[type]-v[version]-b[build]-[timestamp].[ext]`
