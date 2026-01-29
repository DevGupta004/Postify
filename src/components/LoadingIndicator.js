import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { loadingStyles } from './LoadingIndicator.styles';

/**
 * Reusable loading indicator component
 * @param {string} message - Optional message to display below the spinner
 */
const LoadingIndicator = ({ message = 'Loading...' }) => {
  return (
    <View style={loadingStyles.container}>
      <ActivityIndicator size="large" color="#6200ee" />
      {message && <Text style={loadingStyles.message}>{message}</Text>}
    </View>
  );
};

export default LoadingIndicator;
