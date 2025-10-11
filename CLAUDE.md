# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a React Native/Expo mobile application:

```
mobile-app/                    # Main repository (React Native/Expo application)
├── App.tsx                   # Main application component
├── src/services/             # API client and backend services
├── package.json              # React Native dependencies
├── app.json                  # Expo configuration
├── plan.md                   # Implementation plan
├── API_DOCUMENTATION.md      # API documentation
└── README.md                # Project documentation
```

## Development Commands

All commands are run from the root directory:

```bash
# Start the development server
npm start

# Platform-specific builds
npm run android    # Android emulator (requires Android Studio setup)
npm run ios        # iOS simulator (Mac only, requires Xcode)
npm run web        # Web browser (works immediately)

# Install dependencies
npm install

# Update packages to latest compatible versions
npx expo install --fix
```

## Architecture Overview

### Two-Layer API System
- `ApiClient` (base class): HTTP methods, token management, error handling, pagination
- `ExtraChillAPI` (extended class): WordPress/bbPress-specific methods
- Located in: `src/services/apiClient.ts`

### Authentication Flow
- JWT token-based authentication with AsyncStorage persistence
- Bearer token headers for all authenticated requests
- Automatic token validation on app start

### Key Components
- **App.tsx**: Main application with API testing interface
- **apiClient.ts**: Complete WordPress/bbPress API integration
- **AsyncStorage**: Secure token storage (requires `@react-native-async-storage/async-storage`)

## Backend Integration

### API Endpoints
- Custom endpoints: `/wp-json/extrachill/v1/*`
- WordPress REST API: `/wp-json/wp/v2/*`
- bbPress API: `/wp-json/bbp/v1/*`
- Base URL: `https://community.extrachill.com`

### Key Features
- Forum topics and replies (bbPress)
- Article management (WordPress posts)
- User authentication and profiles
- Cross-platform search functionality
- Automatic pagination handling

## Development Notes

- TypeScript enabled with strict mode
- Expo SDK ~54.0.0
- React Native 0.81.4
- New Architecture enabled in app.json
- No existing CLAUDE.md file was found

## Testing

The App.tsx currently includes API testing functionality with buttons to:
- Test API structure
- Test token management
- Simulate network calls
- Generate mock data

## Testing Platforms

**Available on all platforms:**
- **Web Browser**: `npm start` → press `w` (instant, no setup required)
- **Physical Devices**: `npm start` → scan QR code with Expo Go app

**Platform-specific requirements:**
- **Android Emulator**: Requires Android Studio setup (Windows/Linux/Mac)
  - First build: 3-5 minutes (downloads Gradle + dependencies)
  - Subsequent builds: ~30 seconds
  - Command: `npm run android`
- **iOS Simulator**: Requires macOS + Xcode (not available on Windows/Linux)
  - Command: `npm run ios`

## Android Development Setup

### Quick Setup Prompt for New Developers

If a developer needs to set up Android testing, provide them with this prompt to copy-paste:

```
Help me set up Android Studio and the Android emulator for React Native testing in this codebase. I need you to:

1. Guide me through downloading and installing Android Studio from https://developer.android.com/studio
2. Help me configure the Android SDK with the required components (Android 14.0 API 34, SDK Build-Tools, Platform-Tools, Android Emulator)
3. Set up the environment variables (ANDROID_HOME and PATH) for my operating system
4. Create an Android Virtual Device (AVD) for testing
5. Test the setup by running the React Native app on the Android emulator

Please provide step-by-step guidance and help troubleshoot any issues that come up. This is a React Native/Expo project and all commands should be run from the root directory.
```

**Prerequisites (after setup):**
- Android Studio installed with Android SDK
- Environment variables: `ANDROID_HOME`, PATH includes `platform-tools` and `emulator`
- Android Virtual Device (AVD) created

**Environment Variables (Windows):**
```bash
ANDROID_HOME=C:\Users\[Username]\AppData\Local\Android\Sdk
PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator
```

**Common Android Commands:**
```bash
# Check connected devices
adb devices

# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd [AVD_NAME]

# Build and deploy to Android
npm run android
```

## Common Tasks

When working with this codebase:
1. Use `npm start` to run the development server
2. API changes go in `src/services/apiClient.ts`
3. Main UI is in `App.tsx`
4. For Android testing: ensure Android Studio is set up per README.md
5. First Android builds take 3-5 minutes; subsequent builds are much faster
6. Refer to `API_DOCUMENTATION.md` for complete API usage examples