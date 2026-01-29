const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetches all posts from the API
 * GET https://jsonplaceholder.typicode.com/posts
 * @returns {Promise<Object>} Object with success flag and data/error
 */
export const fetchPosts = async () => {
  try {
    console.log('Fetching posts from:', `${API_BASE_URL}/posts`);
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Posts fetched successfully, count:', data?.length || 0);
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch posts. Please check your connection.',
    };
  }
};

/**
 * Fetches comments for a specific post
 * GET https://jsonplaceholder.typicode.com/posts/{postId}/comments
 * @param {number} postId - The ID of the post
 * @returns {Promise<Object>} Object with success flag and data/error
 */
export const fetchCommentsByPostId = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch comments. Please check your connection.',
    };
  }
};

/**
 * Updates a comment via PUT request
 * PUT https://jsonplaceholder.typicode.com/comments/{commentId}
 * Note: This is a mock API and won't persist changes, but returns the updated object
 * @param {number} commentId - The ID of the comment to update
 * @param {string} body - The updated comment body
 * @returns {Promise<Object>} Object with success flag and data/error
 */
export const updateComment = async (commentId, body) => {
  try {
    // Client-side validation
    if (!body || body.trim().length === 0) {
      throw new Error('Comment body cannot be empty');
    }
    
    if (body.trim().length < 3) {
      throw new Error('Comment must be at least 3 characters long');
    }
    
    console.log(`[updateComment] Fetching current comment with ID: ${commentId}`);
    
    // Fetch the current comment to get all fields
    const getResponse = await fetch(`${API_BASE_URL}/comments/${commentId}`);
    
    if (!getResponse.ok) {
      throw new Error(`Comment not found. HTTP status: ${getResponse.status}`);
    }
    
    const currentComment = await getResponse.json();
    console.log('[updateComment] Current comment fetched:', {
      id: currentComment.id,
      postId: currentComment.postId,
      name: currentComment.name,
      email: currentComment.email,
      body: currentComment.body?.substring(0, 50) + '...',
    });
    
    // Prepare the updated comment payload
    const updatedPayload = {
      ...currentComment,
      body: body.trim(),
    };
    
    console.log(`[updateComment] Sending PUT request to: ${API_BASE_URL}/comments/${commentId}`);
    console.log('[updateComment] Payload:', JSON.stringify(updatedPayload, null, 2));
    
    // Update the comment via PUT request
    const putResponse = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPayload),
    });
    
    console.log('[updateComment] PUT response status:', putResponse.status, putResponse.statusText);
    
    if (!putResponse.ok) {
      const errorText = await putResponse.text();
      console.error('[updateComment] PUT request failed:', errorText);
      throw new Error(`Failed to update comment. HTTP status: ${putResponse.status}`);
    }
    
    const updatedComment = await putResponse.json();
    console.log('[updateComment] Comment updated successfully:', {
      id: updatedComment.id,
      postId: updatedComment.postId,
      body: updatedComment.body?.substring(0, 50) + '...',
    });
    
    return {
      success: true,
      data: updatedComment,
    };
  } catch (error) {
    console.error('[updateComment] Error updating comment:', error);
    return {
      success: false,
      error: error.message || 'Failed to update comment',
    };
  }
};
