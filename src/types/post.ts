export interface PostContentInput {
  title: string;
  description: string;
  content: string;
}

export interface CreatePostInput extends PostContentInput {
  userId: string;
}

export interface UpdatePostInput extends PostContentInput {
  id: string;
  userId: string;
}

export interface DeletePostInput {
  id: string;
  userId: string;
}

export interface AddPostRequestInput extends PostContentInput {}

export interface UpdatePostRequestInput extends PostContentInput {
  id: string;
}
