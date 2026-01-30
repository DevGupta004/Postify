import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { errorBoundaryStyles } from './ErrorBoundary.styles';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Store error details in state
    this.setState({
      error,
      errorInfo,
    });

    // In production, you could log to an error reporting service here
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Call optional retry callback if provided
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  handleReload = () => {
    // Reload the app (useful for critical errors)
    if (this.props.onReload) {
      this.props.onReload();
    } else {
      // Fallback: reset error state
      this.handleRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Default error UI
      return (
        <SafeAreaView style={errorBoundaryStyles.container} edges={['top', 'bottom']}>
          <ScrollView
            contentContainerStyle={errorBoundaryStyles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={errorBoundaryStyles.content}>
              <View style={errorBoundaryStyles.iconContainer}>
                <Text style={errorBoundaryStyles.icon}>⚠️</Text>
              </View>

              <Text style={errorBoundaryStyles.title}>Error Boundary Test Screen</Text>
              
              <Text style={errorBoundaryStyles.message}>
                {this.props.message ||
                  "This is the ErrorBoundary fallback UI. The error has been caught and displayed here. This screen demonstrates how errors are handled in the app."}
              </Text>

              {__DEV__ && this.state.error && (
                <View style={errorBoundaryStyles.errorDetails}>
                  <Text style={errorBoundaryStyles.errorTitle}>Error Details (Dev Only):</Text>
                  <ScrollView
                    style={errorBoundaryStyles.errorScrollView}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                  >
                    <Text style={errorBoundaryStyles.errorText}>
                      {this.state.error.toString()}
                    </Text>
                    {this.state.errorInfo && (
                      <Text style={errorBoundaryStyles.errorStack}>
                        {this.state.errorInfo.componentStack}
                      </Text>
                    )}
                  </ScrollView>
                </View>
              )}

              <View style={errorBoundaryStyles.buttonContainer}>
                <TouchableOpacity
                  style={errorBoundaryStyles.primaryButton}
                  onPress={this.handleRetry}
                  activeOpacity={0.8}
                >
                  <Text style={errorBoundaryStyles.primaryButtonText}>
                    Try Again
                  </Text>
                </TouchableOpacity>

                {this.props.showReload && (
                  <TouchableOpacity
                    style={errorBoundaryStyles.secondaryButton}
                    onPress={this.handleReload}
                    activeOpacity={0.8}
                  >
                    <Text style={errorBoundaryStyles.secondaryButtonText}>
                      Reload App
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {this.props.showReport && (
                <TouchableOpacity
                  style={errorBoundaryStyles.reportButton}
                  onPress={() => {
                    // In production, this could open a bug report form or email
                    console.log('Report error:', this.state.error);
                    if (this.props.onReport) {
                      this.props.onReport(this.state.error, this.state.errorInfo);
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={errorBoundaryStyles.reportButtonText}>
                    Report Issue
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
