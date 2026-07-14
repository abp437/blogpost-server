export const typeDefs = `#graphql

type User {
  id: ID!
  name: String!
  email: String!
}

type Post {
  id: ID!
  title: String!
  description: String
  content: String!
  createdAt: String!
  updatedAt: String!
  author: User!
}

type Query {
  posts: [Post!]!
  myPosts: [Post!]!
  post(id: ID!): Post!
}

input AddPostInput {
  title: String!
  description: String
  content: String!
}

input UpdatePostInput {
  id: ID!
  title: String!
  description: String
  content: String!
}

type Mutation {
  addPost(input: AddPostInput!): Post!
  updatePost(input: UpdatePostInput!): Post!
  deletePost(
    id: ID!
  ): Post!
}

`;
