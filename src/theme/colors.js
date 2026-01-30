/**
 * Postify App Theme Colors
 * Extracted from logo: Deep Blue to Vibrant Purple Gradient
 */

export const colors = {
  // Primary Brand Colors (from logo gradient)
  primary: {
    // Deep Blue (top-left of logo)
    blue: '#1e40af', // Deep blue
    blueLight: '#3b82f6', // Lighter blue
    blueDark: '#1e3a8a', // Darker blue
    
    // Vibrant Purple (bottom-right of logo)
    purple: '#7c3aed', // Vibrant purple (main brand color)
    purpleLight: '#8b5cf6', // Lighter purple
    purpleDark: '#6d28d9', // Darker purple
    
    // Gradient colors (transition between blue and purple)
    gradientStart: '#1e40af', // Deep blue
    gradientEnd: '#7c3aed', // Vibrant purple
  },

  // UI Colors
  background: {
    primary: '#ffffff', // White
    secondary: '#f8fafc', // Very light gray-blue
    tertiary: '#f1f5f9', // Light gray-blue
    dark: '#0f172a', // Dark background
  },

  // Text Colors
  text: {
    primary: '#0f172a', // Almost black
    secondary: '#334155', // Dark gray
    tertiary: '#64748b', // Medium gray
    light: '#94a3b8', // Light gray
    white: '#ffffff', // White text
  },

  // Border & Divider Colors
  border: {
    light: '#e2e8f0', // Very light gray
    medium: '#cbd5e1', // Light gray
    dark: '#94a3b8', // Medium gray
  },

  // Input Colors
  input: {
    background: '#ffffff',
    border: '#e2e8f0',
    borderFocused: '#7c3aed', // Purple focus
    placeholder: '#94a3b8',
    text: '#0f172a',
  },

  // Button Colors
  button: {
    primary: '#7c3aed', // Vibrant purple
    primaryPressed: '#6d28d9', // Darker purple
    secondary: '#1e40af', // Deep blue
    disabled: '#cbd5e1', // Light gray
    text: '#ffffff',
  },

  // Status Colors
  success: {
    main: '#10b981', // Green
    light: '#d1fae5',
    dark: '#059669',
  },

  error: {
    main: '#ef4444', // Red
    light: '#fee2e2',
    dark: '#dc2626',
  },

  warning: {
    main: '#f59e0b', // Orange
    light: '#fef3c7',
    dark: '#d97706',
  },

  info: {
    main: '#3b82f6', // Blue
    light: '#dbeafe',
    dark: '#2563eb',
  },

  // Shadow Colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.2)',
    purple: 'rgba(124, 58, 237, 0.3)', // Purple shadow
    blue: 'rgba(30, 64, 175, 0.3)', // Blue shadow
  },

  // Overlay Colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.8)', // Translucent white (from logo)
    dark: 'rgba(15, 23, 42, 0.7)',
  },
};

// Gradient configurations
export const gradients = {
  primary: {
    colors: [colors.primary.gradientStart, colors.primary.gradientEnd],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  reverse: {
    colors: [colors.primary.gradientEnd, colors.primary.gradientStart],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};

export default colors;
