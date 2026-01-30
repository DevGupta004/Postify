import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const postListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
    position: 'relative',
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  fabButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.error.main,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    shadowColor: colors.shadow.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  fabButtonText: {
    fontSize: 24,
    color: colors.button.text,
  },
});
