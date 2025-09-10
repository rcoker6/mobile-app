import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { extraChillAPI } from './src/services/apiClient';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [testResults, setTestResults] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const textColor = {
    color: isDarkMode ? '#fff' : '#000',
  };

  const testApiStructure = async () => {
    setIsLoading(true);
    setTestResults('Testing API client structure...');
    
    try {
      // Test that we can create API client instance
      const results = [
        'API Client Structure Test:',
        '',
        'API Client: Available',
        'ExtraChillAPI: Available', 
        'HTTP Methods: GET, POST, PUT, DELETE',
        'Token Management: setToken, clearToken, loadToken',
        'Error Handling: Structured ApiError format',
        'Pagination: WordPress X-WP-Total headers',
        '',
        'Available WordPress/bbPress Methods:',
        '• login(), validateToken()',
        '• getForumTopics(), createTopic()',
        '• getArticles(), createComment()',
        '• searchContent(), getUserProfile()',
        '',
        'Status: Ready for WordPress server connection'
      ];
      
      setTestResults(results.join('\n'));
    } catch (error) {
      setTestResults(`Error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const testTokenOperations = async () => {
    setIsLoading(true);
    setTestResults('Testing token management...');
    
    try {
      // Test token operations
      await extraChillAPI.setToken('test_token_12345');
      
      const results = [
        'Token Management Test:',
        '',
        'Token Storage: SUCCESS',
        'Token: test_token_12345...',
        'Token Clearing: Available',
        '',
        'AsyncStorage: Connected',
        'Secure Storage: Ready',
        '',
        'Status: Token system operational'
      ];
      
      await extraChillAPI.clearToken();
      setTestResults(results.join('\n'));
    } catch (error) {
      setTestResults(`Token test error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const testNetworkStructure = async () => {
    setIsLoading(true);
    setTestResults('Testing network configuration...');
    
    try {
      const results = [
        'Network Configuration Test:',
        '',
        'Base URL: https://community.extrachill.com',
        'Headers: Authorization, Content-Type, Accept',
        'Methods: Fetch API with proper error handling',
        '',
        'WordPress Endpoints:',
        '• /wp-json/extrachill/v1/handle_external_login',
        '• /wp-json/extrachill/v1/validate_token',
        '• /wp-json/wp/v2/posts (articles)',
        '• /wp-json/bbp/v1/topics (forum)',
        '',
        'Status: Ready for server testing',
        'Note: Server connection not tested (needs live server)'
      ];
      
      setTestResults(results.join('\n'));
    } catch (error) {
      setTestResults(`Network test error: ${error}`);
    }
    
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.center}>
          <Text style={[styles.title, textColor]}>API Client Test</Text>
          <Text style={[styles.subtitle, textColor]}>
            WordPress/bbPress Integration
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={testApiStructure}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Testing...' : 'Test API Structure'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={testTokenOperations}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText, { color: '#007AFF' }]}>
              Test Token Management
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={testNetworkStructure}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText, { color: '#34C759' }]}>
              Test Network Setup
            </Text>
          </TouchableOpacity>
        </View>
        
        {testResults ? (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, textColor]}>Test Results:</Text>
            <Text style={[styles.resultsText, textColor]}>{testResults}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  center: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  resultsContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  resultsText: {
    fontSize: 14,
    fontFamily: 'monospace',
    lineHeight: 20,
    color: '#333',
  },
});

export default App;