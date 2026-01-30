import React, { memo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { postItemStyles } from './PostItem.styles';

const PostItem = memo(({ post, onPress }) => {
  return (
    <TouchableOpacity
      style={postItemStyles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={postItemStyles.content}>
        <Text style={postItemStyles.title}>{post.title}</Text>
        <Text style={postItemStyles.body} numberOfLines={2}>
          {post.body}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

PostItem.displayName = 'PostItem';

export default PostItem;
