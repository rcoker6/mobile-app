import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { AppStackParamList } from '../navigation/AppStack';

type HomeScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Home'>;

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, logout, isLoading } = useAuth();

  const styles = getStyles(isDarkMode);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to ExtraChill!</Text>
          <Text style={styles.subtitle}>
            {user ? `Hello, ${user.username}!` : 'You are signed in'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>📱 Forum discussions</Text>
            <Text style={styles.featureItem}>📰 Article browsing</Text>
            <Text style={styles.featureItem}>🔍 Content search</Text>
            <Text style={styles.featureItem}>👤 User profiles</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Development Status</Text>
          <Text style={styles.statusText}>
            ✅ Authentication system complete{'\n'}
            ✅ API client ready{'\n'}
            🔄 Waiting for WordPress backend{'\n'}
            📋 Next: Forum and article screens
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.apiTestButton}
            onPress={() => navigation.navigate('ApiTest')}
          >
            <Text style={styles.apiTestButtonText}>
              Test API Client
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={isLoading}
          >
            <Text style={styles.logoutButtonText}>
              {isLoading ? 'Signing Out...' : 'Sign Out'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#000' : '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: isDarkMode ? '#ccc' : '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 15,
  },
  featureList: {
    backgroundColor: isDarkMode ? '#111' : '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  featureItem: {
    fontSize: 16,
    color: isDarkMode ? '#ccc' : '#333',
    marginBottom: 8,
    paddingLeft: 10,
  },
  statusText: {
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#666',
    backgroundColor: isDarkMode ? '#1a1a2e' : '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonGroup: {
    gap: 15,
  },
  apiTestButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  apiTestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});