import React, { useEffect, useCallback } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { usePostStore } from '../store/postStore';
import PostItem from '../components/PostItem';
import LoadingIndicator from '../components/LoadingIndicator';
import { postListStyles } from './PostListScreen.styles';

/**
 * Post List Screen
 * Displays all posts in a FlatList with optimized rendering
 */
const PostListScreen = ({ navigation }) => {
  const { posts, postsLoading, postsError, loadPosts } = usePostStore();

  useEffect(() => {
    console.log('PostListScreen: useEffect triggered, calling loadPosts');
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Memoized callback for navigation to prevent unnecessary re-renders
  const handlePostPress = useCallback(
    (post) => {
      navigation.navigate('Comments', { postId: post.id, postTitle: post.title });
    },
    [navigation]
  );

  // Memoized render function for FlatList items
  const renderPostItem = useCallback(
    ({ item }) => <PostItem post={item} onPress={() => handlePostPress(item)} />,
    [handlePostPress]
  );

  // Memoized key extractor for FlatList optimization
  const keyExtractor = useCallback((item) => `post-${item.id}`, []);

  // Show error alert if posts failed to load
  useEffect(() => {
    if (postsError) {
      Alert.alert('Error', postsError, [
        {
          text: 'Retry',
          onPress: () => loadPosts(),
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  }, [postsError, loadPosts]);

  if (postsLoading) {
    return <LoadingIndicator message="Loading posts..." />;
  }

  if (posts.length === 0 && !postsLoading && !postsError) {
    return (
      <View style={postListStyles.emptyContainer}>
        <Text style={postListStyles.emptyText}>No posts available</Text>
      </View>
    );
  }

  return (
    <View style={postListStyles.container}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={postListStyles.listContent}
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

export default PostListScreen;
