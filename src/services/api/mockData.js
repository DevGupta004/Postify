export const mockPosts = [
  {
    id: 1,
    title: 'Understanding React Native Performance',
    body: 'React Native provides excellent performance through its bridge architecture. Understanding how the bridge works can help optimize your app.',
  },
  {
    id: 2,
    title: 'State Management Best Practices',
    body: 'Choosing the right state management solution is crucial for scalable React Native applications. Consider your app complexity and team size.',
  },
  {
    id: 3,
    title: 'Navigation Patterns in Mobile Apps',
    body: 'Effective navigation is key to great UX. React Navigation provides powerful tools for implementing complex navigation flows.',
  },
  {
    id: 4,
    title: 'Testing React Native Components',
    body: 'Writing tests for React Native components requires understanding the testing library and how to mock native modules effectively.',
  },
];

export const mockComments = {
  1: [
    {
      id: 101,
      postId: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      body: 'Great article! The bridge architecture explanation was very clear.',
    },
    {
      id: 102,
      postId: 1,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      body: 'I found the performance tips particularly helpful for my current project.',
    },
  ],
  2: [
    {
      id: 201,
      postId: 2,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      body: 'Zustand has been a game-changer for our state management needs.',
    },
  ],
  3: [
    {
      id: 301,
      postId: 3,
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      body: 'React Navigation is powerful but can be complex. This article helped clarify things.',
    },
    {
      id: 302,
      postId: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      body: 'The navigation patterns section was exactly what I needed.',
    },
  ],
  4: [
    {
      id: 401,
      postId: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      body: 'Testing native modules can be tricky. Thanks for the insights!',
    },
  ],
};
