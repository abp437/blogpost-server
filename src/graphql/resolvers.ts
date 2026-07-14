import { postService } from "../services/post.service.js";
import type { GraphQLContext } from "./context.js";

interface AddPostInput {
  title: string;
  content: string;
}

interface UpdatePostInput {
  id: string;
  title: string;
  content: string;
}

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

    post: async (_parent: unknown, args: { id: string }) => {
      return postService.getPostById(args.id);
    },
  },

  Mutation: {
    addPost: async (_parent: unknown, { input }: { input: AddPostInput }, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return postService.createPost({
        ...input,
        userId: context.user.id,
      });
    },

    updatePost: async (_parent: unknown, { input }: { input: UpdatePostInput }, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return postService.updatePost({
        ...input,
        userId: context.user.id,
      });
    },

    deletePost: async (
      _parent: unknown,
      args: {
        id: string;
      },
      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return postService.deletePost({
        id: args.id,
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
