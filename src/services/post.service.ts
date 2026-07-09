import Post from "../models/Post.js";

interface CreatePostInput {
  title: string;
  content: string;
  userId: string;
}

export const postService = {
  async getPosts() {
    return Post.find().sort({
      createdAt: -1,
    });
  },

  async createPost(data: CreatePostInput) {
    const post = await Post.create({
      title: data.title,
      content: data.content,
      author: data.userId,
    });

    return post;
  },

  async getPostsByAuthor(userId: string) {
    return Post.find({ author: userId }).sort({ createdAt: -1 });
  },
};
