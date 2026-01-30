import React, { useEffect, useCallback } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { usePostStore } from '../store/postStore';
import PostItem from '../components/PostItem';
import LoadingIndicator from '../components/LoadingIndicator';
import { postListStyles } from './PostListScreen.styles';

const PostListScreen = ({ navigation }) => {
  const { posts, postsLoading, postsError, loadPosts } = usePostStore();

  useEffect(() => {
    console.log('PostListScreen: useEffect triggered, calling loadPosts');
    loadPosts();
  }, []);

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
