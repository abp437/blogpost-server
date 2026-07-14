import Post from "../models/Post.js";
import { CreatePostInput, UpdatePostInput, DeletePostInput } from "../types/post.js";

const postPopulate = {
  path: "author",
  select: "name email",
};

export const postService = {
  async getPosts() {
    return Post.find()
      .populate(postPopulate)
      .sort({
        createdAt: -1,
      });
  },

  async createPost(data: CreatePostInput) {
    const post = await Post.create({
      title: data.title,
      description: data.description,
      content: data.content,
      author: data.userId,
    });

    return post.populate(postPopulate);
  },

  async getPostsByAuthor(userId: string) {
    return Post.find({
      author: userId,
    })
      .populate(postPopulate)
      .sort({
        createdAt: -1,
      });
  },

  async updatePost(data: UpdatePostInput) {
    const post = await Post.findOneAndUpdate(
      {
        _id: data.id,
        author: data.userId,
      },
      {
        title: data.title,
        description: data.description,
        content: data.content,
      },
      {
        new: true,
      },
    ).populate(postPopulate);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  },

  async deletePost(data: DeletePostInput) {
    const post = await Post.findOneAndDelete({
      _id: data.id,
      author: data.userId,
    }).populate(postPopulate);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  },

  async getPostById(id: string) {
    const post = await Post.findById(id).populate(
      postPopulate,
    );

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  },
};
