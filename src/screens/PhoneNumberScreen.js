import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { phoneNumberStyles } from './PhoneNumberScreen.styles';
import { sendOTP } from '../services/auth/mockAuthService';

const PhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const formatPhoneNumber = (text) => {
    // Remove all non-digit characters except +
    let cleaned = text.replace(/[^\d+]/g, '');
    
    // Handle Indian number formatting
    if (cleaned.startsWith('+91')) {
      // Format: +91 XXXXXXXXXX
      if (cleaned.length > 3) {
        const digits = cleaned.slice(3);
        // Limit to 10 digits after +91
        const limitedDigits = digits.slice(0, 10);
        return '+91 ' + limitedDigits;
      }
      return cleaned;
    } else if (cleaned.startsWith('+')) {
      // Other country codes - add space after country code
      if (cleaned.length > 3) {
        return cleaned.slice(0, 3) + ' ' + cleaned.slice(3);
      }
      return cleaned;
    } else if (cleaned.startsWith('0') && cleaned.length <= 11) {
      // Indian number starting with 0 (e.g., 09876543210)
      // Keep as is, user can see it
      return cleaned;
    } else if (cleaned.length > 0 && !cleaned.startsWith('+')) {
      // Number without country code - assume Indian number
      // Limit to 10 digits
      const limitedDigits = cleaned.slice(0, 10);
      return limitedDigits;
    }
    
    return cleaned;
  };

  const normalizePhoneNumber = (phone) => {
    // Remove all spaces and formatting
    let cleaned = phone.replace(/\s+/g, '').trim();
    
    // If starts with 0, remove it and add +91
    if (cleaned.startsWith('0') && cleaned.length === 11) {
      cleaned = '+91' + cleaned.slice(1);
    }
    // If it's 10 digits without country code, assume Indian number
    else if (/^\d{10}$/.test(cleaned)) {
      cleaned = '+91' + cleaned;
    }
    // If it already has +91, keep it
    else if (cleaned.startsWith('+91')) {
      // Already formatted
    }
    // If it has other country code, keep it
    else if (cleaned.startsWith('+')) {
      // Other country code
    }
    
    return cleaned;
  };

  const handleContinue = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    // Normalize phone number (add +91 if needed)
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    const cleanPhone = normalizedPhone.replace(/\s+/g, '');
    
    // Validate Indian phone number format
    // Should be +91 followed by 10 digits starting with 6-9
    if (cleanPhone.startsWith('+91')) {
      const digits = cleanPhone.slice(3);
      if (!/^[6-9]\d{9}$/.test(digits)) {
        Alert.alert('Error', 'Please enter a valid Indian phone number\n(10 digits starting with 6, 7, 8, or 9)');
        return;
      }
    } else if (cleanPhone.startsWith('+')) {
      // Other country codes are allowed
      // Validation will be done in the service
    } else {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);

    try {
      const result = await sendOTP(normalizedPhone);
      
      if (result.success) {
        // Navigate to OTP screen with normalized phone number
        navigation.navigate('OTP', { phoneNumber: normalizedPhone });
      } else {
        Alert.alert('Error', result.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={phoneNumberStyles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={phoneNumberStyles.keyboardView}
      >
        <View style={phoneNumberStyles.content}>
          <View style={phoneNumberStyles.header}>
            <Image
              source={require('../../Postify_logo.png')}
              style={phoneNumberStyles.logo}
              resizeMode="contain"
            />
            <Text style={phoneNumberStyles.title}>Welcome to Postify</Text>
            <Text style={phoneNumberStyles.subtitle}>
              Enter your phone number to continue
            </Text>
          </View>

          <View style={phoneNumberStyles.inputContainer}>
            <Text style={phoneNumberStyles.label}>Phone Number</Text>
            <TextInput
              style={[
                phoneNumberStyles.input,
                isFocused && phoneNumberStyles.inputFocused,
              ]}
              placeholder="+91 9876543210"
              placeholderTextColor={colors.input.placeholder}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType="phone-pad"
              autoFocus={true}
              editable={!isLoading}
              maxLength={15}
            />
          </View>

          <TouchableOpacity
            style={[
              phoneNumberStyles.button,
              (isLoading || !phoneNumber.trim()) && phoneNumberStyles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={isLoading || !phoneNumber.trim()}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.button.text} />
            ) : (
              <Text style={phoneNumberStyles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>

          <Text style={phoneNumberStyles.hint}>
            We'll send you a verification code via SMS
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
