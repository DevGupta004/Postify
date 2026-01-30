import { create } from 'zustand';
import {
  fetchPosts,
  fetchCommentsByPostId,
  updateComment as updateCommentApi,
} from '../services/api/postService';

export const usePostStore = create((set, get) => ({
  posts: [],
  postsLoading: false,
  postsError: null,
  
  comments: {},
  commentsLoading: {},
  commentsError: {},
  
  loadPosts: async () => {
    console.log('loadPosts called');
    set({ postsLoading: true, postsError: null });
    
    try {
      const result = await fetchPosts();
      console.log('fetchPosts result:', result.success ? `Success with ${result.data?.length || 0} posts` : `Error: ${result.error}`);
      
      if (result.success) {
        set({
          posts: result.data,
          postsLoading: false,
          postsError: null,
        });
        console.log('Posts set in store, count:', result.data?.length || 0);
      } else {
        console.error('Failed to load posts:', result.error);
        set({
          postsLoading: false,
          postsError: result.error,
        });
      }
    } catch (error) {
      console.error('Exception in loadPosts:', error);
      set({
        postsLoading: false,
        postsError: error.message || 'An unexpected error occurred',
      });
    }
  },
  
  loadComments: async (postId) => {
    set((state) => ({
      commentsLoading: { ...state.commentsLoading, [postId]: true },
      commentsError: { ...state.commentsError, [postId]: null },
    }));
    
    const result = await fetchCommentsByPostId(postId);
    
    if (result.success) {
      set((state) => ({
        comments: { ...state.comments, [postId]: result.data },
        commentsLoading: { ...state.commentsLoading, [postId]: false },
        commentsError: { ...state.commentsError, [postId]: null },
      }));
    } else {
      set((state) => ({
        commentsLoading: { ...state.commentsLoading, [postId]: false },
        commentsError: { ...state.commentsError, [postId]: result.error },
      }));
    }
  },
  
  updateComment: async (commentId, body, postId) => {
    const result = await updateCommentApi(commentId, body);
    
    if (result.success) {
      set((state) => {
        const postComments = state.comments[postId] || [];
        const updatedComments = postComments.map((comment) =>
          comment.id === commentId ? { ...comment, body: result.data.body } : comment
        );
        
        return {
          comments: { ...state.comments, [postId]: updatedComments },
        };
      });
      
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.error };
    }
  },
  
  reset: () => {
    set({
      posts: [],
      postsLoading: false,
      postsError: null,
      comments: {},
      commentsLoading: {},
      commentsError: {},
    });
  },
}));
