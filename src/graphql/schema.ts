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
}

type Mutation {
  addPost(
    title: String!
    content: String!
  ): Post!
}

`;
