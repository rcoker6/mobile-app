import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, ActivityIndicator, useColorScheme } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

function LoadingScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}
    >
      <ActivityIndicator size="large" color="#007AFF" />
      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
          color: isDarkMode ? '#fff' : '#000',
        }}
      >
        Loading...
      </Text>
    </View>
  );
}

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : isAuthenticated ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}