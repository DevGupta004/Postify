import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commentItemStyles } from './CommentItem.styles';

/**
 * Optimized comment item component
 * Displays comment details with an edit button
 * Uses React.memo for performance optimization
 */
const CommentItem = memo(({ comment, onEdit }) => {
  return (
    <View style={commentItemStyles.container}>
      <View style={commentItemStyles.content}>
        <Text style={commentItemStyles.name}>{comment.name}</Text>
        <Text style={commentItemStyles.email}>{comment.email}</Text>
        <Text style={commentItemStyles.body}>{comment.body}</Text>
      </View>
      <TouchableOpacity
        style={commentItemStyles.editButton}
        onPress={onEdit}
        activeOpacity={0.7}>
        <Text style={commentItemStyles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
});

CommentItem.displayName = 'CommentItem';

export default CommentItem;
