import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  useColorScheme,
} from 'react-native';

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

  // Test basic API client functionality
  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResults('Testing API structure...');
    
    try {
      const { ApiTester } = require('./src/utils/apiTestUtils');
      const result = await ApiTester.testApiStructure();
      setTestResults(result);
    } catch (error) {
      setTestResults(`❌ Error loading API tests: ${error}`);
    }
    
    setIsLoading(false);
  };

  const testTokenManagement = async () => {
    setIsLoading(true);
    setTestResults('Testing token management...');
    
    try {
      const { ApiTester } = require('./src/utils/apiTestUtils');
      const result = await ApiTester.testTokenOperations();
      setTestResults(result);
    } catch (error) {
      setTestResults(`❌ Token test error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const testNetworkCall = async () => {
    setIsLoading(true);
    setTestResults('Simulating network call...');
    
    try {
      const { ApiTester } = require('./src/utils/apiTestUtils');
      const result = await ApiTester.simulateNetworkCall();
      setTestResults(result);
    } catch (error) {
      setTestResults(`❌ Network test error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const testMockData = async () => {
    setIsLoading(true);
    setTestResults('Generating mock API response...');
    
    try {
      const { ApiTester } = require('./src/utils/apiTestUtils');
      const mockResponse = ApiTester.generateMockApiResponse();
      
      const result = `✅ Mock Response Generated:
📊 Data Items: ${mockResponse.data.length}
📄 Page: ${mockResponse.pagination.page}
📈 Total: ${mockResponse.pagination.total}
📋 Sample Title: "${mockResponse.data[0].title.rendered}"
🎯 Success: ${mockResponse.success}`;
      
      setTestResults(result);
    } catch (error) {
      setTestResults(`❌ Mock data error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const clearResults = () => {
    setTestResults('');
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        
        <Text style={[styles.title, textColor]}>Extra Chill API Test</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={testApiConnection}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Testing...' : 'Test API Structure'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={testTokenManagement}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText, { color: '#007AFF' }]}>
              Test Token Management
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={testNetworkCall}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText, { color: '#34C759' }]}>
              Simulate Network Call
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={testMockData}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText, { color: '#FF9500' }]}>
              Generate Mock Data
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.clearButton]} 
            onPress={clearResults}
          >
            <Text style={[styles.buttonText, { color: '#FF3B30' }]}>
              Clear Results
            </Text>
          </TouchableOpacity>
        </View>
        
        {testResults ? (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, textColor]}>Test Results:</Text>
            <Text style={[styles.resultsText, textColor]}>{testResults}</Text>
          </View>
        ) : null}
        
        <View style={styles.infoContainer}>
          <Text style={[styles.infoTitle, textColor]}>Next Steps:</Text>
          <Text style={[styles.infoText, textColor]}>
            1. Install React Native dependencies{'\n'}
            2. Add AsyncStorage package{'\n'}
            3. Configure WordPress endpoints{'\n'}
            4. Test real API calls
          </Text>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 15,
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
  clearButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF3B30',
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
  infoContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default App;