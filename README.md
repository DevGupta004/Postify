# Postify

A React Native mobile application for viewing posts and comments with the ability to edit comments. Built with React Native, Zustand for state management, and React Navigation.

## 📋 Features

- View list of posts
- View comments for each post
- Edit comments with validation
- Optimized performance with memoization
- Clean, modern UI

## 🏗️ Project Structure

```
Postify/
├── 📱 Root Configuration Files
│   ├── App.js                    # Main app entry point
│   ├── index.js                  # App registration
│   ├── package.json              # Dependencies & scripts
│   ├── app.json                  # App configuration
│   ├── babel.config.js           # Babel configuration
│   ├── metro.config.js           # Metro bundler config
│   ├── jest.config.js            # Jest test configuration
│   ├── yarn.lock                 # Dependency lock file
│   ├── Gemfile                   # Ruby dependencies (iOS)
│   └── README.md                 # Project documentation
│
├── 📂 src/                       # Source code directory
│   ├── 📂 components/           # Reusable UI components
│   │   ├── CommentItem.js
│   │   ├── CommentItem.styles.jsx
│   │   ├── LoadingIndicator.js
│   │   ├── LoadingIndicator.styles.jsx
│   │   ├── PostItem.js
│   │   └── PostItem.styles.jsx
│   │
│   ├── 📂 screens/              # Screen components
│   │   ├── PostListScreen.js
│   │   ├── PostListScreen.styles.jsx
│   │   ├── CommentsScreen.js
│   │   ├── CommentsScreen.styles.jsx
│   │   ├── EditCommentScreen.js
│   │   └── EditCommentScreen.styles.jsx
│   │
│   ├── 📂 navigation/           # Navigation setup
│   │   └── AppNavigator.js
│   │
│   ├── 📂 services/             # API & business logic
│   │   └── 📂 api/
│   │       ├── postService.js          # API service (fetchPosts, fetchComments, updateComment)
│   │       ├── mockData.js             # Mock data for testing
│   │       └── 📂 __tests__/
│   │           └── postService.test.js  # API service tests
│   │
│   ├── 📂 store/                # State management
│   │   └── postStore.js         # Zustand store (posts, comments state)
│   │
│   ├── 📂 hooks/                # Custom React hooks (empty)
│   └── 📂 utils/                # Utility functions (empty)
│
├── 📂 android/                  # Android native code
│   ├── app/
│   │   ├── src/main/           # Android source files
│   │   └── build.gradle        # Android build config
│   ├── build.gradle
│   └── gradle/                  # Gradle wrapper
│
├── 📂 ios/                      # iOS native code
│   ├── Postify/
│   │   ├── AppDelegate.swift
│   │   ├── Info.plist
│   │   └── Images.xcassets/    # App icons
│   ├── Postify.xcodeproj/       # Xcode project
│   └── Podfile                  # CocoaPods dependencies
│
└── 📂 __tests__/               # Test files (root level)
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js >= 20
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and JDK

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd Postify
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start Metro bundler**
   ```bash
   yarn start
   # or
   npm start
   ```

5. **Run the app**

   For Android:
   ```bash
   yarn android
   # or
   npm run android
   ```

   For iOS:
   ```bash
   yarn ios
   # or
   npm run ios
   ```

## 📜 Available Scripts

- `yarn start` - Start Metro bundler
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS simulator/device
- `yarn test` - Run Jest tests
- `yarn lint` - Run ESLint

## 🔨 Building Apps

Use the simple build scripts in `Auto-App-Builder/`:

```bash
# Build Android Debug APK
./Auto-App-Builder/android-debug-builder.sh

# Build iOS Debug (macOS only)
./Auto-App-Builder/ios-debug-builder.sh
```

**Features:**
- Automatic build number management
- Timestamped output files
- Organized build outputs in `Auto-App-Builder/builds/`
- Simple and smart - just run and go!

## 🛠️ Tech Stack

- **React Native** 0.83.1
- **React** 19.2.0
- **Zustand** 4.4.7 - State management
- **React Navigation** 6.x - Navigation
- **Jest** - Testing framework

## 📡 API

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock API:

- `GET /posts` - Fetch all posts
- `GET /posts/{postId}/comments` - Fetch comments for a post
- `PUT /comments/{commentId}` - Update a comment (mock, doesn't persist)

## 🏛️ Architecture

- **State Management:** Zustand (`src/store/postStore.js`)
- **API Layer:** Service functions in `src/services/api/postService.js`
- **Navigation:** React Navigation (`src/navigation/AppNavigator.js`)
- **Styling:** Separate `.styles.jsx` files per component/screen
- **Testing:** Jest with test files in `__tests__/` directories

## 📝 Notes

- JSONPlaceholder is a mock API and doesn't persist changes
- Updated comments are stored in local state for immediate UI updates
- The app includes comprehensive logging for debugging API calls
