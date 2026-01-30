import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const otpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  phoneNumber: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: 17,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  otpInput: {
    width: 52,
    height: 64,
    borderWidth: 2,
    borderColor: colors.input.border,
    borderRadius: 14,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.input.text,
    backgroundColor: colors.input.background,
    shadowColor: colors.shadow.light,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  otpInputFilled: {
    borderColor: colors.input.borderFocused,
    backgroundColor: colors.input.background,
    shadowColor: colors.shadow.purple,
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  otpInputError: {
    borderColor: colors.error.main,
    backgroundColor: colors.error.light,
  },
  errorContainer: {
    marginBottom: 20,
    paddingHorizontal: 8,
    backgroundColor: colors.error.light,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.error.light,
  },
  errorText: {
    fontSize: 14,
    color: colors.error.dark,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    height: 56,
    backgroundColor: colors.button.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.shadow.purple,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: colors.button.disabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.button.text,
    letterSpacing: 0.3,
  },
  resendContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  resendText: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  resendLink: {
    color: colors.button.primary,
    fontWeight: '700',
  },
});
