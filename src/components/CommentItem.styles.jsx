import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const commentItemStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: colors.shadow.medium,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  editButton: {
    backgroundColor: colors.button.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  editButtonText: {
    color: colors.button.text,
    fontSize: 14,
    fontWeight: '600',
  },
});
