import { postService } from "../services/post.service.js";
import type { GraphQLContext } from "./context.js";

export const resolvers = {
  Query: {
    posts: async (_parent: unknown, _args: unknown, _context: GraphQLContext) => {
      return postService.getPosts();
    },

    myPosts: async (_parent: unknown, _args: unknown, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return postService.getPostsByAuthor(context.user.id);
    },
  },

  Mutation: {
    addPost: async (
      _parent: unknown,
      args: {
        title: string;
        content: string;
      },
      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return postService.createPost({
        title: args.title,
        content: args.content,
        userId: context.user.id,
      });
    },
  },

  Post: {
    id: (parent: any) => parent._id.toString(),
    createdAt: (parent: any) => parent.createdAt.toISOString(),
    updatedAt: (parent: any) => parent.updatedAt.toISOString(),
  },
};
