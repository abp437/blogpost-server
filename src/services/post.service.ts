import Post from "../models/Post.js";

interface CreatePostInput {
  title: string;
  content: string;
  userId: string;
}

interface UpdatePostInput {
  id: string;
  title: string;
  content: string;
  userId: string;
}

interface DeletePostInput {
  id: string;
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
    return Post.find({
      author: userId,
    }).sort({
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
        content: data.content,
      },
      {
        new: true,
      },
    );

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  },

  async deletePost(data: DeletePostInput) {
    const post = await Post.findOneAndDelete({
      _id: data.id,
      author: data.userId,
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  },
};
