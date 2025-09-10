# ExtraChill Mobile App - API System Documentation

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Authentication Flow](#authentication-flow)
- [API Methods](#api-methods)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Next Steps](#next-steps)

## Overview

The API system provides a complete interface between the React Native app and WordPress/bbPress backend. It handles authentication, forum operations, article management, and user profiles with automatic token management and error handling.

## Architecture

Two-layer design with `ApiClient` (base HTTP functionality) extending to `ExtraChillAPI` (WordPress-specific methods):

```typescript
// Base client handles HTTP, tokens, errors, pagination
class ApiClient {
  async get/post/put/delete()     // HTTP methods
  setToken/clearToken()           // Token management
  handleResponse()                // Error handling & pagination
}

// Extended client provides WordPress/bbPress methods
class ExtraChillAPI extends ApiClient {
  login/validateToken()           // Authentication
  getForumTopics/createTopic()    // Forum operations
  getArticles/createComment()     // Article operations
  searchContent()                 // Cross-platform search
}
```

## Authentication Flow

Token-based authentication with secure storage:

1. **App Start**: Load stored token → validate with server
2. **Login**: Send credentials → receive JWT token → store securely
3. **API Calls**: All requests include `Authorization: Bearer <token>`
4. **Logout**: Clear stored token

```typescript
// Complete auth flow
const response = await extraChillAPI.login('username', 'password');
await extraChillAPI.setToken(response.data.token);
// All subsequent API calls are now authenticated
```

## API Methods

### Authentication
```typescript
// Login and store token
const response = await extraChillAPI.login('username', 'password');
await extraChillAPI.setToken(response.data.token);

// Validate existing token
await extraChillAPI.validateToken();

// Get user details
await extraChillAPI.getUserDetails();
```

### Forum Operations  
```typescript
// Get topics with search/pagination
await extraChillAPI.getForumTopics({ 
  page: 1, per_page: 20, search: 'react native' 
});

// Topic details and replies
await extraChillAPI.getTopic(topicId);
await extraChillAPI.getTopicReplies(topicId);

// Create topic/reply
await extraChillAPI.createTopic({ 
  title: 'Title', content: 'Content', forum_id: 123 
});
await extraChillAPI.createReply(topicId, 'Reply content');
```

### Article Operations
```typescript
// Get articles with filters
await extraChillAPI.getArticles({ 
  categories: [1,2], orderby: 'date', order: 'desc' 
});

// Article details and comments
await extraChillAPI.getArticle(articleId);
await extraChillAPI.getArticleComments(articleId);

// Create comment
await extraChillAPI.createComment(articleId, 'Comment text');
```

### Search & Profile
```typescript
// Cross-platform search
await extraChillAPI.searchContent('query', { type: 'all' });

// User profile operations
await extraChillAPI.getUserProfile();
await extraChillAPI.updateProfile({ first_name: 'John' });
```

## Usage Examples

### Complete Workflow
```typescript
// 1. Login flow
const auth = await extraChillAPI.login('user', 'pass');
await extraChillAPI.setToken(auth.data.token);

// 2. Forum interaction
const topics = await extraChillAPI.getForumTopics();
const replies = await extraChillAPI.getTopicReplies(topics.data[0].id);
await extraChillAPI.createReply(topics.data[0].id, 'My response');

// 3. Article browsing
const articles = await extraChillAPI.getArticles({ per_page: 10 });
const article = await extraChillAPI.getArticle(articles.data[0].id);
await extraChillAPI.createComment(article.data.id, 'Great post!');
```

## Error Handling

Structured error handling with status codes and retry patterns:

```typescript
try {
  const topics = await extraChillAPI.getForumTopics();
  setTopics(topics.data);
} catch (error) {
  if (error.status === 401) {
    // Token expired - redirect to login
    await extraChillAPI.clearToken();
    navigation.navigate('Login');
  } else if (error.status >= 500) {
    // Server error - retry logic
    console.error('Server error, retrying...');
  } else {
    // Other errors - show user message
    console.error('API Error:', error.message);
  }
}
```

## Next Steps

1. **Install AsyncStorage**: `npm install @react-native-async-storage/async-storage`
2. **Configure server URL** in `apiClient.ts`
3. **Test with real WordPress endpoints**
4. **Integrate with React Native screens**

**Server Requirements:**
- Authorization header support for Bearer tokens
- CORS configuration for mobile clients  
- Custom PHP endpoints: `seamless-login.php`, `validate-session.php`, `get-user-details.php`

**Endpoints:**
- Custom: `/wp-json/extrachill/v1/*`
- WordPress: `/wp-json/wp/v2/*`
- bbPress: `/wp-json/bbp/v1/*`