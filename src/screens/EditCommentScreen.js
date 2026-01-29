import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { usePostStore } from '../store/postStore';
import { editCommentStyles } from './EditCommentScreen.styles';

/**
 * Edit Comment Screen
 * Allows editing of comment body with validation and submission
 */
const EditCommentScreen = ({ route, navigation }) => {
  const { comment, postId } = route.params;
  const { updateComment } = usePostStore();
  const [commentBody, setCommentBody] = useState(comment.body || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized submit handler
  const handleSubmit = useCallback(async () => {
    if (!commentBody.trim()) {
      Alert.alert('Validation Error', 'Comment body cannot be empty');
      return;
    }

    if (commentBody.trim().length < 3) {
      Alert.alert('Validation Error', 'Comment must be at least 3 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateComment(comment.id, commentBody.trim(), postId);

      if (result.success) {
        Alert.alert('Success', 'Comment updated successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', result.error || 'Failed to update comment');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [commentBody, comment.id, postId, updateComment, navigation]);

  return (
    <KeyboardAvoidingView
      style={editCommentStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView
        contentContainerStyle={editCommentStyles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={editCommentStyles.inputContainer}>
          <TextInput
            style={editCommentStyles.input}
            value={commentBody}
            onChangeText={setCommentBody}
            placeholder="Enter your comment..."
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            editable={!isSubmitting}
            autoFocus
          />
        </View>

        <TouchableOpacity
          style={[
            editCommentStyles.submitButton,
            isSubmitting && editCommentStyles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          activeOpacity={0.7}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={editCommentStyles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditCommentScreen;
