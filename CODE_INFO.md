# CODE_INFO.md

## Project Overview

This is a React Native/Expo mobile application designed to provide a cross-platform mobile experience for the ExtraChill community platform. The app integrates with WordPress and bbPress backends to deliver forum and article functionality.

## Setup & Running

**Prerequisites:**
- Node.js (v16 or higher)
- npm (comes with Node.js)

**Setup Steps:**
1. Navigate to the working app directory: `cd working-app`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

**Platform Options:**
- Press `i` for iOS simulator
- Press `a` for Android emulator  
- Press `w` for web browser
- Scan QR code with Expo Go app for physical device

## Code Structure & Flow

### 1. Project Architecture

**Main Directory Structure:**
- `App.tsx` - Main application entry point and test interface
- `src/services/apiClient.ts` - Complete API client for WordPress/bbPress integration
- `package.json` - React Native/Expo dependencies and scripts

### 2. API Client System (`src/services/apiClient.ts`)

#### Base ApiClient Class (`apiClient.ts:21`)
- **HTTP Methods**: GET, POST, PUT, DELETE operations
- **Base URL**: `https://community.extrachill.com`
- **Headers Management**: Content-Type, Accept, Authorization headers
- **Error Handling** (`apiClient.ts:70`): Structured ApiError with status codes and messages
- **Response Handling**: JSON parsing with pagination support

#### Token Management (`apiClient.ts:39`)
- **Secure Storage**: Uses AsyncStorage for token persistence
- **Methods**:
  - `setToken()` - Store authentication token
  - `clearToken()` - Remove stored token
  - `loadToken()` - Retrieve token on app startup

#### Pagination Support (`apiClient.ts:98`)
- **WordPress Headers**: Extracts `X-WP-Total` and `X-WP-TotalPages`
- **URL Parameters**: Handles `page` and `per_page` query params
- **Response Format**: Structured pagination metadata

### 3. WordPress/bbPress Integration (`apiClient.ts:179`)

#### ExtraChillAPI Class Extensions

**Authentication Endpoints:**
- `login(username, password)` (`apiClient.ts:182`) → `/wp-json/extrachill/v1/handle_external_login`
- `validateToken()` (`apiClient.ts:189`) → `/wp-json/extrachill/v1/validate_token`
- `getUserDetails()` (`apiClient.ts:193`) → `/wp-json/extrachill/v1/user_details`

**Forum Features (bbPress Integration):**
- `getForumTopics()` (`apiClient.ts:198`) → `/wp-json/bbp/v1/topics`
- `getTopic(topicId)` (`apiClient.ts:214`) → `/wp-json/bbp/v1/topics/{id}`
- `createTopic()` (`apiClient.ts:218`) → POST to `/wp-json/bbp/v1/topics`
- `getTopicReplies()` (`apiClient.ts:207`) → `/wp-json/bbp/v1/topics/{id}/replies`
- `createReply()` (`apiClient.ts:226`) → POST to `/wp-json/bbp/v1/topics/{id}/replies`
- `getForums()` (`apiClient.ts:232`) → `/wp-json/bbp/v1/forums`

**Article Management (WordPress Posts):**
- `getArticles()` (`apiClient.ts:240`) → `/wp-json/wp/v2/posts`
- `getArticle(postId)` (`apiClient.ts:251`) → `/wp-json/wp/v2/posts/{id}`
- `getArticleComments()` (`apiClient.ts:255`) → `/wp-json/wp/v2/comments`
- `createComment()` (`apiClient.ts:265`) → POST to `/wp-json/wp/v2/comments`
- `getCategories()` (`apiClient.ts:274`) → `/wp-json/wp/v2/categories`

**Search Functionality:**
- `searchContent()` (`apiClient.ts:282`) - Unified search across posts and topics
- **Search Types**: `'post'`, `'topic'`, or `'all'`
- **Parallel Search**: Combines WordPress posts and bbPress topics

**User Profile Management:**
- `getUserProfile()` (`apiClient.ts:322`) → `/wp-json/wp/v2/users/me` or `/wp-json/wp/v2/users/{id}`
- `updateProfile()` (`apiClient.ts:314`) → POST to `/wp-json/wp/v2/users/me`

### 4. Main Application Interface (`App.tsx`)

#### Current Implementation
The app currently displays a **test interface** with three main testing functions:

**API Structure Test** (`App.tsx:26`):
- Validates API client class availability
- Lists available methods and endpoints
- Confirms WordPress/bbPress integration readiness

**Token Management Test** (`App.tsx:59`):
- Tests secure token storage with AsyncStorage
- Demonstrates token setting and clearing operations
- Validates token persistence system

**Network Configuration Test** (`App.tsx:89`):
- Displays configured endpoints and headers
- Shows WordPress REST API endpoint structure
- Validates network setup without making live requests

#### UI Components
- **Dark/Light Mode Support** (`App.tsx:14`): Automatic theme detection
- **Loading States** (`App.tsx:16`): Button disable during operations
- **Results Display** (`App.tsx:161`): Formatted test output with monospace font
- **Responsive Layout**: SafeAreaView with ScrollView for all screen sizes

### 5. Target Integration Points

Based on `plan.md`, the app is designed to integrate with:

**Primary Targets:**
- **Community Forum**: `community.extrachill.com` (bbPress)
- **Article Platform**: `extrachill.com` (WordPress)
- **Future E-commerce**: `shop.extrachill.com` (WooCommerce - Phase 2)

**Server-Side Requirements:**
- Custom WordPress endpoints in `extrachill-integration/` directory
- Authorization header support for mobile clients
- bbPress REST API extensions
- Session token validation system

### 6. Development Workflow

**Current Status**: Development/Testing Phase
- API client implementation complete
- Test interface functional
- Ready for UI component development

**Next Development Steps:**
1. Implement actual forum browsing UI
2. Add article listing and reading interface
3. Create user authentication flow
4. Add topic/reply creation forms
5. Implement search functionality UI

**Testing Approach:**
- API client testing via current test interface
- Component testing for UI elements
- Integration testing with live WordPress/bbPress endpoints

## Key Features & Capabilities

### Completed Infrastructure
- ✅ Complete WordPress/bbPress API client
- ✅ Secure token storage and management
- ✅ Error handling and pagination support
- ✅ Cross-platform React Native/Expo setup
- ✅ Dark/Light mode support

### Ready for Implementation
- 🔄 Forum browsing and topic management
- 🔄 Article reading and commenting
- 🔄 User authentication and profile management
- 🔄 Search across content types
- 🔄 Offline caching and synchronization

### Future Enhancements
- 📋 Push notifications
- 📋 WooCommerce store integration
- 📋 Advanced offline support
- 📋 Native ad integration alternatives

## API Response Structures

All API methods return standardized `ApiResponse<T>` objects:

```typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
```

Error handling via structured `ApiError` objects:

```typescript
interface ApiError {
  message: string;
  status: number;
  code?: string;
}
```

## Dependencies

**Core Dependencies:**
- `expo` ~54.0.0 - React Native framework
- `react` 19.1.0 - Core React library
- `react-native` 0.81.4 - Mobile platform
- `@react-native-async-storage/async-storage` ^2.2.0 - Secure storage

**Development Dependencies:**
- `typescript` ~5.9.2 - Type safety
- `@types/react` ~19.1.0 - React type definitions

## Current App State

The application is **functional and ready for feature development**. The test interface allows validation of all API client capabilities without requiring a live server connection. The foundation is solid for building the complete forum and article browsing experience.