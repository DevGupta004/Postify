import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const editCommentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: colors.input.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.input.text,
    minHeight: 200,
    textAlignVertical: 'top',
    borderWidth: 1.5,
    borderColor: colors.input.border,
    elevation: 2,
    shadowColor: colors.shadow.medium,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
  },
  submitButton: {
    backgroundColor: colors.button.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    shadowColor: colors.shadow.purple,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    opacity: 0.6,
    backgroundColor: colors.button.disabled,
  },
  submitButtonText: {
    color: colors.button.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
