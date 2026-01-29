import React, { useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { usePostStore } from '../store/postStore';
import CommentItem from '../components/CommentItem';
import LoadingIndicator from '../components/LoadingIndicator';
import { commentsStyles } from './CommentsScreen.styles';

/**
 * Comments Screen
 * Displays comments for a selected post with edit functionality
 */
const CommentsScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const { comments, commentsLoading, commentsError, loadComments } = usePostStore();

  const postComments = useMemo(() => comments[postId] || [], [comments, postId]);
  const isLoading = useMemo(() => commentsLoading[postId] || false, [commentsLoading, postId]);
  const error = useMemo(() => commentsError[postId] || null, [commentsError, postId]);

  useEffect(() => {
    // Only load if comments don't exist for this post and not currently loading
    if (!comments[postId] && !isLoading) {
      loadComments(postId);
    }
  }, [postId, comments, isLoading, loadComments]);

  // Memoized callback for navigation to edit screen
  const handleEditPress = useCallback(
    (comment) => {
      navigation.navigate('EditComment', {
        comment,
        postId,
      });
    },
    [navigation, postId]
  );

  // Memoized render function for FlatList items
  const renderCommentItem = useCallback(
    ({ item }) => (
      <CommentItem comment={item} onEdit={() => handleEditPress(item)} />
    ),
    [handleEditPress]
  );

  // Memoized key extractor for FlatList optimization
  const keyExtractor = useCallback((item) => `comment-${item.id}`, []);

  // Show error alert if comments failed to load
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        {
          text: 'Retry',
          onPress: () => loadComments(postId),
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  }, [error, postId, loadComments]);

  if (isLoading) {
    return <LoadingIndicator message="Loading comments..." />;
  }

  if (postComments.length === 0 && !isLoading && !error) {
    return (
      <View style={commentsStyles.emptyContainer}>
        <Text style={commentsStyles.emptyText}>No comments available</Text>
      </View>
    );
  }

  return (
    <View style={commentsStyles.container}>
      <FlatList
        data={postComments}
        renderItem={renderCommentItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={commentsStyles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
      />
    </View>
  );
};

export default CommentsScreen;
