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
      userId: data.userId,
    });

    return post;
  },
};
