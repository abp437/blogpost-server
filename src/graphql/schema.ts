export const typeDefs = `#graphql

type Post {
  id: ID!
  title: String!
  content: String!
  createdAt: String!
  updatedAt: String!
}

type Query {
  posts: [Post!]!
  myPosts: [Post!]!
  post(id: ID!): Post!
}

type Mutation {
  addPost(
    title: String!
    content: String!
  ): Post!

  updatePost(
    id: ID!
    title: String!
    content: String!
  ): Post!

  deletePost(
    id: ID!
  ): Post!
}

`;
