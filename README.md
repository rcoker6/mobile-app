# Extra Chill Mobile App

A React Native mobile application with an organized codebase structure ready for development.

## Overview

This project contains both the architectural planning and a working React Native/Expo application. The app is designed to integrate with WordPress/bbPress backend and features a clean, modular architecture.

## Project Structure

```
mobile-app/                    # Main repository
├── .git/                     # Git repository
├── working-app/             # React Native/Expo application
│   ├── App.tsx             # Main application component
│   ├── src/                # Application source code
│   │   └── services/       # API client and backend services
│   ├── package.json        # React Native dependencies
│   ├── node_modules/       # Installed packages
│   └── app.json           # Expo configuration
├── plan.md                 # Implementation plan
├── API_DOCUMENTATION.md    # API documentation
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Clone the repo
  
  ```
  https://github.com/Extra-Chill/mobile-app.git
  ```
  
- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- Git - [Download here](https://git-scm.com/)

### Testing Platforms

**Platform-specific requirements:**
- **Android Emulator**: Requires Android Studio setup (Windows/Linux/Mac)
- **iOS Simulator**: Requires macOS + Xcode (not available on Windows/Linux)

### iOS Development Setup

If you need to set up iOS testing (macOS only), use this prompt with Claude Code:

```
Help me set up Xcode and the iOS simulator for React Native testing in this codebase. I need you to:

1. Guide me through downloading and installing Xcode from the Mac App Store or Apple Developer site
2. Help me install iOS Simulator runtimes and configure the development environment
3. Create and configure an iPhone simulator device for testing
4. Start the iOS simulator and verify it's working properly
5. Test the setup by running the React Native app on the iOS simulator

Please provide step-by-step guidance and help troubleshoot any issues that come up. This is a React Native/Expo project and all commands should be run from the working-app/ directory.
```

### Android Development Setup

If you need to set up Android testing, use this prompt with Claude Code:

```
Help me set up Android Studio and the Android emulator for React Native testing in this codebase. I need you to:

1. Guide me through downloading and installing Android Studio from https://developer.android.com/studio
2. Help me configure the Android SDK with the required components (Android 14.0 API 34, SDK Build-Tools, Platform-Tools, Android Emulator)
3. Set up the environment variables (ANDROID_HOME and PATH) for my operating system
4. Create an Android Virtual Device (AVD) for testing
5. Test the setup by running the React Native app on the Android emulator

Please provide step-by-step guidance and help troubleshoot any issues that come up. This is a React Native/Expo project and all commands should be run from the working-app/ directory.
```
After the installation:
- run ```npm start``` in the ```working-app``` directory.
- Press 'Y' to confirm the port
- Choose your simulator environment:
  - press i - iOS
  - press a - android
  - press w - web browser
  - or scan the QR with your phone

## Development Workflow

### React Native Development
- **Location**: `working-app/` directory contains the complete React Native application
- **Purpose**: All development, testing, and simulator debugging happens here
- **Structure**: Standard React Native/Expo project with organized source code in `working-app/src/`

### Key Files
- **`working-app/App.tsx`**: Main application entry point (currently "Hello World")
- **`working-app/src/services/apiClient.ts`**: Complete WordPress/bbPress API integration
- **`plan.md`**: Development roadmap and implementation details
- **`API_DOCUMENTATION.md`**: Complete API documentation and usage examples

### Git Workflow
- **Development**: Edit files in `working-app/` and see changes immediately in simulator
- **Committing**: All changes are tracked in the main repository from the root directory

## Project Features

- **WordPress/bbPress Integration**: API client for forum and article functionality
- **React Native + Expo**: Cross-platform mobile development
- **TypeScript**: Type safety and better development experience
- **Modular Architecture**: Clean separation of concerns
- **Hot Reload**: Instant updates during development
- **Dark/Light Mode**: Automatic theme switching

## API Documentation

See `API_DOCUMENTATION.md` for complete API client documentation including:
- Authentication system with Bearer tokens
- WordPress REST API integration
- bbPress forum functionality
- Error handling and pagination
- Usage examples and troubleshooting

## Next Steps

1. **Review the implementation plan**: Check `plan.md` for detailed development roadmap
2. **Understand the API**: Read `API_DOCUMENTATION.md` for backend integration
3. **Start developing**: Use `working-app/` for active React Native development
4. **Test your changes**: Use the iOS simulator for immediate feedback
