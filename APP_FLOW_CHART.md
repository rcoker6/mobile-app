# ExtraChill Mobile App Flow Chart

## App Launch Flow
```
📱 App Startup
    ↓
🔍 Check Stored Token (AsyncStorage)
    ↓
┌─── Token Found ────┐         ┌─── No Token ────┐
│                    │         │                 │
↓                    │         ↓                 │
🔐 Validate Token    │         📝 Login Screen   │
    ↓                │             ↓             │
┌─ Valid ──┐ ┌─ Invalid ─┐        🔑 Authentication │
│          │ │           │             ↓          │
↓          │ ↓           │         🏠 Home Screen ←┘
🏠 Home    │ 📝 Login    │
Screen     │ Screen      │
           └─────────────┘
```

## Main Navigation Structure
```
🏠 Home Screen (API Testing Interface)
    ↓
┌───── Current Features ─────┐
│                            │
│ 🧪 Test API Structure      │
│ 🔐 Test Token Management   │
│ 🌐 Test Network Setup      │
│ 📊 View Test Results       │
└────────────────────────────┘
```

## Planned Future Navigation (Based on API & Plan)
```
🔐 Login Screen
    ↓
🏠 Home/Dashboard
    ↓
┌─────────── Main Sections ───────────┐
│                                     │
├─ 💬 Forum Section                   │
│   ├─ 📋 Topic List                  │
│   │   ├─ 🔍 Search Topics           │
│   │   ├─ 📝 Create New Topic        │
│   │   └─ 👆 Select Topic            │
│   │       ↓                         │
│   └─ 📖 Topic Detail View           │
│       ├─ 💭 View Replies            │
│       ├─ ✍️ Create Reply            │
│       └─ 🔙 Back to Topic List      │
│                                     │
├─ 📰 Articles Section                │
│   ├─ 📋 Article List                │
│   │   ├─ 🏷️ Filter by Category      │
│   │   ├─ 🔍 Search Articles         │
│   │   └─ 👆 Select Article          │
│   │       ↓                         │
│   └─ 📖 Article Detail View         │
│       ├─ 💬 View Comments           │
│       ├─ ✍️ Add Comment             │
│       └─ 🔙 Back to Article List    │
│                                     │
├─ 🔍 Search (Global)                 │
│   ├─ 🎯 Search All Content          │
│   ├─ 🗂️ Filter by Type              │
│   └─ 📋 View Search Results         │
│                                     │
├─ 👤 Profile Section                 │
│   ├─ 👁️ View Profile                │
│   ├─ ✏️ Edit Profile                │
│   ├─ 📊 User Activity               │
│   └─ ⚙️ Settings                    │
│                                     │
└─ 🚪 Logout                          │
    ↓                                 │
📝 Return to Login Screen             │
```

## Authentication Flow Detail
```
📝 Login Screen
    ↓
📤 Send Credentials to /wp-json/extrachill/v1/handle_external_login
    ↓
┌─── Success ────┐    ┌─── Error ────┐
│                │    │              │
🎫 Receive JWT   │    ❌ Show Error  │
Token            │    Message       │
    ↓            │        ↓          │
💾 Store in      │    🔄 Retry       │
AsyncStorage     │    Login         │
    ↓            │                   │
🏠 Navigate to   │                   │
Home Screen      │                   │
```

## Data Flow Pattern
```
📱 User Action (Tap/Input)
    ↓
🔄 API Call via ExtraChillAPI
    ↓
┌─── Success ────┐    ┌─── Error ────┐
│                │    │              │
📊 Update UI     │    🚨 Handle Error│
with Data        │    Show Message  │
    ↓            │        ↓          │
💾 Cache Data    │    🔄 Retry or    │
(Optional)       │    Navigate Back │
```

## Screen Breakdown

### Current Implementation
- **App.tsx**: API testing interface with buttons for testing different API functionalities

### Planned Screens

#### Authentication Screens
- **LoginScreen**: Username/password input with community theme integration
- **SplashScreen**: Token validation and app initialization

#### Main Screens
- **HomeScreen/Dashboard**: Navigation hub to main app sections
- **ForumListScreen**: Browse forum topics with search and pagination
- **TopicDetailScreen**: View topic with replies, create new replies
- **CreateTopicScreen**: Form to create new forum topics
- **ArticleListScreen**: Browse articles with category filters
- **ArticleDetailScreen**: Read article with comments
- **SearchScreen**: Global search across content types
- **ProfileScreen**: User profile view and editing
- **SettingsScreen**: App settings and preferences

#### Common Components
- **Navigation**: Bottom tab or drawer navigation
- **Search**: Integrated search functionality
- **Loading**: Loading states and error handling
- **Authentication**: Token management and login prompts

## Current Development Status
- ✅ **Complete**: Base API client, authentication system, token management
- 🚧 **In Progress**: API testing interface (current App.tsx)
- 📋 **Planned**: Navigation structure, screens, UI components

## Key Navigation Notes
1. **Current State**: Single testing screen with API functionality demos
2. **Authentication**: JWT token-based with secure AsyncStorage
3. **Planned Screens**: Login → Home → Forum/Articles → Detail views
4. **Search**: Global search across forums and articles
5. **Profile**: User management and settings
6. **Offline**: Token validation on app start, graceful error handling

## Implementation Priority
1. **Phase 1**: Authentication screens (Login, token validation)
2. **Phase 2**: Forum functionality (topic list, detail view, creation)
3. **Phase 3**: Article functionality (list, detail, comments)
4. **Phase 4**: Search and profile management
5. **Phase 5**: Polish, error handling, offline support