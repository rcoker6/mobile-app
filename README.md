# Extra Chill Mobile App

A React Native mobile application with an organized codebase structure ready for development.

## Overview

This is a mobile app built with React Native and Expo, featuring a clean, modular architecture with organized components, screens, and services. The app is designed to be easily extensible and maintainable.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── articles/       # Article-related components
│   ├── common/         # Common UI components (Button, Input)
│   ├── forms/          # Form components
│   └── forum/          # Forum-related components
├── screens/            # App screens
│   ├── articles/       # Article screens
│   ├── auth/           # Authentication screens
│   ├── forum/          # Forum screens
│   └── profile/        # Profile screens
├── navigation/         # Navigation configuration
├── contexts/           # React contexts (AuthContext)
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and helpers
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- Git - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Extra-Chill/mobile-app.git
   cd mobile-app
   ```

2. **Install Expo CLI globally**:
   ```bash
   npm install -g @expo/cli
   ```

3. **Create a new Expo project**:
   ```bash
   npx create-expo-app@latest ExtraChillExpo --template blank-typescript
   cd ExtraChillExpo
   ```

4. **Copy the component structure**:
   ```bash
   cp -r ../mobile-app/src ./
   ```

5. **Install web dependencies**:
   ```bash
   npx expo install react-dom react-native-web @expo/metro-runtime
   ```

6. **Replace the default App.tsx** with your custom content:
   ```bash
   # Copy your custom App.tsx content to ExtraChillExpo/App.tsx
   ```

### Running the App

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Wait for the QR code and options to appear** in your terminal. You'll see:
   ```
   › Press i │ open iOS simulator
   › Press a │ open Android
   › Press w │ open web
   ```

3. **Choose your preferred platform**:
   - **iOS Simulator**: Press `i` in the terminal (requires iOS Simulator setup - see below)
   - **Android Emulator**: Press `a` in the terminal (requires Android Studio setup)
   - **Web Browser**: Press `w` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app

## iOS Simulator Setup

If you encounter "No iOS devices available" error when pressing `i`:

1. **Install Xcode** (if not already installed):
   - Download from Mac App Store or [Apple Developer](https://developer.apple.com/xcode/)

2. **Install iOS Simulator runtimes**:
   ```bash
   xcodebuild -downloadAllPlatforms
   ```
   *Note: This downloads ~8GB and may take 10-15 minutes*

3. **Create an iPhone simulator**:
   ```bash
   xcrun simctl create "iPhone 15" "iPhone 15" "iOS18.6"
   ```

4. **Start the simulator**:
   ```bash
   xcrun simctl boot "iPhone 15"
   open -a Simulator
   ```

5. **Verify the simulator is running**:
   - You should see an iPhone 15 simulator window open
   - The simulator should show the iOS home screen

6. **Run your app**:
   ```bash
   npm start
   # Wait for the options to appear, then press 'i'
   ```

## Android Emulator Setup

If you want to test on Android:

1. **Install Android Studio**:
   - Download from [developer.android.com](https://developer.android.com/studio)

2. **Set up Android SDK**:
   - Open Android Studio
   - Go to Tools → SDK Manager
   - Install Android SDK Platform and Android SDK Build-Tools

3. **Create an Android Virtual Device (AVD)**:
   - Open Android Studio
   - Go to Tools → AVD Manager
   - Create a new virtual device

4. **Start the emulator**:
   - Launch the AVD from Android Studio
   - Or run: `emulator -avd <your_avd_name>`

5. **Run your app**:
   ```bash
   npm start
   # Wait for the options to appear, then press 'a'
   ```

## Development

The app uses:
- **React Native** for cross-platform mobile development
- **Expo** for simplified development and testing
- **TypeScript** for type safety
- **Modular architecture** for maintainability

## Features

- Dark/Light mode support
- Organized component structure
- Ready for authentication implementation
- Forum and article functionality
- Profile management
- Clean navigation structure
