import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostListScreen from '../screens/PostListScreen';
import CommentsScreen from '../screens/CommentsScreen';
import EditCommentScreen from '../screens/EditCommentScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PostList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
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
    </NavigationContainer>
  );
};

export default AppNavigator;
