import {
  fetchPosts,
  fetchCommentsByPostId,
  updateComment,
} from '../postService';

// Mock the delay function by using jest timers
jest.useFakeTimers();

describe('PostService', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  describe('fetchPosts', () => {
    it('should fetch posts successfully', async () => {
      const promise = fetchPosts();
      jest.advanceTimersByTime(800);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should handle errors gracefully', async () => {
      // Mock Math.random to simulate error (needs to be < 0.05 to trigger)
      const originalRandom = Math.random;
      Math.random = jest.fn(() => 0.01); // Less than 0.05, will trigger error

      const promise = fetchPosts();
      jest.advanceTimersByTime(800);
      const result = await promise;

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();

      Math.random = originalRandom;
    });
  });

  describe('fetchCommentsByPostId', () => {
    it('should fetch comments for a valid post ID', async () => {
      const promise = fetchCommentsByPostId(1);
      jest.advanceTimersByTime(600);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('should return empty array for post with no comments', async () => {
      const promise = fetchCommentsByPostId(999);
      jest.advanceTimersByTime(600);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });
  });

  describe('updateComment', () => {
    it('should update comment successfully', async () => {
      const promise = updateComment(101, 'Updated comment body');
      jest.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.body).toBe('Updated comment body');
    });

    it('should reject empty comment body', async () => {
      const promise = updateComment(101, '');
      jest.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(false);
      expect(result.error).toContain('empty');
    });

    it('should reject comment body that is too short', async () => {
      const promise = updateComment(101, 'ab');
      jest.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(false);
      expect(result.error).toContain('3 characters');
    });

    it('should handle non-existent comment', async () => {
      const promise = updateComment(99999, 'Valid comment body');
      jest.advanceTimersByTime(500);
      const result = await promise;

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });
  });
});
