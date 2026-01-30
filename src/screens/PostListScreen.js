import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, Text, Alert, TouchableOpacity } from 'react-native';
import { usePostStore } from '../store/postStore';
import PostItem from '../components/PostItem';
import LoadingIndicator from '../components/LoadingIndicator';
import { postListStyles } from './PostListScreen.styles';

// Component that throws error during render (for ErrorBoundary testing)
const ErrorThrower = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test Error: This is a test error to verify ErrorBoundary functionality!');
  }
  return null;
};

const PostListScreen = ({ navigation }) => {
  const { posts, postsLoading, postsError, loadPosts } = usePostStore();
  const [shouldThrowError, setShouldThrowError] = useState(false);

  useEffect(() => {
    console.log('PostListScreen: useEffect triggered, calling loadPosts');
    loadPosts();
  }, []);

  const handleTestErrorBoundary = () => {
    // Set state to trigger error during render
    setShouldThrowError(true);
  };

  const handlePostPress = useCallback(
    (post) => {
      navigation.navigate('Comments', { postId: post.id, postTitle: post.title });
    },
    [navigation]
  );

  const renderPostItem = useCallback(
    ({ item }) => <PostItem post={item} onPress={() => handlePostPress(item)} />,
    [handlePostPress]
  );

  const keyExtractor = useCallback((item) => `post-${item.id}`, []);

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
      <View style={postListStyles.container}>
        <ErrorThrower shouldThrow={shouldThrowError} />
        <View style={postListStyles.emptyContainer}>
          <Text style={postListStyles.emptyText}>No posts available</Text>
        </View>
        <TouchableOpacity
          style={postListStyles.fabButton}
          onPress={handleTestErrorBoundary}
          activeOpacity={0.8}
        >
          <Text style={postListStyles.fabButtonText}>⚠️</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={postListStyles.container}>
      <ErrorThrower shouldThrow={shouldThrowError} />
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
      <TouchableOpacity
        style={postListStyles.fabButton}
        onPress={handleTestErrorBoundary}
        activeOpacity={0.8}
      >
        <Text style={postListStyles.fabButtonText}>⚠️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostListScreen;
