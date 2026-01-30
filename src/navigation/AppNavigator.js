import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import OTPScreen from '../screens/OTPScreen';
import PostListScreen from '../screens/PostListScreen';
import CommentsScreen from '../screens/CommentsScreen';
import EditCommentScreen from '../screens/EditCommentScreen';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

// Auth Stack Navigator (for unauthenticated users)
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <AuthStack.Screen name="OTP" component={OTPScreen} />
    </AuthStack.Navigator>
  );
};

// Main App Navigator (for authenticated users)
const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PostList"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.button.primary,
        },
        headerTintColor: colors.button.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="PostList"
        component={PostListScreen}
        options={{
          title: 'Posts',
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: 'Comments',
        }}
      />
      <Stack.Screen
        name="EditComment"
        component={EditCommentScreen}
        options={{
          title: 'Edit Comment',
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background.primary }}>
        <ActivityIndicator size="large" color={colors.button.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
