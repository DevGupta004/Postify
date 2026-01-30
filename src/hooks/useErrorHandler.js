import { useCallback } from 'react';

/**
 * Custom hook for error handling
 * Provides utilities for error reporting and handling
 */
export const useErrorHandler = () => {
  const handleError = useCallback((error, errorInfo = {}) => {
    // Log error to console
    console.error('Error caught:', error, errorInfo);

    // In production, you could send to error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });

    // Return error details for UI handling
    return {
      message: error?.message || 'An unexpected error occurred',
      error,
      errorInfo,
    };
  }, []);

  const reportError = useCallback((error, context = {}) => {
    // Report error to analytics/monitoring service
    console.log('Reporting error:', error, context);
    
    // Example integration:
    // Sentry.captureException(error, {
    //   tags: context.tags,
    //   extra: context.extra,
    //   level: context.level || 'error',
    // });
  }, []);

  return {
    handleError,
    reportError,
  };
};

export default useErrorHandler;
