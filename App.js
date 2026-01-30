import React from 'react';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from './src/components/ErrorBoundary';
import { AuthProvider } from './src/context/AuthContext';
import { colors } from './src/theme/colors';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  LogBox.ignoreAllLogs(true);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ErrorBoundary
      message="This is the ErrorBoundary fallback UI. The error has been caught and displayed here. This screen demonstrates how errors are handled in the app."
      showReload={true}
      showReport={true}
    >
      <SafeAreaProvider>
        <AuthProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'light-content'}
            backgroundColor={colors.button.primary}
          />
          <AppNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
