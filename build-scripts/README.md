# Postify Auto Builder

Automated build scripts for generating APK and AAB files with build number management.

## 📁 Structure

```
build-scripts/
├── build.sh          # Main build script
├── builds/           # Output directory for built files
└── README.md         # This file
```

## 🚀 Quick Start

### Make script executable
```bash
chmod +x build-scripts/build.sh
```

### Build Examples

**Build Debug APK (auto-increment build number):**
```bash
./build-scripts/build.sh apk-debug
```

**Build Release APK:**
```bash
./build-scripts/build.sh apk-release
```

**Build Release AAB (for Play Store):**
```bash
./build-scripts/build.sh aab-release
```

**Build everything:**
```bash
./build-scripts/build.sh all
```

## 📋 Build Types

- `apk-debug` - Debug APK for testing
- `apk-release` - Release APK for distribution
- `aab-release` - Release AAB bundle for Google Play Store
- `all` - Build all variants

## ⚙️ Options

### Build Number Management

**Auto-increment (default):**
```bash
./build-scripts/build.sh apk-release
```

**Don't increment:**
```bash
./build-scripts/build.sh --no-increment apk-release
```

**Set specific build number:**
```bash
./build-scripts/build.sh --build-number=10 apk-release
```

### Other Options

**Clean before building:**
```bash
./build-scripts/build.sh --clean apk-release
```

**Show current version:**
```bash
./build-scripts/build.sh --version
```

**Show help:**
```bash
./build-scripts/build.sh --help
```

## 📦 Output Files

All built files are saved in `build-scripts/builds/` with the following naming convention:

```
postify-[type]-v[version]-b[build]-[timestamp].[ext]
```

Examples:
- `postify-debug-v1.0-b5-20250129_143022.apk`
- `postify-release-v1.0-b5-20250129_143022.apk`
- `postify-release-v1.0-b5-20250129_143022.aab`

## 🔧 How It Works

1. **Reads version info** from `android/app/build.gradle`
2. **Increments build number** (unless `--no-increment` is used)
3. **Updates build.gradle** with new build number
4. **Runs Gradle build** commands
5. **Copies output files** to `builds/` directory with timestamp

## 📝 Notes

- Build numbers are automatically incremented by default
- Version name comes from `build.gradle` (`versionName`)
- Version code (build number) is managed automatically
- All builds are timestamped for easy tracking
- The script uses the debug keystore for signing (update `build.gradle` for production signing)

## 🔐 Production Signing

For production releases, update `android/app/build.gradle` to use your production keystore:

```gradle
signingConfigs {
    release {
        storeFile file('path/to/your-release-key.keystore')
        storePassword 'your-store-password'
        keyAlias 'your-key-alias'
        keyPassword 'your-key-password'
    }
}
```

## 🐛 Troubleshooting

**Permission denied:**
```bash
chmod +x build-scripts/build.sh
```

**Gradle not found:**
Make sure you're running from the project root directory.

**Build fails:**
- Check that Android SDK is properly configured
- Ensure all dependencies are installed (`yarn install`)
- Try cleaning first: `./build-scripts/build.sh --clean apk-debug`
