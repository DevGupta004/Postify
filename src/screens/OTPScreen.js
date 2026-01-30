import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { verifyOTP } from '../services/auth/mockAuthService';
import { otpStyles } from './OTPScreen.styles';

const OTP_LENGTH = 6;

const OTPScreen = ({ route, navigation }) => {
  const { phoneNumber: routePhoneNumber } = route.params || {};
  const { login } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (value, index) => {
    // Only allow digits
    const digit = value.replace(/[^0-9]/g, '');
    
    if (digit.length > 1) {
      // Handle paste scenario
      const digits = digit.slice(0, OTP_LENGTH).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (index + i < OTP_LENGTH) {
          newOtp[index + i] = d;
        }
      });
      setOtp(newOtp);
      setError(null);
      
      // Focus next empty input or last input
      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError(null);

    // Auto-focus next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== OTP_LENGTH) {
      setError('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyOTP(routePhoneNumber, otpString);
      
      if (result.success) {
        // Login user
        const loginResult = await login(routePhoneNumber, result.token);
        
        if (loginResult.success) {
          // Navigation will be automatically handled by AppNavigator
          // When isAuthenticated becomes true, AppNavigator switches from AuthNavigator to MainNavigator
          // No manual navigation needed - the auth state change triggers the navigation switch
        } else {
          Alert.alert('Error', loginResult.error || 'Failed to complete login');
        }
      } else {
        setError(result.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    // In a real app, this would call sendOTP again
    Alert.alert(
      'OTP Resent',
      'A new verification code has been sent to your phone number.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={otpStyles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={otpStyles.keyboardView}
      >
        <View style={otpStyles.content}>
          <View style={otpStyles.header}>
            <Text style={otpStyles.title}>Enter Verification Code</Text>
            <Text style={otpStyles.subtitle}>
              We've sent a 6-digit code to{'\n'}
              <Text style={otpStyles.phoneNumber}>{routePhoneNumber}</Text>
            </Text>
          </View>

          <View style={otpStyles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  otpStyles.otpInput,
                  digit && otpStyles.otpInputFilled,
                  error && otpStyles.otpInputError,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                editable={!isLoading}
                selectTextOnFocus={true}
              />
            ))}
          </View>

          {error && (
            <View style={otpStyles.errorContainer}>
              <Text style={otpStyles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              otpStyles.button,
              (isLoading || otp.join('').length !== OTP_LENGTH) &&
                otpStyles.buttonDisabled,
            ]}
            onPress={handleVerify}
            disabled={isLoading || otp.join('').length !== OTP_LENGTH}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.button.text} />
            ) : (
              <Text style={otpStyles.buttonText}>Verify</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={otpStyles.resendContainer}
            onPress={handleResend}
            disabled={isLoading}
          >
            <Text style={otpStyles.resendText}>
              Didn't receive the code? <Text style={otpStyles.resendLink}>Resend</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;
