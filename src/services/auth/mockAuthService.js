/**
 * Mock Authentication Service
 * Simulates OTP-based authentication flow without real backend integration
 */

// Mock OTP storage (in real app, this would be on the backend)
let mockOTPStore = {};

// Default OTP for testing (always works)
const DEFAULT_OTP = '000000';

// Generate OTP (returns default OTP for testing)
const generateOTP = () => {
  return DEFAULT_OTP;
};

/**
 * Simulates sending OTP to a phone number
 * @param {string} phoneNumber - Phone number to send OTP to
 * @returns {Promise<{success: boolean, error?: string, otp?: string}>}
 */
export const sendOTP = async (phoneNumber) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Validate phone number format (supports Indian and international numbers)
  const cleanPhone = phoneNumber.replace(/\s+/g, '');
  
  // Indian number validation: +91 followed by 10 digits starting with 6-9
  const indianPhoneRegex = /^\+91[6-9]\d{9}$/;
  // International number validation: + followed by country code and number
  const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;
  
  if (!indianPhoneRegex.test(cleanPhone) && !internationalPhoneRegex.test(cleanPhone)) {
    return {
      success: false,
      error: 'Please enter a valid phone number',
    };
  }

  // Generate and store OTP
  const otp = generateOTP();
  mockOTPStore[cleanPhone] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
    attempts: 0,
  };

  // In development, log the OTP for testing
  console.log(`[MOCK] OTP for ${cleanPhone}: ${otp} (Default OTP: ${DEFAULT_OTP})`);

  return {
    success: true,
    otp, // Only returned in mock for testing
  };
};

/**
 * Simulates verifying OTP
 * @param {string} phoneNumber - Phone number to verify
 * @param {string} otp - OTP code entered by user
 * @returns {Promise<{success: boolean, error?: string, token?: string}>}
 */
export const verifyOTP = async (phoneNumber, otp) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const cleanPhone = phoneNumber.replace(/\s+/g, '');
  
  // Always accept default OTP (000000) for testing
  if (otp === DEFAULT_OTP) {
    // Generate mock token and proceed
    const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    delete mockOTPStore[cleanPhone];
    
    return {
      success: true,
      token,
    };
  }
  
  // For other OTPs, check stored OTP
  const storedOTP = mockOTPStore[cleanPhone];

  if (!storedOTP) {
    return {
      success: false,
      error: 'OTP not found. Please request a new OTP or use 000000 for testing.',
    };
  }

  // Check if OTP has expired
  if (Date.now() > storedOTP.expiresAt) {
    delete mockOTPStore[cleanPhone];
    return {
      success: false,
      error: 'OTP has expired. Please request a new one.',
    };
  }

  // Check attempts (max 3 attempts)
  if (storedOTP.attempts >= 3) {
    delete mockOTPStore[cleanPhone];
    return {
      success: false,
      error: 'Too many failed attempts. Please request a new OTP.',
    };
  }

  // Verify OTP
  if (storedOTP.otp !== otp) {
    storedOTP.attempts += 1;
    const remainingAttempts = 3 - storedOTP.attempts;
    return {
      success: false,
      error: `Invalid OTP. ${remainingAttempts > 0 ? `${remainingAttempts} attempt(s) remaining.` : 'Please request a new OTP.'}`,
    };
  }

  // Success - generate mock token and clean up
  const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  delete mockOTPStore[cleanPhone];

  return {
    success: true,
    token,
  };
};

/**
 * Clears stored OTP (useful for testing or cleanup)
 */
export const clearMockOTP = (phoneNumber) => {
  const cleanPhone = phoneNumber?.replace(/\s+/g, '');
  if (cleanPhone) {
    delete mockOTPStore[cleanPhone];
  } else {
    mockOTPStore = {};
  }
};
