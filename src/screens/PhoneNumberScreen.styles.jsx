import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const phoneNumberStyles = StyleSheet.create({
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
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
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
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  input: {
    height: 56,
    borderWidth: 1.5,
    borderColor: colors.input.border,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 16,
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
  inputFocused: {
    borderColor: colors.input.borderFocused,
    backgroundColor: colors.input.background,
    shadowColor: colors.shadow.purple,
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
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
  hint: {
    fontSize: 13,
    color: colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
});
