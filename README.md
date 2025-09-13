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

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- Git - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Extra-Chill/mobile-app.git
   cd mobile-app
   ```

2. **Navigate to the working app directory**:
   ```bash
   cd working-app
   ```

3. **Install project dependencies**:
   ```bash
   npm install
   ```

### Running the App

**Start the development server**:
```bash
npm start
```

3. **Wait for the QR code and options to appear** in your terminal. You'll see:
   ```
   › Press i │ open iOS simulator
   › Press a │ open Android
   › Press w │ open web
   ```

4. **Choose your preferred platform**:
   - **iOS Simulator**: Press `i` in the terminal (requires iOS Simulator setup - see below)
   - **Android Emulator**: Press `a` in the terminal (requires Android Studio setup)
   - **Web Browser**: Press `w` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app

### Making Changes

- **Edit the app**: Modify files in `working-app/App.tsx`
- **See changes**: Hot reload will update the simulator automatically
- **Commit changes**: From the main `mobile-app/` directory, use git as normal

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
   cd working-app
   npm start
   # Wait for the options to appear, then press 'i'
   ```

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
