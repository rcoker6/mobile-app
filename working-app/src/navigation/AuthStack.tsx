import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ApiTestScreen from '../screens/ApiTestScreen';

export type AuthStackParamList = {
  Login: undefined;
  ApiTest: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ApiTest" component={ApiTestScreen} />
    </Stack.Navigator>
  );
}