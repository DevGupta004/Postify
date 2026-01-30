import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { colors } from './src/theme/colors';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'light-content'}
          backgroundColor={colors.button.primary}
        />
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
