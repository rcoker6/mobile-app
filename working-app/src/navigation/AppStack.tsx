import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ApiTestScreen from '../screens/ApiTestScreen';

export type AppStackParamList = {
  Home: undefined;
  ApiTest: undefined;
  // Future screens will be added here:
  // Forums: undefined;
  // Articles: undefined;
  // Profile: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ApiTest" component={ApiTestScreen} />
    </Stack.Navigator>
  );
}