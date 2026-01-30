# Postify

A React Native mobile application for viewing posts and comments with authentication flow.

## Prerequisites

- Node.js >= 20
- React Native development environment
- For iOS: Xcode and CocoaPods (macOS only)
- For Android: Android Studio and JDK

## Installation

1. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

2. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Running the App

**Start Metro bundler:**
```bash
yarn start
# or
npm start
```

**Run on Android:**
```bash
yarn android
# or
npm run android
```

**Run on iOS:**
```bash
yarn ios
# or
npm run ios
```

## Building Release APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`
