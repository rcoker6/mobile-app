import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ApiResponse<T = any> {
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

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = 'https://community.extrachill.com') {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  private async loadToken(): Promise<void> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      this.token = token;
    } catch (error) {
      console.warn('Failed to load token from storage:', error);
    }
  }

  public async setToken(token: string): Promise<void> {
    this.token = token;
    try {
      await AsyncStorage.setItem('auth_token', token);
    } catch (error) {
      console.warn('Failed to save token to storage:', error);
    }
  }

  public async clearToken(): Promise<void> {
    this.token = null;
    try {
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      console.warn('Failed to remove token from storage:', error);
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('Content-Type') || '';
    
    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}`;
      
      try {
        if (contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } else {
          errorMessage = await response.text() || errorMessage;
        }
      } catch (parseError) {
        // Keep default error message if parsing fails
      }

      const apiError: ApiError = {
        message: errorMessage,
        status: response.status,
      };
      
      throw apiError;
    }

    if (contentType.includes('application/json')) {
      const data = await response.json();
      
      // Extract pagination info from headers if available
      const totalHeader = response.headers.get('X-WP-Total');
      const totalPagesHeader = response.headers.get('X-WP-TotalPages');
      
      const result: ApiResponse<T> = {
        data,
        success: true,
      };

      if (totalHeader && totalPagesHeader) {
        const url = new URL(response.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const perPage = parseInt(url.searchParams.get('per_page') || '10');
        
        result.pagination = {
          page,
          per_page: perPage,
          total: parseInt(totalHeader),
          total_pages: parseInt(totalPagesHeader),
        };
      }

      return result;
    }

    return {
      data: await response.text() as T,
      success: true,
    };
  }

  public async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  public async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  public async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }
}

// WordPress/bbPress specific API service methods
export class ExtraChillAPI extends ApiClient {
  
  // Authentication endpoints
  async login(username: string, password: string) {
    return this.post('/wp-json/extrachill/v1/handle_external_login', {
      username,
      password,
    });
  }

  async validateToken() {
    return this.get('/wp-json/extrachill/v1/validate_token');
  }

  async getUserDetails() {
    return this.get('/wp-json/extrachill/v1/user_details');
  }

  // Forum endpoints (bbPress)
  async getForumTopics(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    forum_id?: number;
  }) {
    return this.get('/wp-json/bbp/v1/topics', params);
  }

  async getTopicReplies(topicId: number, params?: {
    page?: number;
    per_page?: number;
  }) {
    return this.get(`/wp-json/bbp/v1/topics/${topicId}/replies`, params);
  }

  async getTopic(topicId: number) {
    return this.get(`/wp-json/bbp/v1/topics/${topicId}`);
  }

  async createTopic(data: {
    title: string;
    content: string;
    forum_id: number;
  }) {
    return this.post('/wp-json/bbp/v1/topics', data);
  }

  async createReply(topicId: number, content: string) {
    return this.post(`/wp-json/bbp/v1/topics/${topicId}/replies`, {
      content,
    });
  }

  async getForums(params?: {
    page?: number;
    per_page?: number;
  }) {
    return this.get('/wp-json/bbp/v1/forums', params);
  }

  // Article endpoints (WordPress posts)
  async getArticles(params?: {
    page?: number;
    per_page?: number;
    categories?: number[];
    search?: string;
    orderby?: 'date' | 'title' | 'modified';
    order?: 'asc' | 'desc';
  }) {
    return this.get('/wp-json/wp/v2/posts', params);
  }

  async getArticle(postId: number) {
    return this.get(`/wp-json/wp/v2/posts/${postId}`);
  }

  async getArticleComments(postId: number, params?: {
    page?: number;
    per_page?: number;
  }) {
    return this.get('/wp-json/wp/v2/comments', {
      post: postId,
      ...params,
    });
  }

  async createComment(postId: number, content: string, parentId?: number) {
    return this.post('/wp-json/wp/v2/comments', {
      post: postId,
      content,
      parent: parentId,
    });
  }

  // Categories
  async getCategories(params?: {
    page?: number;
    per_page?: number;
  }) {
    return this.get('/wp-json/wp/v2/categories', params);
  }

  // Search functionality
  async searchContent(query: string, params?: {
    type?: 'post' | 'topic' | 'all';
    page?: number;
    per_page?: number;
  }) {
    const searchParams = {
      search: query,
      ...params,
    };

    if (params?.type === 'topic') {
      return this.getForumTopics(searchParams);
    } else if (params?.type === 'post') {
      return this.getArticles(searchParams);
    } else {
      // Search both - you might want to implement a custom endpoint for this
      const [posts, topics] = await Promise.all([
        this.getArticles(searchParams).catch(() => ({ data: [], success: false })),
        this.getForumTopics(searchParams).catch(() => ({ data: [], success: false })),
      ]);

      return {
        data: {
          posts: posts.data,
          topics: topics.data,
        },
        success: true,
      };
    }
  }

  // User profile endpoints
  async updateProfile(data: {
    first_name?: string;
    last_name?: string;
    description?: string;
  }) {
    return this.post('/wp-json/wp/v2/users/me', data);
  }

  async getUserProfile(userId?: number) {
    const endpoint = userId 
      ? `/wp-json/wp/v2/users/${userId}`
      : '/wp-json/wp/v2/users/me';
    
    return this.get(endpoint);
  }
}

export const apiClient = new ApiClient();
export const extraChillAPI = new ExtraChillAPI();